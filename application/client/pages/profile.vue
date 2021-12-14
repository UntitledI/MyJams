<template>
  <div v-if="$auth.loggedIn">
    <Navbar />
    <div id="profile-page-container">
      <Spinner v-if="local_fetching" />
      <main id="profile-container">
        <header id="profile-top">
          <div id="profile-info">
            <div id="profile-image-container">
              <img :src="local_user.image">
            </div>
            <ul>
              <li>
                <span>
                  <span id="playlists-count" class="count">{{ local_user.numPlaylists }}</span> Playlists
                </span>
              </li>
              <li>
                <span>
                  <span id="followers-count" class="count">{{ local_user.numFollowers }}</span> Followers
                </span>
              </li>
              <!--
              <li>
                <span>
                  <span id="following-count" class="count">{{ local_user.numFollowing }}</span> Following
                </span>
              </li>
              -->
            </ul>
          </div>
          <section id="profile-header">
            <h2 id="profile-name">
              {{ local_user.name }}
            </h2>
            <!--
            <p id="profile-description">
              {{ local_user.description }}
            </p>
            -->
          </section>
        </header>
        <div id="playlist-container">
          <ul v-if="local_playlists.length > 0" id="playlist-list">
            <li v-for="playlist in local_playlists" :key="playlist.id">
              <div class="playlist" @click="showPlaylist(playlist.name, playlist.description, playlist.image, playlist.id)">
                <div class="playlist-image-container">
                  <img :src="playlist.image">
                </div>
                <h2>{{ playlist.name }}</h2>
              </div>
            </li>
          </ul>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import url from 'url'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Playlist from '../components/Playlist'
import Spinner from '../components/Spinner'

export default {
  Navbar,
  Playlist,
  Spinner,
  middleware: ['auth-user'],
  props: {
    playlists: {
      type: Array,
      default () {
        return []
      }
    },
    user: {
      type: Object,
      default () {
        return {}
      }
    },
    fetching: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  async asyncData ({ $config, $auth, redirect }) {
    const token = $auth.getToken('local')
    if (token) {
      const data = await axios.get($config.apiURL + '/playlists/get', {
        headers: {
          authorization: token
        }
      }).then((res) => {
        return res.data.playlists
      }).catch((err) => {
        if (err.status === 401) {
          redirect('/')
        }
      })
      return { local_playlists: data }
    }
  },
  data () {
    return {
      local_playlists: this.playlists,
      local_user: this.user,
      local_fetching: this.fetching
    }
  },
  created () {
    const user = this.$auth.user
    if (user) {
      this.local_user = {
        name: user ? user.name : '',
        image: user ? user.image : '',
        numPlaylists: this.local_playlists.length,
        numFollowers: user ? user.followers : 0
      }
    }
  },
  mounted () {
    const urlString = window.location.href
    const urlObj = new URL(urlString)
    if (urlObj.search) {
      urlObj.search = ''
      window.history.pushState({}, document.title, url.format(urlObj))
    }
  },
  methods: {
    isExpiredCache (cacheAsString) {
      const cache = JSON.parse(cacheAsString)
      const prevDate = new Date(cache.date)
      const currentDate = new Date()
      return (currentDate.getTime() - prevDate.getTime()) > cache.expirationTime
    },
    async showPlaylist (_title, _desc, _image, id) {
      const endpoint = `${this.$config.apiURL}/playlists/songs`
      if (!this.local_fetching) {
        let cache = localStorage.getItem(endpoint + id)
        let songs
        this.local_fetching = true
        if (!cache || this.isExpiredCache(cache)) {
          const token = this.$auth.getToken('local')
          if (token) {
            axios.default.withCredentials = true
            await axios.get(endpoint, {
              params: {
                playlistId: id
              },
              headers: {
                authorization: token
              }
            }).then((res) => {
              if (res.data) {
                songs = res.data.songs
                cache = {
                  data: songs,
                  date: new Date(),
                  expirationTime: 3600 * 1000 // 3,600,000 milliseconds = 1 hour
                }
                localStorage.setItem(endpoint + id, JSON.stringify(cache))
              }
            }).catch(() => {
              console.log('error occured')
            })
          }
        } else {
          cache = JSON.parse(cache)
          songs = cache.data
        }
        this.local_fetching = false
        this.$modal.show(
          Playlist,
          { title: _title, desc: _desc, image: _image, songs },
          { width: '1500px', height: '800px', draggable: true })
      }
    }
  }
}
</script>

<style>
@import '../assets/css/scrollbar.css';

* {
  padding: 0px;
  margin: 0px;
}

.count {
  font-weight: bold;
}

.playlist{
  display: flex;
  align-items: center;
  height: 128px;
  width: 512px;
  border-radius: 8px;
  overflow: hidden;
  background: white;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  cursor: pointer;
}

.playlist h2 {
  display: inline-block;
  width: 320px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: black;
  padding: 0 32px;
}

.playlist-image-container{
  display: flex;
  flex-shrink: 0;
  height: 128px;
  width: 128px;
  justify-content: center;
  align-items: center;
}

.playlist-image-container img {
  width: 100%;
  height: auto;
}

#profile-page-container{
  position: relative;
  display: flex;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box; /* Opera/IE 8+ */
  font-family: "Montserrat", sans-serif;
  overflow-x: hidden;
  background: rgb(255,255,255);
  background: -moz-radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 100%);
  background: -webkit-radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 100%);
  background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ffffff",endColorstr="#f6f6f6",GradientType=1);
}

#playlist-container{
  display: flex;
  height: 100%;
  width: 100%;
}

#playlist-list {
  list-style: none;
}

#playlist-list li {
  margin: 32px 52px;
}

#profile-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1000px;
  margin-top: 64px;
}

#profile-top{
  display: flex;
  align-items: flex-start;
  height: 300px;
  width: 90%;
  flex-direction: column;
  border-bottom: 1px solid #adadad;
}

#profile-info{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 160px;
  margin-top: 16px;
  height: 150px;
  width: 100%;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box; /* Opera/IE 8+ */
}

#profile-info ul {
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 384px;
  margin-left: 32px;
  list-style: none;
}

#profile-info ul li {
  display: inline;
  margin-right: 16px;
}

#profile-image-container{
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  height: 128px;
  width: 128px;
  border-radius: 100%;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  overflow: hidden;
}

#profile-image-container img {
  width: 100%;
  height: auto;
}

#profile-header{
  display: block;
  height: 100%;
  max-height: 150px;
  width: 100%;
  padding: 0 160px;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box; /* Opera/IE 8+ */
  overflow: hidden;
}

#profile-header p {
  margin: 16px 0;
}

#profile-name{
  font-size: 1.5em;
  margin-top: 16px;
}

#profile-description{
  font-size: 1em;
}
</style>
