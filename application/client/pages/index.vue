<template>
  <div>
    <h1>Tinder for Music Class Demo</h1>
    <NuxtLink to="/profile">
      Login
    </NuxtLink>
    <!-- <a :href="getLoginUrl"> Login </a> -->
  </div>
</template>

<script>
import axios from 'axios'
export default {

  computed: {
    getLoginUrl () {
      return this.$config.apiURL + '/oauth/spotify'
    }
  },
  mounted () {
    let x = "hi"
    axios.get(this.$config.apiURL + '/me').then((response) => {
      console.log(response)
    })
  }
}
</script>
