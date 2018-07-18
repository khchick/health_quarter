class MealService {

    constructor(knex) {
        this.knex = knex;
    }

    listMeal(restID) {
        let query = this.knex
            .select('meal_plan.id', 'meal_plan.name', 'meal_plan.img', 'meal_plan.about','meal_plan.created_at')
            .from('meal_plan')
            .innerJoin('restaurant', 'meal_plan.rest_id', 'restaurant.id')
            .where('restaurant.id', restID)
            .orderBy('meal_plan.name');

        return query.then(rows => {
            console.log(rows);
                return rows.map(row => ({
                    id: row.id,
                    name: row.name,
                    img: row.img,
                    about: row.about,
                    date: row.created_at
                })
                )
            }
        )
    }

    // If restID === null, list all records from Meal_Plan table
listAllMeal() {
    console.log("me")
    let query = this.knex
<<<<<<< HEAD
    .select('meal_plan.id as meal_id', 'meal_plan.name', 'meal_plan.img', 'meal_plan.about', 'restaurant.id')
    .from('meal_plan','restaurant')
=======
    .select('meal_plan.id', 'meal_plan.name', 'meal_plan.img', 'meal_plan.about', 'restaurant.id as rest_id')
    .from('meal_plan')
>>>>>>> 4c8c852ca8c80f45c8513d540a547d7b99b64d00
    .innerJoin('restaurant', 'meal_plan.rest_id', 'restaurant.id')
    .orderBy('meal_plan.name');

    return query.then(rows => {
        console.log(rows);
            return rows.map(row => ({
                id: row.meal_id,
                name: row.name,
                img: row.img,
                about: row.about,
<<<<<<< HEAD
                rest_id: row.id
=======
                rest_id: row.rest_id
                // date: row.created_at
>>>>>>> 4c8c852ca8c80f45c8513d540a547d7b99b64d00
            })
            )
        }
    )}
}
module.exports = MealService;

    // Get Meal_Plan.id for listing
    // Get created_at for sorting
    // Get Meal_Plan.img for matching id
    // Get Meal_Plan.name for matching id
    // Get Meal_Plan.about for matching id