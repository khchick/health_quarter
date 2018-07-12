const restaurantData = require('../database_data/restaurant_data');
const usersData = require('../database_data/users_data');

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('restaurant').del()
    .then(() => {
      return knex('users').del()
        .then(() => {
          return knex('restaurant').insert(restaurantData);
        })
        .then(() => {
          return knex('users').insert(usersData)
        })
        .catch((err) => {
          console.log('there is an error', err);
        })
    })
}