exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('restaurant_tag').del()
    .then(function () {
      // Inserts seed entries
      return knex('restaurant_tag').insert([
        {rest_id: 1, tag_id: 1},
        {rest_id: 2, tag_id: 2},
        {rest_id: 2, tag_id: 3},
        {rest_id: 2, tag_id: 4},
        {rest_id: 2, tag_id: 5},
        {rest_id: 2, tag_id: 6},
        {rest_id: 2, tag_id: 7},
        {rest_id: 3, tag_id: 8},
        {rest_id: 3, tag_id: 9},
        {rest_id: 3, tag_id: 10}
      ]);
    });
};
