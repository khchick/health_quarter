exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tag').del()
    .then(function () {
      // Inserts seed entries
      return knex('tag').insert([
        {name: 'Plant-based'},
        {name: 'Gluten-free'},
        {name: 'Dairy-free'},
        {name: 'Bakery'},
        {name: 'Cakes'},
        {name: 'Organic'},
        {name: 'Superfood'},
        {name: 'Chicken'},
        {name: 'Protein'},
        {name: 'Takeaway'}
      ]);
    });
};
