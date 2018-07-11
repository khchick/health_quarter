class DishService {

    constructor(knex) {
        this.knex = knex;
    }

    listDish(restID) {
        // Get Dish.img from DB for matching restID
        // Get Dish.name for matching restID
    }

    getDishDetail(dishID) {
        // Get Dish.img from DB for matching restID
        // Get Dish.name for matching restID
        // Get Dish.rest_id to link back to restaurant page
    }

}

module.exports = DishService;