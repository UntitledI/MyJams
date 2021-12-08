<template>
  <div v-if="$auth.loggedIn">
    <Questions />
  </div>
</template>

<script>
import Questions from '../components/Questions.vue'

export default {
  name: 'Questionnaire',
  components: {
    Questions
  },
  created () {
    if (process.client) {
      if (!this.$auth.loggedIn && this.$route.path !== '/') {
        this.$router.push('/')
      } else {
        this.$router.replace({ query: null })
      }
    }
  }
}
</script>
