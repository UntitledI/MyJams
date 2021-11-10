<template>
  <div>
    <Navbar />
    <div id="container">
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
              <li>
                <span>
                  <span id="following-count" class="count">{{ local_user.numFollowing }}</span> Following
                </span>
              </li>
            </ul>
          </div>
          <section id="profile-header">
            <h2 id="profile-name">
              {{ local_user.name }}
            </h2>
            <p id="profile-description">
              {{ local_user.description }}
            </p>
          </section>
        </header>
        <div id="playlist-container">
          <ul id="playlist-list">
            <li v-for="playlist in local_playlists" :key="playlist.id">
              <div class="playlist" @click="showPlaylist(playlist.name, playlist.description, playlist.image)">
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
import Navbar from '../components/Navbar'
import Playlist from '../components/Playlist'

export default {
  Navbar,
  Playlist,
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
    }
  },
  data () {
    return {
      local_playlists: this.playlists,
      local_user: this.user
    }
  },
  created () {
    // make a call to backend api to populate playlists
    this.local_playlists = [
      {
        name: 'Sample Playlist 1',
        description: 'Sample description 1',
        image: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
        id: '1'
      },
      {
        name: 'Sample Playlist 2',
        description: 'Sample description 2',
        image: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
        id: '2'
      },
      {
        name: 'Sample Playlist 3',
        description: 'Sample description 3',
        image: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
        id: '3'
      },
      {
        name: 'Sample Playlist 4',
        description: 'Sample description 4',
        image: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
        id: '4'
      },
      {
        name: 'Sample Playlist 5 w/ a long name',
        description: 'Sample description 5',
        image: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
        id: '5'
      },
      {
        name: 'Sample Playlist 6',
        description: 'Sample description 6',
        image: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
        id: '6'
      },
      {
        name: 'Sample Playlist 7',
        description: 'Sample description 7',
        image: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
        id: '7'
      }
    ]
    this.local_user = {
      name: 'Sample User',
      image: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
      description: 'Hello there! Here is some description about me!',
      numPlaylists: this.local_playlists.length,
      numFollowers: 11,
      numFollowing: 22
    }
  },
  methods: {
    showPlaylist (_title, _desc, _image) {
      this.$modal.show(
        Playlist,
        { title: _title, desc: _desc, image: _image },
        { width: '1500px', height: '800px', draggable: true })
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

#container{
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
