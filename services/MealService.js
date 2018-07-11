class MealService {

    constructor(knex) {
        this.knex = knex;
    }

    listMeal(restID) {
        // If restID === null, list all records from Meal_Plan table
        // Get Meal_Plan.id for listing
        // Get created_at for sorting
        // Get Meal_Plan.img for matching id
        // Get Meal_Plan.name for matching id
        // Get Meal_Plan.about for matching id
    }

}

module.exports = MealService;