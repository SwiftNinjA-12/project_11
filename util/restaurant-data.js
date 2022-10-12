const fs = require("fs"); //file system in express
const path = require("path")

const filePath = path.join(__dirname, '..', "data", "restaurants.json"); //gets the path for the json file, ['..'] shows that the path goes up 1 level to the parent.
//move filePath out of function so that it can be used in multiple functions
function getStoredRestaurants() {
    
    const fileData = fs.readFileSync(filePath); //reads the file
    const storedRestaurants = JSON.parse(fileData); //converts file to JS array

  return storedRestaurants;
}

function storeRestaurants(storableRestaurants) {
    fs.writeFileSync(filePath, JSON.stringify(storableRestaurants)); //stringyfy= converts back to json file then writes to file

}

module.exports = {
    getStoredRestaurants: getStoredRestaurants,// L the name you want to give it | R=the nam eof the function in this file. no ()
    storeRestaurants: storeRestaurants
}// this is the object that we are exporting/importing into app.js with [const resData = require('./util/restaurant-data')]

