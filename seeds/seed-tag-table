const tagData = require('../database_data/tag_data');

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('tag').del()
    .then(() => {
      return knex('tag').insert(tagData);
    })

    .catch((err) => {
      console.log('there is an error', err);
    })
}
