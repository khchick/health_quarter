exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('restaurant').del()
    .then(function () {
      // Inserts seed entries
      // < Table > restaurant 
      return knex('restaurant').insert([
        {
          name: 'Confusion Plant Based Kitchen',
          location: 'G/F, 103 Jervois Street, Sheung Wan',
          lat: '22.2854049',
          lng: '114.1492525',
          about: '100% plant-based kitchen serving healthy Asian and Western cuisine. Environmentally conscious aiming for zero waste. Daily and weekly specials. Breakfast, lunch, sides, burgers and wraps, desserts and drinks.',
          phone: '25633699',
          website: 'http://www.confusion.hk',
          price: '$51-100',
          hours: 'Mon - Sat 09:00 - 21:00',
          img: 'http://www.confusion.hk/uploads/1/1/2/7/112766607/img-5470_orig.jpg',
          short_desc: '100% plant-based kitchen serving healthy Asian and Western cuisine. Environmentally conscious aiming for zero waste. Daily and weekly specials. Breakfast, lunch, sides, burgers and wraps, desserts and drinks.'
        },
        {
          name: 'The Cakery',
          location: 'Shop 303, 3/F, The Landmark, 15 Queens Road Central, Central',
          lat: '22.2809999',
          lng: '114.1556153',
          about: 'The Cakery caters to today’s health-conscious consumer. We know that you want to be good to your body, and sometimes that’s not easy – so we bake our cupcakes with only natural, nutrient-rich ingredients, and offer a wide range of baked goods to suit every customer’s needs. Whether you only eat organic, are giving that paleo diet regime a go, or require gluten-, wheat- or dairy-free recipes, we’ve got a sweet treat for you. So go ahead, indulge as much as you want. Being bad never felt so good. We offer two categories of products. The Guilt-free* series offers an assortment of cupcakes that are low in refined sugar, with gluten-, wheat- and dairy-free variations. The Organic series is where you’ll find both organic baked goods and tasty teas to accompany them. Paleo products are also available upon request.',
          phone: '66833833',
          website: '"www.thecakery.com',
          price: 'Below $50',
          hours: 'Mon - Sun 11:00 - 19:30',
          img: 'https://static.wixstatic.com/media/6eece4_bf8c6414a88948d6965b7422ed65d794~mv2.jpg/v1/fill/w_1276,h_678,al_c,q_85,usm_0.66_1.00_0.01/6eece4_bf8c6414a88948d6965b7422ed65d794~mv2.webpg',
          short_desc: 'The Cakery is a health conscious dessert shop that offers a variety of gluten free, dairy free, reduced fat and organic cupcakes. This bakery uses a variety of superfoods like chia seed, gojiberries and coconut oil to make their desserts.'
        }
      ])
      // < Table > users
      .then(()=> {
        return knex('users').del()
        .then(function () {
          return knex('users').insert([
            {
              name: 'King',
              password: 'King1234',
              img: 'https://www.google.com.hk/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=2ahUKEwi1qLm6yZbcAhVPhrwKHeNOBQUQjRx6BAgBEAU&url=http%3A%2F%2Ftheconversation.com%2Fpet-theft-is-on-the-rise-with-more-than-60-dogs-stolen-in-the-uk-every-week-91418&psig=AOvVaw3BKVPVW_HoxecZm4iOTWoe&ust=1531382214784068',
              email: 'king1234@gmail.com'
            },
            {
              name: 'Sonya',
              password: 'Sonya1234',
              img: 'https://5.imimg.com/data5/OK/OW/MY-37775609/lotus-flower-500x500.jpg',
              email: 'Sonya1234@gmail.com'
            }
          ])
      })
      .catch((err) => {
              console.log('there is an error', err);
            })
        })
    })
}
