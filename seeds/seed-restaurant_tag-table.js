const restaurantTagData =require('../database_data/restaurant_tag_data')
// const tagData =require('../database_data/tag_data');


exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('restaurant_tag').del()
    .then(() => {
      return knex('restaurant_tag').insert(restaurantTagData);
    })
    .catch((err) => {
      console.log('there is an error', err);
    })
}
