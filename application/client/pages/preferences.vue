<template>
  <div v-if="$auth.loggedIn">
    <Navbar />
    <div id="preferences-page-container">
      <div id="preferences-container">
        <ul v-if="local_preferences" id="preferences-list">
          <li v-for="preference in local_preferences" :key="preference.id">
            <div v-if="preference.id !== local_current_preference" class="preference" @click="deletePreference ? handleDelete(preference.id) : setPreference(preference.id)">
              <h2>{{ preference.name }}</h2>
              <img v-if="deletePreference" src="../static/xbutton.png">
            </div>
            <div v-if="preference.id === local_current_preference" id="preference-current" class="preference" @click="deletePreference ? handleDelete(preference.id) : setPreference(preference.id)">
              <h2>{{ preference.name }}</h2>
              <img v-if="deletePreference" src="../static/xbutton.png">
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
import url from 'url'
import axios from 'axios'
import Navbar from '../components/Navbar'

export default {
  Navbar,
  middleware: ['auth-user'],
  props: {
    preferences: {
      type: Array,
      default () {
        return []
      }
    },
    currentPreference: {
      type: Number,
      default () {
        return 0
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
        return res.data
      }).catch((err) => {
        if (err.status === 401) {
          redirect('/')
        }
      })

      return { local_preferences: data.preferences, local_current_preference: data.currentPreference }
    }
  },
  data () {
    return {
      deletePreference: false,
      local_preferences: this.preferences,
      local_current_preference: this.currentPreference
    }
  },
  mounted () {
    const urlString = window.location.href
    const urlObj = new URL(urlString)
    if (urlObj.search) {
      urlObj.search = ''
      window.history.pushState({}, document.title, url.format(urlObj))
    }
  },
  methods: {
    async handleDelete (preferenceId) {
      const token = this.$auth.getToken('local')
      const index = this.local_preferences.findIndex(pref => pref.id === preferenceId)
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
        console.error(err.response.status)
      })
    },
    async setPreference (preferenceId) {
      const token = this.$auth.getToken('local')
      this.local_current_preference = preferenceId
      await axios.post(this.$config.apiURL + '/preference/set', {
        preferenceId
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
  height: 50%;
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
  height: 100vh;
  width: 1000px;
  margin-top: 82px;
}

#preferences-list {
  list-style: none;
}

#preferences-list li {
  margin: 32px 52px;
}

#preference-current {
  border: solid 5px;
  border-color: rgb(44,177,164);
}
</style>
