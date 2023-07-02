require('dotenv').config()

const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
const encrypt = require('mongoose-encryption')


app.use(bodyParser.urlencoded({extended:true}));
app.get("/", function(req, res){
  res.sendFile(__dirname+"/index.html");
    })
app.post("/", function(req, res){
  const query = req.body.cityName;
  const unit = "metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+ process.env.APIKEY +"&units="+unit;
  https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
      const weatherData = JSON.parse(data)
      console.log(weatherData);
      const desc = weatherData.weather[0].description
      const temp= weatherData.main.temp
      const icon = weatherData.weather[0].icon
      const iconPath = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
      //const place = weatherData.name;
      res.write("<h1>The tempertaure in "+ query +" is:"+ temp +" Degree Celcius</h1>");
      res.write("<h3>Weather is currently "+ desc +".</h3>");
      res.write("<img src ="+ iconPath +">");
      res.send();
});
  })
})



app.listen(3000, function(){
  console.log("Server is up and running on port 3000");
})
