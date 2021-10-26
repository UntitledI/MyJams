<template>
  <div>
    <h1>Tinder for Music</h1>
    <a :href="getLoginUrl"> Login </a>
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
    axios.get(this.$config.apiURL + '/me').then((response) => {
      console.log(response)
    })
  }
}
</script>
