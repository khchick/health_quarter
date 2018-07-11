exports.up = function (knex) {
    return Promise.all([
        knex.schema.createTable('restaurant-tag', (table) => {
            table.increments('id').primary();

            //FK: rest.id 
            table.integer('rest_id').unsigned();
            table.foreign('rest_id').references('restaurant.id');

            //FK: tag.id 
            table.integer('tag_id').unsigned();
            table.foreign('tag_id').references('tag.id');
        }),

        knex.schema.createTable('users-fav-restaurant', function (table) {
            table.increments('id').primary();

            //FK: rest.id
            table.integer('rest_id').unsigned();
            table.foreign('rest_id').references('restaurant.id');

            //FK: userss.id 
            table.integer('users_id').unsigned();
            table.foreign('users_id').references('users.id');
        }),

        knex.schema.createTable('users-fav-meal-plan', function (table) {
            table.increments('id').primary();

            //FK: users.id 
            table.integer('users_id').unsigned();
            table.foreign('users_id').references('users.id');

            //FK: meal-plan.id
            table.integer('meal-plan-id').unsigned();
            table.foreign('meal-plan-id').references('meal-plan.id');
        }),

        knex.schema.createTable('users-fav-recipe', function (table) {
            table.increments('id').primary();
            table.string('api_url');

            //FK: users.id
            table.integer('users_id').unsigned();
            table.foreign('users_id').references('users.id');
        }),

        knex.schema.createTable('users-fav-dish', function (table) {
            table.increments('id').primary();

            //FK: users.id 
            table.integer('users_id').unsigned();
            table.foreign('users_id').references('users.id');

            //FK: dish.id 
            table.integer('dish_id').unsigned();
            table.foreign('dish_id').references('dish.id');
        }),

        knex.schema.createTable('users-fav-tag', function (table) {
            table.increments('id').primary();

            //FK: users.id 
            table.integer('users_id').unsigned();
            table.foreign('users_id').references('users.id');

            //FK: dish.id 
            table.integer('tag_id').unsigned();
            table.foreign('tag_id').references('tag.id');
        }),
    ]);
}

//reverse order 
exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users-fav-tag').then(() => {
        return knex.schema.dropTable('users-fav-dish')
    }).then(() =>{
        return knex.schema.dropTable('users-fav-recipe')
    }).then(() =>{
        return knex.schema.dropTable('users-fav-meal-plan')
    }).then(() =>{
        return knex.schema.dropTable('users-fav-restaurant')
    }).then(() =>{
        return knex.schema.dropTable('restaurant-tag')
    });
}
