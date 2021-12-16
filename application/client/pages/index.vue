<template>
  <div id="home-page-container">
    <div id="content-container">
      <h1 id="title">
        MyJams
      </h1>
      <div>
        <a :href="getLoginUrl" class="button" role="button">
          Login
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import url from 'url'

export default {
  computed: {
    getLoginUrl () {
      return this.$config.apiURL + '/oauth/spotify'
    }
  },
  mounted () {
    const urlString = window.location.href
    const urlObj = new URL(urlString)
    const loginCode = urlObj.searchParams.get('loginCode')
    if (loginCode) {
      this.$auth.loginWith('local', {
        data: {
          loginCode
        }
      }).catch(() => {
        urlObj.search = ''
        window.history.pushState({}, document.title, url.format(urlObj))
      })
    }
  }
}
</script>

<style>
#home-page-container{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box; /* Opera/IE 8+ */
  font-family: "Montserrat", sans-serif;
  background: rgb(182,235,254);
  background: -moz-linear-gradient(0deg, rgba(182,235,254,1) 0%, rgba(44,177,164,1) 100%);
  background: -webkit-linear-gradient(0deg, rgba(182,235,254,1) 0%, rgba(44,177,164,1) 100%);
  background: linear-gradient(0deg, rgba(182,235,254,1) 0%, rgba(44,177,164,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#b6ebfe",endColorstr="#2cb1a4",GradientType=1);
}

#content-container{
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  height: 20em;
}

#title{
  font-size: 5em;
  width: 100%;
  color: #fafafa;
}

#login{
  text-decoration: none;
  font-size: 1.5em;
}

.button {
  background-color: #0095ff;
  border: 1px solid transparent;
  border-radius: 3px;
  box-shadow: rgba(255, 255, 255, .4) 0 1px 0 0 inset;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-weight: 400;
  line-height: 1.15385;
  margin: 0;
  outline: none;
  padding: 8px .8em;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  white-space: nowrap;
}

.button:hover,
.button:focus {
  background-color: #07c;
}

.button:focus {
  box-shadow: 0 0 0 4px rgba(0, 149, 255, .15);
}

.button:active {
  background-color: #0064bd;
  box-shadow: none;
}
</style>
