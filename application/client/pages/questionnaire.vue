<template>
  <div v-if="$auth.loggedIn">
    <Questions />
  </div>
</template>

<script>
import url from 'url'
import Questions from '../components/Questions.vue'

export default {
  name: 'Questionnaire',
  components: {
    Questions
  },
  middleware: ['auth-user'],
  mounted () {
    const urlString = window.location.href
    const urlObj = new URL(urlString)
    if (urlObj.search) {
      urlObj.search = ''
      window.history.pushState({}, document.title, url.format(urlObj))
    }
  }
}
</script>
