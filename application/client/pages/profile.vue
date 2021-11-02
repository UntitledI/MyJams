<template>
  <div id="container">
    <div id="profile-container">
      <div id="profile-top">
        <div id="profile-info">
          <div id="profile-image-container">
            <p>Sample IMG</p>
          </div>
          <ul>
            <li>2 Playlists</li>
            <li>11 Followers</li>
            <li>22 Following</li>
          </ul>
        </div>
        <div id="profile-header">
          <p id="profile-name">Sample User</p>
          <p id="profile-description">
            Hello there! Here is some description about me!
          </p>
        </div>
      </div>
      <div id="playlist-container">
        <ul>
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
              <h2>sample playlist with a long name</h2>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style>
* {
  padding: 0px;
  margin: 0px;
}

.playlist{
  display: flex;
  align-items: center;
  height: 128px;
  width: 512px;
  background-color: #575757;
  border-radius: 8px;
  overflow: hidden;
}

.playlist h2 {
  display: inline-block;
  width: 320px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: white;
  padding: 0 32px;
}

.playlist-image-container{
  display: flex;
  height: 128px;
  width: 128px;
  justify-content: center;
  align-items: center;
  background-color: #b8b8b8;
}

#container{
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
}

#playlist-container{
  display: flex;
  height: 100%;
  width: 100%;
}

#playlist-container ul {
  list-style: none;
}

#playlist-container ul li {
  margin: 32px 52px;
}

#profile-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 1000px;
  margin: 32px 0;
}

#profile-top{
  display: flex;
  align-items: flex-start;
  height: 300px;
  width: 90%;
  flex-direction: column;
  border-bottom: 2px solid #575757;
}

#profile-info{
  display: flex;
  align-items: center;
  padding: 16px 160px;
  height: 150px;
  width: 100%;
  box-sizing: border-box;
}

#profile-info ul {
  display: flex;
  justify-content: space-evenly;
  width: 384px;
  list-style: none;
}

#profile-info ul li {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
  width: 96px;
}

#profile-image-container{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 128px;
  width: 128px;
  background-color: #b8b8b8;
  border-radius: 100%;
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
}

#profile-description{
  font-size: 1em;
}
</style>
