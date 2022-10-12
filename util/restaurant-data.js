const filePath = path.join(__dirname, "data", "restaurants.json"); //gets the path for the json file
//move filePath out of function so that it can be used in multiple functions
function getStoredRestaurants() {
    
    const fileData = fs.readFileSync(filePath); //reads the file
    const storedRestaurants = JSON.parse(fileData); //converts file to JS array

  return storedRestaurants;
}

function storeRestaurants(storableRestaurants) {
    fs.writeFileSync(filePath, JSON.stringify(storableRestaurants)); //stringyfy= converts back to json file then writes to file

}