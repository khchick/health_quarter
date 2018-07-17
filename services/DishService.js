class DishService {

    constructor(knex) {
        this.knex = knex;
    }

    listDish(restID) {
        // Get Dish.img from DB for matching restID
        // Get Dish.name for matching restID
        let query = this.knex
        .select('dish.id','dish.name','dish.img')
        .from('dish')
        .innerJoin('restaurant', 'dish.rest_id', 'restaurant.id')
        .where('restaurant.id', restID)
        .orderBy('dish.name');

        return query.then((rows) => {
            console.log(rows);
            return rows.map(row => ({
                id: row.id,
                name: row.name,
                img: row.img,
            }))
        })
    }

    getDishDetail(dishID) {
        // Get Dish.img from DB for matching restID
        // Get Dish.name for matching restID
        // Get Dish.rest_id to link back to restaurant page
        let query = this.knex
        .select(
            'dish.id',
            'dish.name',
            'dish.img',
            'rest_id'
        )
        .from('dish')
        .where('dish.id', dishID)

        return query.then(rows => {
            return rows.map(row => ({
                id: row.id,
                name: row.name,
                img: row.img,
                rest: row.rest_id
            }));
        });
    }

}

module.exports = DishService;