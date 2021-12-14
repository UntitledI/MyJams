const express = require('express')
const router = express.Router()
const axios = require('axios')
const getAccessToken = require('../utils/getAccessToken')
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
    let token = await getAccessToken(spotifyId).catch(() => {
        return next(ApiError.internal('Something went wrong...'))
    })

    const response = await axios.get(`https://api.spotify.com/v1/users/${spotifyId}/playlists`, {
        headers: { Authorization: `Bearer ${token}` }
    }).catch(async (error) => {
        if (error.response.status === 401) { // expired token, refresh and try getting playlists again
            token = await updateAccessToken(spotifyId)
            return await axios.get(`https://api.spotify.com/v1/users/${spotifyId}/playlists`, {
                headers: { Authorization: `Bearer ${token}` }
            }).catch(() => {
                return next(ApiError.internal('Something went wrong!'))
            })
        } else {
            return next(ApiError.internal('Something went wrong'))
        }
    })
    
    const items = response.data.items
    const playlists = []

    // format data to send to frontend
    items.forEach((item) => {
        const images = item.images ? item.images[0] : undefined
        const image = images ? images.url : undefined
        const playlist = {
            id: item.id,
            name: item.name,
            description: item.description,
            image: image
        }
        playlists.push(playlist)
    })

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

    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric'}
    const items = response.data.tracks.items
    const promises = []     // array of promises to be resolved all at once
    
    // format data
    items.forEach((item) => {
        // fetch track album image from spotify api
        const href = item.track.album.href
        promises.push(axios.get(href, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((response) => {
            const images = response.data.images
            const image = images ? images[0].url : undefined
            const dateObj = new Date(item.added_at)
            const date = dateObj.toLocaleDateString('en-US', dateOptions)
            const trackArtists = item.track.artists
            const artists = []  // array of strings representing artist names

            trackArtists.forEach((artist) => {
                artists.push(artist.name)
            })

            // format all info
            return {
                date: date,
                name: item.track.name,
                album: item.track.album.name,
                artists: artists,
                duration: millisToMinutesAndSeconds(item.track.duration_ms),
                image: image
            }
        }))
    })

    // resolve all promises at once and put result in songs
    const songs = await Promise.all(promises).catch((err) => {
        console.error(err)
        return next(ApiError.internal('Something went wrong !'))
    })
    
    res.json({ songs })
})

module.exports = router