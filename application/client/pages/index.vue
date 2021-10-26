<template>
  <div>
    <h1>Tinder for Music</h1>
    <a href="http://localhost:3030/oauth/spotify"> Login </a>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  mounted () {
    axios.get('http://localhost:3030/me').then((response) => {
      console.log(response)
    })
  }
}
</script>
