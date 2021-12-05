<template>
  <div>
    <h1>MyJams</h1>
    <!--
    <NuxtLink to="/profile">
      Login
    </NuxtLink>
    -->
    <button @click="handleLogin">
      Login
    </button>
    <!-- <a :href="getLoginUrl">Login</a> -->
  </div>
</template>

<script>
export default {
  computed: {
    getLoginUrl () {
      return this.$config.apiURL + '/oauth/spotify'
    }
  },
  async mounted () {
    const res = await this.$store.dispatch('fetchUser')
    if (res) {
      localStorage.setItem('user', JSON.stringify(res))
      this.$router.push('/profile')
    } else {
      localStorage.removeItem('user')
    }
  },
  methods: {
    handleLogin () {
      window.open(this.$config.apiURL + '/oauth/spotify', '_self')
    }
  }
}
</script>
