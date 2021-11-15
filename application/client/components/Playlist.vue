<template>
  <div id="playlist-modal">
    <header id="playlist-modal-header">
      <div id="playlist-modal-image-container">
        <img :src="image">
      </div>
      <div id="playlist-modal-info">
        <section />
        <section id="playlist-modal-title">
          <h1>{{ title }}</h1>
        </section>
        <section id="playlist-modal-description">
          <p>{{ desc }}</p>
        </section>
      </div>
    </header>
    <div id="playlist-modal-content">
      <table id="playlist-modal-table">
        <thead>
          <tr>
            <th id="track-number">
              #
            </th>
            <th id="title">
              Title
            </th>
            <th id="album">
              Album
            </th>
            <th id="date-added">
              Date Added
            </th>
            <th id="duration">
              Duration
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(track, index) in local_tracks" :key="index">
            <td class="track-number">
              {{ index + 1 }}
            </td>
            <td class="title-container">
              <div class="track-image-container">
                <img :src="track.image">
              </div>
              <div class="track-info">
                <span class="title">{{ track.name }}</span>
                <div class="artist-names">
                  <span v-for="(artist, _index) in track.artists" :key="_index" class="artist">
                    {{ artist }}<span v-if="_index != track.artists.length - 1">, </span>
                  </span>
                </div>
              </div>
            </td>
            <td class="album">
              {{ track.album }}
            </td>
            <td class="date-added">
              {{ track.date }}
            </td>
            <td class="duration">
              {{ track.duration }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    desc: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    playlistId: {
      type: String,
      default: ''
    },
    tracks: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      local_tracks: this.tracks
    }
  },
  created () {
    // Make a call to backend api to get actual songs from the playlist
    this.local_tracks = [
      {
        name: 'My favorite song 1',
        artists: [
          'artist 1',
          'artist 2'
        ],
        image: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
        album: 'My favorite album',
        date: '11/3/2021',
        duration: '3:09',
        id: '1'
      },
      {
        name: 'My favorite song 2',
        artists: [
          'artist 1'
        ],
        image: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
        album: 'My favorite album',
        date: '11/3/2021',
        duration: '6:09',
        id: '2'
      },
      {
        name: 'My favorite song 3',
        artists: [
          'artist 1',
          'artist 2',
          'artist 3'
        ],
        image: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
        album: 'My favorite album',
        date: '11/3/2021',
        duration: '5:09',
        id: '3'
      },
      {
        name: 'My favorite song 4',
        artists: [
          'artist 1',
          'artist 2'
        ],
        image: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
        album: 'My favorite album',
        date: '11/3/2021',
        duration: '4:09',
        id: '4'
      },
      {
        name: 'My favorite song 5',
        artists: [
          'artist 1'
        ],
        image: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
        album: 'My favorite album',
        date: '11/3/2021',
        duration: '2:09',
        id: '5'
      },
      {
        name: 'My favorite song 6',
        artists: [
          'artist 1'
        ],
        image: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
        album: 'My favorite album',
        date: '11/3/2021',
        duration: '1:09',
        id: '6'
      }
    ]
  }
}
</script>

<style>
#playlist-modal {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  font-family: "Montserrat", sans-serif;
  overflow-y: auto;
}

#playlist-modal-header {
  display: flex;
  height: 40%;
  width: 100%;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box; /* Opera/IE 8+ */
  justify-content: flex-start;
  align-items: center;
  padding: 16px 32px;
}

#playlist-modal-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px;
  width: 250px;
}

#playlist-modal-image-container img {
  width: 100%;
  height: auto;
}

#playlist-modal-info {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: flex-end;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box; /* Opera/IE 8+ */
}

#playlist-modal-info section {
  height: 33.33%;
  padding: 16px 32px;
}

#playlist-modal-title {
  display: flex;
  align-items: center;
}

#playlist-modal-title h1 {
  font-size: 48px;
}

#playlist-modal-description {
  display: flex;
  align-items: flex-end;
}

#playlist-modal-content {
  width: 100%;
}

#playlist-modal-table {
  min-height: 20%;
  max-height: 60%;
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box; /* Opera/IE 8+ */
}

#playlist-modal-table thead tr {
  text-align: left;
  font-weight: bold;
  border-bottom: 1px solid black;
}

#playlist-modal-table thead th {
  font-size: 1.1em;
}

#playlist-modal-table tbody td {
  height: 5em;
}

#playlist-modal-table th,
#playlist-modal-table td {
  max-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

#track-number {
  width: 5%;
  padding-bottom: 16px;
  padding-left: 32px;
}

#title {
  width: 38%;
  padding-right: 40px;
  padding-bottom: 16px;
}

#album {
  width: 30%;
  padding-left: 32px;
  padding-right: 40px;
  padding-bottom: 16px;
}

#date-added {
  width: 16%;
  padding-right: 40px;
  padding-bottom: 16px;
}

#duration {
  width: 13%;
  padding-right: 32px;
  padding-bottom: 16px;
}

.track-number {
  width: 5%;
  padding-left: 32px;
  padding-right: 16px;
  padding-top: 16px;
}

.title-container {
  display: flex;
  align-items: center;
  width: 38%;
  padding-right: 100%;
  padding-top: 16px;
}

.track-image-container {
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
  margin-right: 16px;
}

.track-image-container img {
  width: 100%;
  height: auto;
}

.track-info {
  display: flex;
  flex-direction: column;
}

.album {
  width: 30%;
  padding-left: 32px;
  padding-right: 40px;
  padding-top: 16px;
}

.date-added {
  width: 16%;
  padding-right: 40px;
  padding-top: 16px;
}

.duration {
  width: 13%;
  padding-right: 32px;
  padding-top: 16px;
}

.artist-names {
  white-space: nowrap;
}
</style>
