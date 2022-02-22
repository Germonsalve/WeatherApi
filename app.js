const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){

  const query = req.body.cityName;
  const apikey = "9b467ea65b63357f1668d7788ee8d411";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units="+ unit +"&appid=" + apikey;
  https.get(url, function(response) {
    console.log(response);

   response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const icon = weatherData.weather[0].icon;
      const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

      const wDescription = weatherData.weather[0].description;
      res.write("<p>The weather is currently " + wDescription + "</p>");
      res.write("<h1>The Temperature in " + query +  " is " + temp + "</h1>");
      res.write("<img src=" + imageURL + ">");
      res.send();

    });
  });


})






app.listen(3000, function() {
  console.log("Server is running on port 3000");
})
