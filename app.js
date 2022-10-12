const path = require("path"); //to be able to make paths in express

const express = require("express");

//adding your own js files - use path 
const defaultRoutes = require('./routes/default') 
const restaurantRoutes = require('./routes/restaurants')

const app = express();

app.set("views", path.join(__dirname, "views")); // where it will find the template files
app.set("view engine", "ejs"); //method to set certain options. 'view engine' is to tell it to look at the template. ejs is the template type

app.use(express.static("public")); //to be able to use static sites ie css + JS files
app.use(express.urlencoded({ extended: false })); // to parse incoming data

app.use('/', defaultRoutes); //this checks all requests that have a '/' [domain.com/] and checks them against [defaultRoutes]
app.use('/', restaurantRoutes)


//make your own middelware - do this at the end so that it only reads after all the other requests. makes it faster to load etc.

app.use(function(req, res){// create a function that is to be used all other requests that have not been handld (ie a typo in URL)
  res.status(404).render('404');// if nothing has been rendered yet then render 404
});

//chaining, calling a method after calling a method.
//we are trying to tell the browser that there was a fault even tho there technically wasnt 1.

//if an error happens on your server - must always be the 4 parameters(error, req, res, next)
//next allows you to have multiple middlewares that you can use together. 
//and when you cal next inside a middleware it allows ther req to move onto the next middleware or route handler inline.

app.use(function(error, req, res, next){
  res.status(500).render('500')
});


app.listen(3000);
