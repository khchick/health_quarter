// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const setupPassport = require('./passport');
const hb = require('express-handlebars');
const path = require('path');
const DishService = require('./services/DishService');
const FavService = require('./services/FavService');
const MealService = require('./services/MealService');
const RestService = require('./services/RestService');
const UserService = require('./services/UserService');
const DishRouter = require('./routers/DishRouter');
const FavRouter = require('./routers/FavRouter');
const MealRouter = require('./routers/MealRouter');
const RestRouter = require('./routers/RestRouter');
const UserRouter = require('./routers/UserRouter');

// Connect to DB
const knexConfig = require('./knexfile').development;
const knex = require('knex')(knexConfig);

// Define variables
const app = express();
const port = "8080";

// Set JSON as data type
app.use(bodyParser.json());

// Serve static files
app.use(express.static("public"));

// Define view engine
app.engine('handlebars', hb({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//Setup Passportjs
setupPassport(app);
app.use('/routers', UserRouter);

// Initiate services
let dishService = new DishService(knex);
let favService = new FavService(knex);
let mealService = new MealService(knex);
let restService = new RestService(knex);
let userService = new UserService(knex);

// Insert path to routers
app.use('/api/dish', (new DishRouter(dishService)).router());
app.use('/api/fav', (new FavRouter(favService)).router());
app.use('/api/meal', (new MealRouter(mealService)).router());
app.use('/api/rest', (new RestRouter(restService)).router());
app.use('/api/user', (new UserRouter(userService)).router());

// Handle initial get request after login
app.get('/', (req,res) => {
    restService.listRestByTag() // Insert default tags
        .then((restaurants) => {
            res.render('restaurant', {
                restaurants: restaurants
            });
        });
});

// app.get('/', (req,res) => {
//     restService.list(req.auth.user)
//         .then((restaurants) => {
//             res.render('restaurant', { 
//                 user: req.auth.user,
//                 restaurants: restaurants
//             });
//         });
// });

// Check server running status
app.listen(8080, () => console.log(`Application started at port ${port}`));