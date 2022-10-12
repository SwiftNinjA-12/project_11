const express = require("express");

const resData = require("../util/restaurant-data"); //use ../ to show that it is in a sub folder

const router = express.Router();
const uuid = require("uuid");

router.get("/confirm", function (req, res) {
  res.render("confirm");
});

router.get("/recommend", function (req, res) {
  res.render("recommend");
});

router.post("/recommend", function (req, res) {
  //.post is for form submission
  const restaurant = req.body; //stores the body of the form overall. instead of req.body.name or req.body.website or other inputs. creates an object
  restaurant.id = uuid.v4(); //check uuid documentatiuon to see the different methods. this step gives each entry a unique ID
  const storedRestaurants = resData.getStoredRestaurants(); //see restaurant-data.js for explaination
  storedRestaurants.push(restaurant); //pushes new input object into arra
  resData.storeRestaurants(storedRestaurants); //see restaurant-data.js for explaination
  res.redirect("/confirm"); //once data is submitted go to confirm page
});

router.get("/restaurants", function (req, res) {
  let order = req.query.order;
  let nextOrder = 'desc';
// this if gives order a value of asc
  if (order !== "asc" && order !== "desc") {
    order = "asc";
  }
  // this swaps the value of order and nextOrder, but how
  if (order === 'desc') {
    nextOrder = 'asc';
  }

  const storedRestaurants = resData.getStoredRestaurants();
    
  storedRestaurants.sort(function (resA, resB) {
    // this function sorts the restaurants alphabetically automatically
    if (
      (order === "asc" && resA.name > resB.name) ||
      (order === "desc" && resB.name > resA.name)
    ) {
      return 1;
    }
    return -1;
  });

  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
    nextOrder: nextOrder,
    order: order
  });
});

router.get("/restaurants/:id", function (req, res) {
  //dynamic placeholder for dynamic URLs
  const restaurantId = req.params.id; // the ID here in the params object of the request has the property ot the ID that we put in '/restaurants/:id'
  const storedRestaurants = resData.getStoredRestaurants();

  for (const arrayIndex of storedRestaurants) {
    //runs through each part of the array
    if (arrayIndex.id === restaurantId) {
      //checks if the id of the clicked link === the id in the array => to get the other details
      return res.render("restaurant-details", { restaurant: arrayIndex }); // returns and runs the dynamic website "restaurant-details".
      // { restaurant: restaurant }) => the restaurant is the link to <%= restaurant.xyz %>
      //arrayIndex in [for(const arrayIndex of storedRestaurants)]
    } // dont use else for error messages 404 as there are plenty more (arrayIndex.id !=== restaurantId) so it might give back a error too soon.
  }
  res.status(404).render("404"); // this way this will run only after the for loop. easy simple page to show something went wrong
});

module.exports = router;
