const { Service } = require("feathers-mongodb")
//const {spotifyRecommendation} = require("../../recommendation");
const axios = require('axios');
const spotifyRecommendation = require("../../recommendation");
const app = require('../../app');

exports.Recommendation = class Recommendation extends Service{
  constructor(options,app){
    super(options)
  }
  //post request
  async update(id,data){
    //id should be name, data is array of user answers, params is just vibing
    var answers = {
      userPrefernece:{
      }
    };
    for(x = 0; x < data.length; x++){
      var preferenceQuestion = data[x].question;
      answers.userPrefernece[preferenceQuestion]=data[x].response;
    }
    app.get('mongoClient').then(db=>{
      db.spotify.update(
        {id: id},
        {$addToSet: {answers}}
      );
    });
    console.log("bye");
  }
  async find(){
    return "hi"
  }
}
function update(id,data){
  //id should be name, data is array of user answers, params is ``just vibing
  var answers = {
    userPrefernece:{
    }
  };
  for(x = 0; x < data.length; x++){
    var preferenceQuestion = data[x].question;
    answers.userPrefernece[preferenceQuestion]=data[x].response;
  }
  console.log(answers);
  app.get('mongoClient').then(db=>{
    this.Model.db.spotify.update(
      {id: id},
      {$addToSet: {answers}}
    );
  });
  console.log("bye");
}
const preferenceAnswers = [
  {question:"target_dance",response: 5},
  {question: "genres", response : "dance,classical"}
]
update("simon",preferenceAnswers);
/*song = {
  id: someID
  name: song name
  artist: artist name 
  image: song cover image
  album: name of album its from
  genres: probably gonna be an array of genre names
} (edited) */
