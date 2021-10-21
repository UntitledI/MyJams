<template>
  <div>
    <a href="" />
  </div>
</template>

<script>
import axios from 'axios'
export default {
  mounted () {
    axios.get('http://localhost:3030').then((response) => {
      console.log(response)
    })
  }
}
</script>
