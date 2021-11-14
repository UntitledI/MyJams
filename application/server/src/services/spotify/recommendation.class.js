const { Service } = require("feathers-mongodb")


exports.Recommendation = class recommendationService extends Service{
  constructor(options){
    super(options)
  }
  async find(){
    return ("hi");
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
