class FavService {

    constructor(knex) {
        this.knex = knex;
    }

    // @ Add to favourite button

        // For status display

        isFavRest(restID, userID) {
            // If restID found in User_Fav_Restaurant table for matching user_id, return true
            let query = this.knex
            .select()
            .from('users_fav_restaurant')
            .where('users_id',userID)
            .andWhere('rest_id',restID)

            return query.then((rows) => {
                console.log(rows);
                if (rows.length === 1) {
                    return true;
                } else {
                    return false;
                }
            })
        }

        isFavDish(dishID, userID) {
            // If dishID found in User_Fav_Dish table for matching user_id, return true
        }

        isFavRec(recURL, userID) {
            // If recURL match with api_url in User_Fav_Recipe table for matching user_id, return true
        }

        // For status update

        addFavRest(restID, userID) {

            // if isFavRest(restID, userID) === false, create record in User_Fav_Restaurant with rest_id and user_id pair
            // if isFavRest(restID, userID) === true, delete record
            return this.knex("users_fav_restaurant").insert({"users_id":userID,"rest_id":restID})
        }

        addFavDish(dishID, userID) {
            // if isFavDish(dishID, userID) === false, create record in User_Fav_Dish with dish_id and user_id pair
            // if isFavDish(dishID, userID) === true, delete record
        }

        addFavMeal(recURL, userID) {
            // if isFavMeal(mealID, userID) === false, create record in User_Fav_Meal with recURL and user_id pair
            // if isFavMeal(mealID, userID) === true, delete record
        }

        addFavRec(recURL, userID) {
            // if isFavRec(recURL, userID) === false, create record in User_Fav_Recipe with recURL and user_id pair
            // if isFavRec(recURL, userID) === true, delete record
        }

        delFavRest(restID, userID) {

            // if isFavRest(restID, userID) === false, create record in User_Fav_Restaurant with rest_id and user_id pair
            // if isFavRest(restID, userID) === true, delete record
            return this.knex("users_fav_restaurant")
            .where("users_id",userID)
            .andWhere("rest_id",restID)
            .delete()
        }

        delFavDish(dishID, userID) {
            // if isFavDish(dishID, userID) === false, create record in User_Fav_Dish with dish_id and user_id pair
            // if isFavDish(dishID, userID) === true, delete record
        }

        delFavMeal(dishID, userID) {
            // if isFavMeal(mealID, userID) === false, create record in User_Fav_Meal with dish_id and user_id pair
            // if isFavMeal(mealID, userID) === true, delete record
        }

        delFavRec(recURL, userID) {
            // if isFavRec(recURL, userID) === false, create record in User_Fav_Recipe with recURL and user_id pair
            // if isFavRec(recURL, userID) === true, delete record
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

    // For personalised home page & preference setting @ sign up / user profile 

        listFavTag(userID) {
            // Get all records from Tag table from DB
            // Get Tag.name for display and sorting by alphabetical order
            // Retrieve tag_id from User_Fav_Tag table for matching userID
            // If tag_id === listed Tag.id, return true
            let query = this.knex
            .select('tag.id', 'tag.name')
            .from('users_fav_tag')
            .where('users_id',userID)
            .innerJoin('tag', 'tag_id', 'tag.id')
            .orderBy('tag.name');

            return query.then(rows => {
                console.log(rows);
                return rows.map(row => ({
                    id: row.id,
                    name: row.name
                }))
            })
        }



}

module.exports = FavService;