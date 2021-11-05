<template>
    <div>
        <Navbar/>
        <div>
            <div id="container" class = "container">
                <div class = "dislikeButton" @dragstart="dragStart" @dragend="dragEnd">
                    <img class = "dislikeButtonImage" src = "../static/buttons/dislike.png" />
                </div>
                <swiper>
                    <swiper-slide>
                    <div class = "recommendationContainer">
                        <div class = "songContainer">
                            <div class = "songCover">
                                <img class ="songImage" >IMAGE HERE </img>
                            </div>
                            <div class = "songInformation">
                                <span class = "songName"> Song Name</span>
                                <span class = "artistName"> Artist Name </span>
                                <span class = "albumName"> Album Name </span>
                                <span class = "genre"> Genre </span>
                            </div>
                        </div>
                    </div>
                    </swiper-slide>
                </swiper>
                <div class = "likeButton" @dragstart="dragStart" @dragend="dragEnd" >
                    <img class = "likeButtonImage" src = "../static/buttons/like.png"/>
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
  methods: {
    dragStart: (e) => {
      const target = e.target
      setTimeout(() => {
        target.style.display = 'none'
      }, 0)
    },
    dragEnd: (e) => {
      const target = e.target
      setTimeout(() => {
        target.style.display = 'block'
      }, 0)
    }
  }
}

</script>

<style>
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
}
.recommendationContainer {
    display: flex;
    height: 1000px;
    width: 750px;
    align-items: center;
}
.songContainer {
    display: flex;
    border: .3rem solid black;
    height: 500px;
    width: 100%;
    padding: 20px;
}
.likeButton, .dislikeButton {
    height: 128px;
    width: 128px;
    align-self: center;
}
.likeButton:hover,.dislikeButton:hover {
    transform: scale(1.1);
}

.likeButtonImage, .dislikeButtonImage {
    height: 100%;
    width: 100%;
}

.songCover {
    border: .1rem solid black;
    width: 35%;
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
    max-width: 1000px;
    overflow: visible;
}
</style>
