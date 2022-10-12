const fs = require("fs"); //file system in express
const path = require("path"); //to be able to make paths in express

const express = require("express");
const uuid = require("uuid");
//adding your own js files - use path 
const resData = require('./util/restaurant-data') //use ./ to show that it is in a sub folder

const app = express();

app.set("views", path.join(__dirname, "views")); // where it will find the template files
app.set("view engine", "ejs"); //method to set certain options. 'view engine' is to tell it to look at the template. ejs is the template type

app.use(express.static("public")); //to be able to use static sites ie css + JS files
app.use(express.urlencoded({ extended: false })); // to parse incoming data

app.get("/", function (req, res) {
  //   const htmlFilePath = path.join(__dirname, "views", "index.html");
  //   res.sendFile(htmlFilePath); this gets replaced with res.render('index') as it is now going to render the template file, and it already knows where the template files are.
  res.render("index");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.get("/confirm", function (req, res) {
  res.render("confirm");
});

app.get("/index", function (req, res) {
  res.render("index");
});

app.get("/recommend", function (req, res) {
  res.render("recommend");
});

app.post("/recommend", function (req, res) {
  //.post is for form submission
  const restaurant = req.body; //stores the body of the form overall. instead of req.body.name or req.body.website or other inputs. creates an object
  restaurant.id = uuid.v4(); //check uuid documentatiuon to see the different methods. this step gives each entry a unique ID
  const storedRestaurants = resData.getStoredRestaurants();//see restaurant-data.js for explaination
  storedRestaurants.push(restaurant); //pushes new input object into arra
  resData.storeRestaurants(storedRestaurants);//see restaurant-data.js for explaination
  res.redirect("/confirm"); //once data is submitted go to confirm page
});

app.get("/restaurants", function (req, res) {
  const storedRestaurants = resData.getStoredRestaurants()

  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
  });
});

app.get("/restaurants/:id", function (req, res) {
  //dynamic placeholder for dynamic URLs
  const restaurantId = req.params.id; // the ID here in the params object of the request has the property ot the ID that we put in '/restaurants/:id'
  const storedRestaurants = resData.getStoredRestaurants()  

  for (const arrayIndex of storedRestaurants) { //runs through each part of the array
    if (arrayIndex.id === restaurantId) {   //checks if the id of the clicked link === the id in the array => to get the other details
      return res.render("restaurant-details", { restaurant: arrayIndex });// returns and runs the dynamic website "restaurant-details". 
      // { restaurant: restaurant }) => the restaurant is the link to <%= restaurant.xyz %>
      //arrayIndex in [for(const arrayIndex of storedRestaurants)]
    }// dont use else for error messages 404 as there are plenty more (arrayIndex.id !=== restaurantId) so it might give back a error too soon.
  }
  res.status(404).render('404');// this way this will run only after the for loop. easy simple page to show something went wrong
});


//make your own middelware - do this at the end so that it only reads after all the other requests. makes it faster to load etc.
app.use(function(req, res){// create a function that is to be used all other requests that have not been handld (ie a typo in URL)
  res.status(404).render('404');// if nothing has been rendered yet then render 404
});//chaining, calling a method after calling a method.
//we are trying to tell the browser that there was a fault even tho there technically wasnt 1.

//if an error happens on your server - must always be the 4 parameters(error, req, res, next)
//next allows you to have multiple middlewares that you can use together. 
//and when you cal next inside a middleware it allows ther req to move onto the next middleware or route handler inline.
app.use(function(error, req, res, next){
  res.status(500).render('500')
});


app.listen(3000);
