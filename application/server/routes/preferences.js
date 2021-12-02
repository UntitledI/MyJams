const axios = require('axios');
var express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const setPreferences = require('../utils/setPreferences');

router.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin","*")
  res.setHeader('Access-Control-Allow-Methods','POST,OPTIONS,GET');
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept,Content-Length");
  next();
});
//app.post()
//make make this a separate file for setting preferences.
router.get('/',function(req,res){
  res.send("Preferences home page");
})
router.get('/get',function(req,res){
  res.send("hi");
});
router.use('/set',bodyParser.json());

router.post('/set',function(req,res,next){
  res.send("Got post request. You sent "+ req);
  //console.log(req.body);
  setPreferences('acedbm',req.body).then((res)=>{
    console.log("yay " + res);
  }).catch((error)=>{
    console.log("fuck "+ error);
  })
  //const Arr = parse(req.query);
  /*setPreferences(req.query.id,req.query.recommendations).then((preferences)=>{
    console.log("set pref method" + preferences);
  }).catch((e)=>{
    console.log(e);
  });*/
  //req.parmas.answer???
  //console.log(res);
  //res.redirect("/");
  //push req.body to db if that's where the array is.

});
module.exports = router;
