<template>
    <div>
        <Navbar/>
        <div>
            <div id="container" class = "container">
                <div class = "recommendationContainer" >
                    <swiper id = "swiper" @slideChange ="onSlideChange" @reachEnd="reachEnd" @sliderMove="sliderMove" @touchEnd="touchEnd">
                    <swiper-slide>
                        <div id = "songContainer" class = "songContainer">
                            <div class = "songCover">
                                <img class = "songImage" src="../static/songCovers/StuckOnYou.png"></img>
                            </div>
                            <div class = "songInformation">
                                <span class = "songName"> {{ local_tracks[local_index].name }}</span>
                                <span class = "artistName"> {{ local_tracks[local_index].artist }} </span>
                                <span class = "albumName"> {{ local_tracks[local_index].album }} </span>
                                <span class = "genre"> {{ local_tracks[local_index].genre }} </span>
                            </div>
                        </div>
                    </swiper-slide>
                    </swiper>
                </div>
                <div class = "buttonContainer">
                    <div class = "dislikeButton">
                        <img class = "dislikeButtonImage" @click = "dislike" src = "../static/buttons/dislike.png" />
                    </div>
                    <div class = "likeButton">
                    <img class = "likeButtonImage" @click ="like" src = "../static/buttons/like.png"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '../components/Navbar'

export default {
  components: {
    Navbar
  },
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
  data () {
    return {
      local_tracks: this.tracks,
      local_index: this.index
    }
  },
  created () {
    this.local_tracks = [
      {
        id: '1',
        image: 'http://localhost:3000/_nuxt/static/songCovers/LunasHowl.png',
        name: 'Luna\'s Howl',
        artist: 'Switch 24/7',
        album: 'SoundCloud',
        genre: 'Pop'
      },
      {
        id: '2',
        image: 'http://localhost:3000/_nuxt/static/songCovers/LunasHowl.png',
        name: 'Stuck On You',
        artist: 'Coco Love ft. Switch24/7',
        album: 'Heart Broken',
        genre: 'R&B'
      },
      {
        id: '3',
        image: 'http://localhost:3000/_nuxt/static/songCovers/OneLastSauce.png',
        name: 'One Last Sauce',
        artist: 'Switch 24/7',
        album: 'The Finale',
        genre: 'Hip Hop'
      }
    ]
  },
  mounted () {
  },
  methods: {
    test () {
      const element = document.getElementsByClassName('swiper-wrapper')
      console.log(element[0].style.transform)
    },
    onSlideChange () {
      console.log('slide changed')
    },
    reachEnd () {
      const element = document.getElementsByClassName('swiper-wrapper')
      console.log(element[0].style.transform)
    },
    touchEnd () {
      const element = document.getElementsByClassName('swiper-wrapper')
      const x = element[0].style.transform.substring(11).replace(/[^\-0-9.]/g, '')
      if (x > 120) {
        this.like()
      }
      if (x < -120) {
        this.dislike()
      }
      console.log(x)
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
.recommendationContainer {
    display: flex;
    padding-top:150px;
    width: 100%;
    align-items: center;
}
.songContainer {
    display: flex;
    border: .3rem solid rgb(75,173,181);
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
.songContainer {
    padding: 20px;
    min-width: 60%;
}
.songImage {
    width: 540px;
    height: 500px;
}
.buttonContainer {
    padding: 50px;
    display: flex;
    gap: 100px;
}
.likeButton, .dislikeButton {
    border: .3rem solid rgb(13,173,181);
    width: 128px;
    align-self: center;
    z-index: 1;
    box-sizing: border-box;
    transform: scale(1.1);
}
.likeButton:hover,.dislikeButton:hover {
    transform: scale(1.2);
}
.likeButtonImage, .dislikeButtonImage {
    height: 100%;
    width: 100%;
}
.retryButtonContainer {
    align-self:top;
}
.buttonText {
    font-size: 70px;
}
.songCover {
    border: .1rem solid black;
    width: 60%;
    align-content: center;
}

.songInformation {
    display: flex;
    flex-direction: column;
    padding-left: 30px;
    overflow-x: hidden;
    font-size: 30px;
}
.songName {
    font-size: 50px;
    text-decoration: underline;
}
.artistName {
    padding-top: 20px;
    padding-left: 30px;
}
.albumName {
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
