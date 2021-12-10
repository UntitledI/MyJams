<template>
    <div>
        <Navbar/>
        <div>
            <div id="container" class = "container">
                <div class = "recommendation-container" >
                    <swiper id = "swiper" @touchEnd="touchEnd">
                    <swiper-slide>
                        <div id = "song-container" class = "song-container">
                            <div class = "song-cover">
                                <img class = "song-image" src="../static/songCovers/StuckOnYou.png"></img>
                            </div>
                            <div class = "song-information">
                                <span class = "song-name"> {{ local_tracks[local_index].name }}</span>
                                <span class = "artist-name"> {{ local_tracks[local_index].artist }} </span>
                                <span class = "album-name"> {{ local_tracks[local_index].album }} </span>
                                <span class = "genre"> {{ local_tracks[local_index].genre }} </span>
                            </div>
                        </div>
                    </swiper-slide>
                    </swiper>
                </div>
                <div class = "button-container">
                    <div class = "dislike-button">
                        <img class = "dislike-button-image" @click = "dislike" src = "../static/buttons/dislike.png" />
                    </div>
                    <div class = "like-button">
                    <img class = "like-button-image" @click ="like" src = "../static/buttons/like.png"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import url from 'url'
import axios from 'axios'
import Navbar from '../components/Navbar'

export default {
  components: {
    Navbar
  },
  middleware: ['auth-user'],
  props: {
    tracks: {
      type: Array,
      default () {
        return []
      }
    },
    index: {
      type: Number,
      default: 0
    }
  },
  async asyncData ({ $config, $auth, redirect }) {
    const token = $auth.getToken('local')
    if (token) {
      const data = await axios.get($config.apiURL + '/recommendation/get', {
        headers: {
          authorization: token
        }
      }).then((res) => {
        return res.data
      }).catch((err) => {
        if (err.status === 401) {
          redirect('/')
        }
      })

      return { local_tracks: data, local_index: 0 }
    }
  },
  data () {
    return {
      local_tracks: this.tracks,
      local_index: this.index
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
    touchEnd () {
      const element = document.getElementsByClassName('swiper-wrapper')
      const x = element[0].style.transform.substring(11).replace(/[^\-0-9.]/g, '')
      if (x > 120) {
        this.like()
      }
      if (x < -120) {
        this.dislike()
      }
    },
    like () {
      if (this.local_index < this.local_tracks.length - 1) {
        this.local_index++
      }
    },
    dislike () {
      if (this.local_index < this.local_tracks.length - 1) {
        this.local_index++
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
    font-family: "Montserrat", sans-serif;
}
.container {
    display: flex;
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.recommendation-container {
    display: flex;
    padding-top:150px;
    width: 100%;
    align-items: center;
}
.song-container {
    display: flex;
    border: .3rem solid rgb(75,173,181);
    padding: 20px;
    min-width: 60%;
    height: 500px;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px,
    rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px,
    rgba(0, 0, 0, 0.09) 0px -3px 5px
}
.song-image {
    width: 540px;
    height: 500px;
}
.button-container {
    padding: 50px;
    display: flex;
    gap: 100px;
}
.like-button, .dislike-button {
    border: .3rem solid rgb(13,173,181);
    width: 128px;
    align-self: center;
    z-index: 1;
    box-sizing: border-box;
    transform: scale(1.1);
}
.like-button:hover,.dislike-button:hover {
    transform: scale(1.2);
}
.like-button-image, .dislike-button-image {
    height: 100%;
    width: 100%;
}
.button-text {
    font-size: 70px;
}
.song-cover {
    border: .1rem solid black;
    width: 60%;
    align-content: center;
}

.song-information {
    display: flex;
    flex-direction: column;
    padding-left: 30px;
    overflow-x: hidden;
    font-size: 30px;
}
.song-name {
    font-size: 50px;
    text-decoration: underline;
}
.artist-name {
    padding-top: 20px;
    padding-left: 30px;
}
.album-name {
    padding-top: 20px;
}
.genre {
    padding-top: 20px;
}
.swiper-container{
    margin: 0;
    width: 100%;
    overflow: visible;
}
</style>
