<template>
  <div>
    <h1>MyJams</h1>
    <div v-if="!$auth.loggedIn">
      <a :href="getLoginUrl">Login</a>
    </div>
    <div v-else>
      <NuxtLink to="/profile">
        Login
      </NuxtLink>
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
