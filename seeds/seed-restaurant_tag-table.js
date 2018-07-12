const restaurantData =require('../database_data/restaurant_data')
// const tagData =require('../database_data/tag_data');


exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('restaurant_tag').del()
    .then(() => {
      return knex('restaurant_tag').insert(restaurantData);
    })
    .catch((err) => {
      console.log('there is an error', err);
    })
}





// exports.seed = function(knex, Promise) {
//   return knex('tag').del()
//   .then(() => {
//     return knex('restaurant').del();
//   })
//   .then(() => {
//     return knex('restaurant').insert(restaurantData)
//   })
//   // .then(() => {
//   //   return knex('tag').insert(tagData)
//   // })
//   .then(() => {
//     let restPromises = [];
//     restaurantData.forEach((restaurants) => {
//       let tags = restaurants.tags;
//       restPromises.push(createRestTags(knex, restaurants, tags));
//     });
//     return Promise.all(restPromises);
//   });
// };

// const createRestTags = (knex, restaurants, tags) => {
//   return knex('restaurant').where('id', restaurant).first()
//   .then((restaurantRecord) => {
//     return knex('restaurant').insert({
//       rest_id: restaurantRecord.id,
//       // tag_id: tag.id,
//     });
//   });
// }