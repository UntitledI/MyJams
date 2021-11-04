<template>
  <div id="playlist-modal">
    <header id="playlist-modal-header">
      <div id="playlist-modal-image-container">
        Sample IMG
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
            <th>#</th>
            <th>Title</th>
            <th>Album</th>
            <th>Date Added</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>My favorite song 1</td>
            <td>My favorite Album</td>
            <td>11/3/2021</td>
            <td>3:09</td>
          </tr>
          <tr>
            <td>2</td>
            <td>My favorite song 2</td>
            <td>My favorite Album</td>
            <td>11/3/2021</td>
            <td>2:09</td>
          </tr>
          <tr>
            <td>2</td>
            <td>My favorite song 2</td>
            <td>My favorite Album</td>
            <td>11/3/2021</td>
            <td>2:09</td>
          </tr>
          <tr>
            <td>2</td>
            <td>My favorite song 2</td>
            <td>My favorite Album</td>
            <td>11/3/2021</td>
            <td>2:09</td>
          </tr>
          <tr>
            <td>2</td>
            <td>My favorite song 2</td>
            <td>My favorite Album</td>
            <td>11/3/2021</td>
            <td>2:09</td>
          </tr>
          <tr>
            <td>2</td>
            <td>My favorite song 2</td>
            <td>My favorite Album</td>
            <td>11/3/2021</td>
            <td>2:09</td>
          </tr>
          <tr>
            <td>2</td>
            <td>My favorite song 2</td>
            <td>My favorite Album</td>
            <td>11/3/2021</td>
            <td>2:09</td>
          </tr>
          <tr>
            <td>2</td>
            <td>My favorite song 2</td>
            <td>My favorite Album</td>
            <td>11/3/2021</td>
            <td>2:09</td>
          </tr>
          <tr>
            <td>2</td>
            <td>My favorite song 2</td>
            <td>My favorite Album</td>
            <td>11/3/2021</td>
            <td>2:09</td>
          </tr>
          <tr>
            <td>2</td>
            <td>My favorite song 2</td>
            <td>My favorite Album</td>
            <td>11/3/2021</td>
            <td>2:09</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'desc']
}
</script>

<style>
#playlist-modal{
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  font-family: "Montserrat", sans-serif;
  overflow-y: auto;
}

#playlist-modal-header{
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

#playlist-modal-image-container{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px;
  width: 250px;
  border: 1px solid;
  background-color: white;
}

#playlist-modal-info{
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

#playlist-modal-title{
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

#playlist-modal-content{
  width: 100%;
}

#playlist-modal-table{
  min-height: 20%;
  max-height: 60%;
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box; /* Opera/IE 8+ */
}

#playlist-modal-table thead tr{
  text-align: left;
  font-weight: bold;
  border-bottom: 1px solid black;
}

#playlist-modal-table th,
#playlist-modal-table td {
  padding: 16px 32px;
}
</style>
