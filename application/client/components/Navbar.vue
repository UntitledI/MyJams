<template>
  <nav id="navbar">
    <div id="elements-container">
      <div class="element">
        <a>AppName</a>
      </div>
      <div class="element">
        <a>Find Music</a>
      </div>
      <div class="element">
        <div id="profile">
          <img src="profile-empty.png">
          <input id="search" type="text" placeholder="Search">
        </div>
      </div>
    </div>
  </nav>
</template>

<style>
* {
  padding: 0px;
  margin: 0px;
}

#elements-container {
  width: 1000px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
}

#navbar {
  display: flex;
  height: 80px;
  width: 100vw;
  margin: 0;
  padding: 0;
  list-style: none;
  overflow-y: hidden;
  justify-content: center;
  align-items: center;
  font-family: "Montserrat", sans-serif;
  font-size: 1.5rem;
  color: white;
  background-color: black;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box; /* Opera/IE 8+ */
}

#profile {
  display: flex;
}

#profile img {
  width: 1.75em;
  height: 1.75em;
}

#search {
  width: 10em;
  height: 2em;
  margin-left: 1em;
  padding-left: 0.5em;
  align-self: center;
}

.element {
  white-space: nowrap;
  padding: 0 1em;
  margin: 0;
}
</style>
