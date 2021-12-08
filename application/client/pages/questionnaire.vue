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
  middleware: 'auth',
  created () {
    if (process.client) {
      this.$router.replace({ query: null })
    }
  }
}
</script>
