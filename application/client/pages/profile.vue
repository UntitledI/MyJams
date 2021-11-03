<template>
  <div>
    <Navbar />
    <div id="container">
      <main id="profile-container">
        <header id="profile-top">
          <div id="profile-info">
            <div id="profile-image-container">
              <p>Sample IMG</p>
            </div>
            <ul>
              <li>
                <span>
                  <span id="playlists-count" class="count">2</span> Playlists
                </span>
              </li>
              <li>
                <span>
                  <span id="followers-count" class="count">11</span> Followers
                </span>
              </li>
              <li>
                <span>
                  <span id="following-count" class="count">22</span> Following
                </span>
              </li>
            </ul>
          </div>
          <section id="profile-header">
            <h2 id="profile-name">
              Sample User
            </h2>
            <p id="profile-description">
              Hello there! Here is some description about me!
            </p>
          </section>
        </header>
        <div id="playlist-container">
          <ul id="playlist-list">
            <li>
              <div class="playlist">
                <div class="playlist-image-container">
                  <p>Sample IMG</p>
                </div>
                <h2>sample playlist 1</h2>
              </div>
            </li>
            <li>
              <div class="playlist">
                <div class="playlist-image-container">
                  <p>Sample IMG</p>
                </div>
                <h2>sample playlist w/ a long name</h2>
              </div>
            </li>
            <li>
              <div class="playlist">
                <div class="playlist-image-container">
                  <p>Sample IMG</p>
                </div>
                <h2>sample playlist 3</h2>
              </div>
            </li>
            <li>
              <div class="playlist">
                <div class="playlist-image-container">
                  <p>Sample IMG</p>
                </div>
                <h2>sample playlist 4</h2>
              </div>
            </li>
            <li>
              <div class="playlist">
                <div class="playlist-image-container">
                  <p>Sample IMG</p>
                </div>
                <h2>sample playlist 5</h2>
              </div>
            </li>
            <li>
              <div class="playlist">
                <div class="playlist-image-container">
                  <p>Sample IMG</p>
                </div>
                <h2>sample playlist 6</h2>
              </div>
            </li>
            <li>
              <div class="playlist">
                <div class="playlist-image-container">
                  <p>Sample IMG</p>
                </div>
                <h2>sample playlist 7</h2>
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
export default {
  Navbar
}
</script>

<style>
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
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
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

#container{
  display: flex;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
  overflow-x: hidden;
  background: rgb(255,255,255);
  background: -moz-radial-gradient(circle, rgba(255,255,255,1) 53%, rgba(235,235,235,1) 100%);
  background: -webkit-radial-gradient(circle, rgba(255,255,255,1) 53%, rgba(235,235,235,1) 100%);
  background: radial-gradient(circle, rgba(255,255,255,1) 53%, rgba(235,235,235,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ffffff",endColorstr="#ebebeb",GradientType=1);
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
  margin: 96px 0;
  background-color: white;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
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
  box-sizing: border-box;
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
}

#profile-header{
  display: block;
  height: 100%;
  max-height: 150px;
  width: 100%;
  padding: 0 160px;
  box-sizing: border-box;
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
