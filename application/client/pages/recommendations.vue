<template>
  <div v-if="$auth.loggedIn">
    <Navbar />
    <div>
      <div id="recommendations-page-container">
        <div class="recommendation-container">
          <swiper id="swiper" @touchEnd="touchEnd">
            <swiper-slide>
              <div v-if="local_tracks[local_index]">
                <div id="song-container" class="song-container">
                  <div class="song-cover">
                    <img :src="local_tracks[local_index].image">
                  </div>
                  <div class="song-information">
                    <!--
                    <span class="song-name"> {{ local_tracks[local_index].name }}</span>
                    <span class="artist-name"> {{ local_tracks[local_index].artist }} </span>
                    <span class="album-name"> {{ local_tracks[local_index].album }} </span>
                    -->
                    <span class="genre"> {{ local_tracks[local_index].genre }} </span>
                  </div>
                  <div class="player">
                    <iframe
                      :src="'https://open.spotify.com/embed/track/'+local_tracks[local_index].id"
                      width="400"
                      height="80"
                      frameborder="0"
                      allowtransparency="true"
                      allow="encrypted-media"
                    />
                  </div>
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
        <div class="button-container">
          <div class="dislike-button">
            <img class="dislike-button-image" src="../static/buttons/dislike.png" @click="dislike">
          </div>
          <div class="like-button">
            <img class="like-button-image" src="../static/buttons/like.png" @click="like">
          </div>
        </div>
      </div>
    </div>
    <div id= "after-swipe-container" class = "after-swipe-container">
        <RecommendationPopUp />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Navbar from '../components/Navbar'
import RecommendationPopUp from '../components/RecommendationPopUp'

export default {
  components: {
    Navbar,
    RecommendationPopUp
  },
  middleware: 'auth',
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
    },
    dislikedTracks: {
      type: Array,
      default () {
        return []
      }
    },
    likedTracks: {
      type: Array,
      default () {
        return []
      }
    }
  },
  async asyncData ({ $config, $auth, redirect }) {
    const token = $auth.getToken('local')
    // console.log($config.apiURL + '/recommendation/get')
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
      local_index: this.index,
      local_dislikedTracks: this.dislikedTracks,
      local_likedTracks: this.likedTracks
    }
  },
  created () {
    if (process.client && this.$router.query) {
      this.$router.replace({ query: null })
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
      // console.log(x)
    },
    like () {
      if (this.local_index === 9) {
        this.local_likedTracks.push(this.local_tracks[this.local_index].id)
        console.log('I am inside the likes recommendation.vue')
        console.log(this.local_likedTracks)
        this.getNewRecommendations()
        // send data to back end
        document.getElementById('after-swipe-container').style.display = 'block'
      } else if (this.local_index < this.local_tracks.length) {
        this.local_likedTracks.push(this.local_tracks[this.local_index].id)
        this.local_index++
      }
    },
    dislike () {
      if (this.local_index === 9) {
        this.local_dislikedTracks.push(this.local_tracks[this.local_index].id)
        console.log('I am inside the dislikes recommendation.vue')
        console.log(this.local_dislikedTracks)
        this.getNewRecommendations()
        // send data to back end
        document.getElementById('after-swipe-container').style.display = 'block'
      } else if (this.local_index < this.local_tracks.length) {
        this.local_dislikedTracks.push(this.local_tracks[this.local_index].id)
        this.local_index++
      }
    },
    async getNewRecommendations () {
      console.log('hi. ')
      const token = this.$auth.getToken('local')
      if (token) {
        console.log('I am inside getnewRecommendation function')
        await axios.post(this.$config.apiURL + '/recommendation/new', {
          likes: this.local_likedTracks,
          dislikes: this.local_dislikedTracks
        }, {
          headers: {
            authorization: token
          }
        }).then((res) => {
          console.log('getNewRecommendations res')
          console.log(res)
        }).catch((err) => {
          console.log('getNewRecommendations error')
          console.log(err)
        })
      }
    }
  }
}
</script>

<style>
@import '../assets/css/scrollbar.css';
::-moz-selection {
    background-color: transparent;
    color: #000;
}
::selection {
    background-color: transparent;
    color: #000;
}
* {
  padding: 0px;
  margin: 0px;
  font-family: "Montserrat", sans-serif;
}
#recommendations-page-container {
  display: flex;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: transparent;
}
.recommendation-container {
  display: flex;
  padding-top:150px;
  width: 100%;
  align-items: center;
}
.song-container {
  display: flex;
  flex-direction: column;
  height: 480px;
  width: 400px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
  rgba(0, 0, 0, 0.12) 0px -12px 30px,
  rgba(0, 0, 0, 0.12) 0px 4px 6px,
  rgba(0, 0, 0, 0.17) 0px 12px 13px,
  rgba(0, 0, 0, 0.09) 0px -3px 5px
}
.button-container {
  padding: 50px;
  display: flex;
  gap: 100px;
}
.like-button, .dislike-button {
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
.player {
  display: flex;
  width: 400;
  align-items: center;
  justify-content: center;
}
.song-cover{
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  height: 400px;
  width: 400px;
  overflow: hidden;
}
.song-information {
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  font-size: 30px;
}
.song-name {
  font-size: 3rem;
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
.swiper-container {
  margin: 0;
  width: 100%;
  overflow: visible;
}
.after-swipe-container {
  display: flex;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: transparent;
  display: none;
}
</style>
