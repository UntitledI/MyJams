<template>
  <header id="header">
    <div id="nav-container">
      <a id="logo" href="#">AppName</a>
      <nav>
        <ul class="menu-items">
          <li>
            <a href="#">
              Find Music
            </a>
          </li>
          <li class="dropdown">
            <a href="#"><div id="nav-profile-pic" /></a>
            <ul class="dropdown-menu">
              <li>
                <NuxtLink to="/profile" class="menu-item">
                  Profile
                </NuxtLink>
              </li>
              <li>
                <a href="#" class="menu-item">Settings</a>
              </li>
            </ul>
          </li>
          <li>
            <input id="search" type="text" placeholder="Search">
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style>
.element {
    white-space: nowrap;
    padding: 0 1em;
    margin: 0;
}

#header{
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  position: relative;
  background: rgb(44,177,164);
  background: -moz-linear-gradient(90deg, rgba(44,177,164,1) 0%, rgba(23,154,200,1) 50%, rgba(44,177,164,1) 100%);
  background: -webkit-linear-gradient(90deg, rgba(44,177,164,1) 0%, rgba(23,154,200,1) 50%, rgba(44,177,164,1) 100%);
  background: linear-gradient(90deg, rgba(44,177,164,1) 0%, rgba(23,154,200,1) 50%, rgba(44,177,164,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#2cb1a4",endColorstr="#2cb1a4",GradientType=1);
  z-index: 1;
  font-family: "Montserrat", sans-serif;
  font-size: 1.5rem;
}

#header a {
  text-decoration: none;
  color: white;
}

#nav-container{
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1000px;
  padding: 1rem 0;
}

#nav-container ul {
  list-style: none;
}

#logo {
  font-weight: bold;
}

.menu-items {
  display: flex;
  align-items: center;
}

.menu-items li {
  padding: 0.5rem 1rem;
}

.menu-items .dropdown li:hover {
  background: #ffa012;
}

/* dropdown */
.dropdown {
  position: relative;
  overflow: visible;
}

.dropdown-menu {
  position: absolute;
  width: 10rem;
  top: 50px;
  left: 0;
  opacity: 0;
  background: rgb(20,131,170);
  background: -moz-linear-gradient(0deg, rgba(20,131,170,1) 0%, rgba(43,154,171,1) 100%);
  background: -webkit-linear-gradient(0deg, rgba(20,131,170,1) 0%, rgba(43,154,171,1) 100%);
  background: linear-gradient(0deg, rgba(20,131,170,1) 0%, rgba(43,154,171,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#1483aa",endColorstr="#2b9aab",GradientType=1);
}

.menu-item {
  display: flex;
  justify-content: space-between;
  padding-left: 1rem;
  font-size: 1.1rem;
}

.dropdown:hover .dropdown-menu {
  top: 44px;
  opacity: 1;
  visibility: visible;
}
/* dropdown end */

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
    height: 32px;
    width: 32px;
    background-color: white;
    color: black;
    border-radius: 100%;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    padding: 0;
    margin: 0;
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
    width: 12rem;
    height: 1.5rem;
    margin-left: 1rem;
    padding-left: 0.5rem;
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
