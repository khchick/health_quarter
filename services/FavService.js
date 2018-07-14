class FavService {

    constructor(knex) {
        this.knex = knex;
    }

    // @ Add to favourite button

        // For status display

        isFavRest(restID, userID) {
            // If restID found in User_Fav_Restaurant table for matching user_id, return true
        }

        isFavDish(dishID, userID) {
            // If dishID found in User_Fav_Dish table for matching user_id, return true
        }

        isFavRec(recURL, userID) {
            // If recURL match with api_url in User_Fav_Recipe table for matching user_id, return true
        }

        // For status update

        toggleFavRest(restID, userID) {
            // if isFavRest(restID, userID) === false, create record in User_Fav_Restaurant with rest_id and user_id pair
            // if isFavRest(restID, userID) === true, delete record
            
        }

        toggleFavDish(dishID, userID) {
            // if isFavDish(dishID, userID) === false, create record in User_Fav_Dish with dish_id and user_id pair
            // if isFavDish(dishID, userID) === true, delete record
        }

        toggleFavRec(recURL, userID) {
            // if isFavRest(recURL, userID) === false, create record in User_Fav_Recipe with recURL and user_id pair
            // if isFavRest(recURL, userID) === true, delete record
        }

    // @ Favourite page

        // For listing

        listFavRest(userID) {
            // For each matching rest_id in User_Fav_Restaurant table
            // Get created_at for sorting
            // Join Restaurant table to get Restaurant.img and Restaurant.name
            // Restaurant.id for getting the link back to the restaurant
        }

        listFavDish(userID) {
            // For each matching dish_id in User_Fav_Dish table
            // Get created_at for sorting
            // Join Dish table to retrieve Dish.img and Dish.name for display
            // Dish.id for getting dish details
            // Restaurant.id for getting the link back to the restaurant
        }

        listFavMeal(userID) {
            // For each matching meal_plan_id in User_Fav_Meal_Plan
            // Get created_at for sorting
            // Join Meal_Plan table to return Meal_Plan.img and Meal_Plan.name for display
            // Meal_Plan.id for getting meal plan details
            // Restaurant.id for getting the link back to the restaurant
        }

        listFavRec(userID) {
            // For each matching record in User_Fav_Recipe table
            // Get created_at for sorting
            // For info display, get User_Fav_Recipe.api_url to download from external data source
        }

    // For preference setting @ sign up / user profile

        listFavTag(userID) {
            // Get all records from Tag table from DB
            // Get Tag.name for display and sorting by alphabetical order
            // Retrieve tag_id from User_Fav_Tag table for matching userID
            // If tag_id === listed Tag.id, return true
        }



}

module.exports = FavService;