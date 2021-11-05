<template>
    <div>
        <Navbar/>
        <div :id="board" class = "board" @dragover.prevent @drop.prevent="drop">
            <div :id="container" class = "container" draggable="true" @dragstart="dragStart" @dragover.stop>
                <div class = "dislikeButton">
                    <img class = "dislikeButtonImage" src = "../static/buttons/dislike.png" />
                </div>
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
                <div class = "likeButton">
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
  props: ['board', 'container'],
  methods: {
    dragStart: (e) => {
      const target = e.target
      console.log(target)
      e.dataTransfer.setData('container_id', target.id)
      setTimeout(() => {
        target.style.display = 'none'
      }, 0)
    },
    drop: (e) => {
      const containerId = e.dataTransfer.getData('container_id')
      const container = document.getElementById(containerId)
      container.style.display = 'block'
      e.target.appendChild(container)
    }
  },
  setup () {
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
    padding-top: 230px;
}
.container:hover {
    transform: scale(1.1);
}
.recommendationContainer {
    display: flex;
    height: 80%;
    width: 80%;
    align-items: center;
}
.songContainer {
    display: flex;
    border: .3rem solid black;
    height: 500px;
    width: 100%;
    padding: 20px;
}
.dislikeButton {
    height: 128px;
    width: 128px;
    align-self: center;
}
.dislikeButton:hover {
    transform: scale(1.1);
}
.likeButton {
    height: 128px;
    width: 128px;
    align-self: center;
}
.likeButton:hover {
    transform: scale(1.1);
}
.dislikeButtonImage {
    height: 100%;
    width: 100%;
}
.likeButtonImage {
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
</style>
