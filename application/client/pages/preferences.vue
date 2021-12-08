<template>
  <div v-if="$auth.loggedIn">
    <Navbar />
    <div id="preferences-page-container">
      <div id="preferences-container">
        <ul v-if="local_preferences" id="preferences-list">
          <li v-for="preference in local_preferences" :key="preference.id">
            <div v-if="!preference.current" class="preference">
              <h2>{{ preference.name }}</h2>
              <img v-if="deletePreference" src="../static/xbutton.png" @click="handleDelete(preference.id)">
            </div>
            <div v-if="preference.current" class="preference-current">
              <h2>{{ preference.name }}</h2>
              <img v-if="deletePreference" src="../static/xbutton.png" @click="handleDelete(preference.id)">
            </div>
          </li>
        </ul>
        <div id="preferences-buttons-container">
          <NuxtLink to="/questionnaire">
            <button class="preferences-buttons">
              Add
            </button>
          </NuxtLink>
          <button v-if="local_preferences && local_preferences.length !== 0" class="preferences-buttons" @click="deletePreference = !deletePreference">
            <p v-if="!deletePreference">
              Delete
            </p>
            <p v-else>
              Back
            </p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Navbar from '../components/Navbar'

export default {
  Navbar,
  props: {
    preferences: {
      type: Array,
      default () {
        return []
      }
    }
  },
  async asyncData ({ $config, $auth, redirect }) {
    const token = $auth.getToken('local')

    if (token) {
      const data = await axios.get($config.apiURL + '/preference/get', {
        headers: {
          authorization: token
        }
      }).then((res) => {
        return res.data.preferences
      }).catch((err) => {
        if (err.status === 401) {
          redirect('/')
        }
      })

      return { local_preferences: data }
    }
  },
  data () {
    return {
      deletePreference: false,
      local_preferences: this.preferences
    }
  },
  created () {
    if (process.client) {
      if (!this.$auth.loggedIn && this.$route.path !== '/') {
        this.$router.push('/')
      } else {
        this.$router.replace({ query: null })
      }
    }
  },
  methods: {
    async handleDelete (id) {
      const token = this.$auth.getToken('local')
      const index = this.local_preferences.findIndex(pref => pref.id === id)
      const preferenceId = this.local_preferences[index].id
      if (index > -1) {
        this.local_preferences.splice(index, 1)
      }
      await axios.post(this.$config.apiURL + '/preference/delete', {
        preferenceId
      }, {
        headers: {
          authorization: token
        }
      }).catch((err) => {
        console.log('error occured')
        console.log(err.response.status)
      })
    },
    async setPreference () {
      const token = this.$auth.getToken('local')
      await axios.post(this.$config.apiURL + '/preference/set', {
        preferenceId: ''
      }, {
        headers: {
          authorization: token
        }
      }).catch((err) => {
        console.log('error occured')
        console.log(err.response.status)
      })
    }
  }
}
</script>

<style>
* {
  padding: 0px;
  margin: 0px;
}

.preference-current {
  display: flex;
  align-items: center;
  height: 128px;
  width: 512px;
  border-radius: 8px;
  overflow: hidden;
  background: white;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  border: 2px solid black;
}

.preference {
  display: flex;
  align-items: center;
  height: 128px;
  width: 512px;
  border-radius: 8px;
  overflow: hidden;
  background: white;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
}

.preference h2 {
  display: inline-block;
  width: 380px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: black;
  padding: 0 32px;
}

.preference img {
  cursor: pointer;
}

.preferences-buttons {
  cursor: pointer;
  width: 200px;
  height: 50px;
  margin: 10px;
}

#preferences-page-container {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
  font-family: "Montserrat", sans-serif;
  background: rgb(255,255,255);
  background: -moz-radial-gradient(circle, rgba(255,255,255,1) 17%, rgba(246,246,246,1) 40%, rgba(235,235,235,1) 100%);
  background: -webkit-radial-gradient(circle, rgba(255,255,255,1) 17%, rgba(246,246,246,1) 40%, rgba(235,235,235,1) 100%);
  background: radial-gradient(circle, rgba(255,255,255,1) 17%, rgba(246,246,246,1) 40%, rgba(235,235,235,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ffffff",endColorstr="#ebebeb",GradientType=1);
}

#preferences-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1000px;
  margin-top: 82px;
}

#preferences-list {
  list-style: none;
}

#preferences-list li {
  margin: 32px 52px;
}
</style>
