import axios from 'axios'
const { Service } = require("feathers-mongodb")


exports.Recommendation = class recommendationService extends Service{
  constructor(options){
    super(options)
  }
  async get(token){
    const url = 'https://api.spotify.com/v1/recommendations';
    let artistStringRecommendation;
    if(artistString.length < 0){
      return;
    }else{
      artistStringRecommendation = `seed_artists=${artistString.join(',')}`;
    }
    let minValues = [];
    let maxValues = [];
    const minString = minValues.join('&');
    const maxString = maxValues.join('&');
    const {data} = await axios.get(`${url}?${artistStringRecommendation}&${minString}&${maxString}`,{
      headers:{
        "Authorization" : `Bearer ${token}`
      }
    });
    let songArray = [];
    //3 is the track
    //4 is id, name
    for(x=0; x < data.tracks.length;x++){
      const trackURL = data.tracks[x].external_urls.spotify;
      const songName = data.tracks[x].name;
      const id = data.tracks[x].id;
      const albumCover = data.tracks[x].album.images[0].url;
      const artistName = data.tracks[x].album.artists[0].name;
      const trackCover = axios.get(`https://api.spotify.com/v1/tracks/${id}`,{
        headers:{
          "Authorization": `Bearer ${token}`
        }
      }).album.images[0].url;
      if(trackCover == albumCover){
        songArray.push({"id": id,
                      "name" : songName,
                    "artist": artistName,
                    "image" : albumCover});
      }else{
        songArray.push({"id": id,
                      "name" : songName,
                    "artist": artistName,
                    "image" : trackCover});
      }
    }
    return songArray;
  }
}
/*song = {
  id: someID
  name: song name
  artist: artist name 
  image: song cover image
  album: name of album its from
  genres: probably gonna be an array of genre names
} (edited) */
