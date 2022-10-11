const fs = require("fs");   //file system in express
const path = require("path");   //to be able to make paths in express

const express = require("express");

const app = express();

app.use(express.static('public'));//to be able to use static sites ie css + JS files
app.use(express.urlencoded({ extended: false }));// to parse incoming data

app.get("/", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "index.html");
  res.sendFile(htmlFilePath);
});

app.get("/about", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "about.html");
  res.sendFile(htmlFilePath);
});

app.get("/confirm", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "confirm.html");
  res.sendFile(htmlFilePath);
});

app.get("/index", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "index.html");
  res.sendFile(htmlFilePath);
});

app.get("/recommend", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "recommend.html");
  res.sendFile(htmlFilePath);
});



app.post("/recommend", function (req, res) {                            //.post is for form submission
    const restaurant = req.body                                         //stores the body of the form overall. instead of req.body.name or req.body.website or other inputs. creates an object 
    const filePath = path.join(__dirname, "data", "restaurants.json");  //gets the path for the json file
    const fileData = fs.readFileSync(filePath);                         //reads the file
    const storedRestaurants = JSON.parse(fileData);                     //converts file to JS array
    storedRestaurants.push(restaurant)                                  //pushes new input object into array
    fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));      //stringyfy= converts back to json file then writes to file
    res.redirect('/confirm')                                            //once data is submitted go to confirm page
});




app.get("/restaurants", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "restaurants.html");
  res.sendFile(htmlFilePath);
});

app.listen(3000);
