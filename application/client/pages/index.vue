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
      return process.env.API_URL + '/oauth/spotify'
    }
  },
  mounted () {
    axios.get(process.env.API_URL + '/me').then((response) => {
      console.log(response)
    })
  }
}
</script>
