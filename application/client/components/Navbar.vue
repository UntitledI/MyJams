<template>
  <nav id="navbar">
    <div id="elements-container">
      <div id="logo" class="element">
        <a>AppName</a>
      </div>
      <div id="find-music" class="element">
        <NuxtLink to="/profile">
          Find Music
        </NuxtLink>
      </div>
      <div id="functions-container" class="element">
        <div id="profile">
          <div id="nav-profile-pic" />
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
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 1000px;
    overflow-x: hidden;
    padding: 0;
}

#functions-container{
    float: right;
}

#navbar {
    display: flex;
    height: 80px;
    width: 100%;
    padding: 0;
    list-style: none;
    overflow-y: hidden;
    justify-content: center;
    align-items: center;
    font-family: "Montserrat", sans-serif;
    font-size: 1.5rem;
    color: white;
    background: rgb(44,177,164);
    background: -moz-linear-gradient(90deg, rgba(44,177,164,1) 0%, rgba(23,154,200,1) 50%, rgba(44,177,164,1) 100%);
    background: -webkit-linear-gradient(90deg, rgba(44,177,164,1) 0%, rgba(23,154,200,1) 50%, rgba(44,177,164,1) 100%);
    background: linear-gradient(90deg, rgba(44,177,164,1) 0%, rgba(23,154,200,1) 50%, rgba(44,177,164,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#2cb1a4",endColorstr="#2cb1a4",GradientType=1);
    -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
    -moz-box-sizing: border-box; /* Firefox, other Gecko */
    box-sizing: border-box; /* Opera/IE 8+ */
    position: fixed;
}

#nav-profile-pic{
    height: 32x;
    width: 32px;
    background-color: white;
    color: black;
    border-radius: 100%;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
}

#profile {
    display: flex;
    height: 100%;
}

#profile img {
    width: 1.75em;
    height: 1.75em;
}

#search {
    width: 12em;
    height: 2em;
    margin-left: 1em;
    padding-left: 0.5em;
    align-self: center;
}

#find-music{
    position: absolute;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    font-weight: bold;
}

#find-music a {
    color: inherit;
    text-decoration: none;
}

.element {
    white-space: nowrap;
    padding: 0 1em;
    margin: 0;
}

@media only screen and (max-width: 650px) {
    #elements-container {
      justify-content: space-evenly;
    }

    #logo {
        display: none;
    }

    #find-music{
      position: relative;
      left: 0;
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
}
</style>
