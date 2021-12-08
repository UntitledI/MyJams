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
export default {
  computed: {
    getLoginUrl () {
      return this.$config.apiURL + '/oauth/spotify'
    }
  },
  mounted () {
    let code = null
    const url = window.location.search
    if (url.length > 0) {
      code = url.replace('?loginCode=', '')
    }
    if (code) {
      this.$auth.loginWith('local', {
        data: {
          loginCode: code
        }
      })
    }
  }
}
</script>
