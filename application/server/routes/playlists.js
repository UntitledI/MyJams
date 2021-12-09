const express = require('express')
const router = express.Router()
const axios = require('axios')
const getAccessToken = require('../utils/getAccessToken')
const getCache = require('../utils/getCache')
const addCache = require('../utils/addCache')
const updateAccessToken = require('../utils/updateAccessToken')
const authenticateToken = require('../middlewares/authenticateToken')
const ApiError = require('../error/ApiError')

function millisToMinutesAndSeconds(millis) {
    try {
        const minutes = Math.floor(millis / 60000)
        const seconds = ((millis % 60000) / 1000).toFixed(0)
        return (
            seconds == 60 ?
            (minutes+1) + ":00" :
            minutes + ":" + (seconds < 10 ? "0" : "") + seconds
        )
    } catch {
        return undefined
    }
}

router.get('/get', authenticateToken, async function (req, res, next) {
    const spotifyId = req.user.spotifyId
    let token = await getAccessToken(spotifyId).catch((err) => {
        return next(ApiError.internal('Something went wrong...'))
    })

    const response = await axios.get(`https://api.spotify.com/v1/users/${spotifyId}/playlists`, {
        headers: { Authorization: `Bearer ${token}` }
    }).catch(async (error) => {
        if (error.response.status === 401) { // expired token, refresh and try getting playlists again
            token = await updateAccessToken(spotifyId)
            return await axios.get(`https://api.spotify.com/v1/users/${spotifyId}/playlists`, {
                headers: { Authorization: `Bearer ${token}` }
            }).catch((err) => {
                return next(ApiError.internal('Something went wrong!'))
            })
        } else {
            return next(ApiError.internal('Something went wrong'))
        }
    })
    
    const items = response.data.items
    const playlists = []

    // format data to send to frontend
    for(let i = 0; i < items.length; i++) {
        const images = items[i].images ? items[i].images[0] : undefined
        const image = images ? images.url : undefined
        const playlist = {
            id: items[i].id,
            name: items[i].name,
            description: items[i].description,
            image: image
        }
        playlists.push(playlist)
    }

    res.json({ playlists })
})

router.get('/songs', authenticateToken, async function (req, res ,next) {
    const playlistId = req.query.playlistId
    const spotifyId = req.user.spotifyId
    
    // Ensure request is good
    if (!playlistId) {
        console.log('No playlist id found!')
        return next(ApiError.badRequest('playlist id is required'))
    }

    // Retrieve user's access token
    let token = await getAccessToken(spotifyId).catch(() => {
        return next(ApiError.internal('Something went wrong...'))
    })

    // Use access token to get playlist songs
    const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        headers: { Authorization: `Bearer ${token}` }
    }).catch(async (error) => {
        if (error.response.status === 401) { // expired token, refresh and try getting songs again
            token = await updateAccessToken(spotifyId)
            return await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
                headers: { Authorization: `Bearer ${token}` }
            }).catch((err) => {
                console.error(err.response)
                return next(ApiError.internal('Something went wrong!'))
            })
        } else {
            return next(ApiError.internal('Something went wrong'))
        }
    })

    const items = response.data.tracks.items
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric'}
    const cachedImages = {} // cache images to optimize speed
    const songs = []        // array of data to be returned
    
    // format data and push into songs array
    for(let i = 0; i < items.length; i++) {
        const dateObj = new Date(items[i].added_at)
        const date = dateObj.toLocaleDateString('en-US', dateOptions)
        const trackArtists = items[i].track.artists
        const artists = []
        const href = items[i].track.album.href

        // cache images
        if (!cachedImages[href]) {
            // check database if data already exists
            cachedImages[href] = await getCache(href).then((doc) => {
                return doc ? doc.data : null
            }).catch((err) => {
                console.error(err)
                return next(ApiError.internal('Something went wrong..'))
            })
            // if data is not in the database, then we must fetch from spotify api
            if (!cachedImages[href]) {
                cachedImages[href] = await axios.get(href, {
                    headers: { Authorization: `Bearer ${token}` }
                }).then((_res) => {
                    return _res.data.images
                }).catch((err) => {
                    console.error(err.response.status)
                    return next(ApiError.internal('Something went wrong!!'))
                })
                // save data into database so we can skip fetching from the api next time
                addCache(href, cachedImages[href]).catch((err) => {
                    console.error(err)
                })
            }
        } 

        const images = cachedImages[href]
        const image = images ? images[0].url : undefined

        // format artists as an array of strings
        if (trackArtists) {
            for(let j = 0; j < trackArtists.length; j++) {
                artists.push(trackArtists[j].name)
            }
        }

        // format song
        const song = {
            date: date,
            name: items[i].track.name,
            album: items[i].track.album.name,
            artists: artists,
            duration: millisToMinutesAndSeconds(items[i].track.duration_ms),
            image: image
        }

        songs.push(song)
    }
    
    res.json({ songs })
})

module.exports = router