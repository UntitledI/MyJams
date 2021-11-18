<template>
  <header id="header">
    <div id="nav-container">
      <span id="logo">AppName</span>
      <nav>
        <ul id="functions-container" class="menu-items">
          <li id="find-music-container">
            <NuxtLink to="/find-music">
              Find Music
            </NuxtLink>
          </li>
          <li class="dropdown">
            <div id="profile-search-container">
              <div id="nav-profile-pic" @click.stop="showDropdown('#profile-dropdown')">
                <img :src="local_image">
              </div>
              <ul id="profile-dropdown" class="dropdown-menu">
                <li>
                  <NuxtLink to="/profile" class="menu-item">
                    Profile
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/settings" class="menu-item">
                    Settings
                  </NuxtLink>
                </li>
              </ul>
              <input id="search" type="text" placeholder="Search">
            </div>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      default: ''
    }
  },
  data () {
    return { local_image: this.image }
  },
  created () {
    // replace this code to get url to user's profile pic from spotify API
    this.local_image = 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228'
  },
  methods: {
    showDropdown (selector) {
      const element = document.querySelector(selector)

      const outsideClickListener = (event) => {
        if (!element.contains(event.target) && element.classList.contains('dropdown-menu-visible')) {
          element.setAttribute('class', 'dropdown-menu')
          removeClickListener()
        }
      }

      const removeClickListener = () => {
        document.removeEventListener('click', outsideClickListener)
      }

      document.addEventListener('click', outsideClickListener)
      element.setAttribute('class', 'dropdown-menu-visible')
    }
  }
}
</script>

<style>
nav {
  width: 66%;
}

.menu-items {
  display: flex;
  align-items: center;
}

.menu-items li {
  padding: 0.5rem 1rem;
}

.dropdown {
  position: relative;
  overflow: visible;
}

.dropdown li {
  transition: background 0.15s ease-in-out;
}

.dropdown li:hover {
  cursor: pointer;
  background: #ffa012;
}

.dropdown-menu {
  position: absolute;
  visibility: hidden;
}

.dropdown-menu-visible {
  position: absolute;
  width: 10rem;
  top: 4rem;
  left: 0;
  opacity: 1;
  background: rgb(20,131,170);
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;
}

.menu-item {
  display: flex;
  justify-content: space-between;
  padding-left: 1rem;
  font-size: 1.1rem;
}

#header{
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100vw;
  height: 5rem;
  position: fixed;
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
  color: white;
}

#functions-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
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
    cursor: pointer;
    overflow: hidden;
}

#nav-profile-pic img {
    width: 100%;
    height: auto;
}

#search {
    width: 12rem;
    height: 1.5rem;
    margin-left: 1rem;
    padding-left: 0.5rem;
    align-self: center;
}

#profile-search-container {
  display: flex;
}

#find-music-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33%;
  white-space: nowrap;
}

@media only screen and (max-width: 650px) {
    nav {
      width: 100%;
    }

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
