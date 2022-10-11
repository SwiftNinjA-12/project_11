const fs = require("fs");   //file system in express
const path = require("path");   //to be able to make paths in express

const express = require("express");

const app = express();

app.set('views', path.join(__dirname, 'views'))// where it will find the template files
app.set('view engine', 'ejs')//method to set certain options. 'view engine' is to tell it to look at the template. ejs is the template type

app.use(express.static('public'));//to be able to use static sites ie css + JS files
app.use(express.urlencoded({ extended: false }));// to parse incoming data

app.get("/", function (req, res) {
//   const htmlFilePath = path.join(__dirname, "views", "index.html");
//   res.sendFile(htmlFilePath); this gets replaced with res.render('index') as it is now going to render the template file, and it already knows where the template files are.
res.render('index');
});

app.get("/about", function (req, res) {
    res.render('about');
});

app.get("/confirm", function (req, res) {
    res.render('confirm');
});

app.get("/index", function (req, res) {
    res.render('index');
});

app.get("/recommend", function (req, res) {
    res.render('recommend');
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
    res.render('restaurants');
});

app.listen(3000);
