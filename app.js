// General Initialization
require('dotenv').config(); // Define environments
const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = process.env.REDIS_PORT || 6379
const NODE_ENV = process.env.NODE_ENV || 'development' 

const knexFile = require('./knexfile')[NODE_ENV] // Connect to DB
const knex = require('knex')(knexFile)

const redis = require('redis'); // Connect to Redis server
const redisClient = redis.createClient({
    host: REDIS_HOST,
    port: REDIS_PORT
})

const fs = require('fs');
const https = require('https')

const isLoggedIn = require('./utils/guard').isLoggedIn;

// Dependency Injection for Routers and Services
const ViewRouter = require('./ViewRouter');

const { DishRouter,
        FavRouter,
        MealRouter,
        RestRouter,
        UserRouter,
        SocketIORouter } = require('./routers');

const { DishService,
        FavService,
        MealService,
        RestService,
        UserService } = require('./services');

let dishService = new DishService(knex);
let favService = new FavService(knex,redisClient); // REDIS ONLY REQUIRED FOR USER RELATED SERVICES?
let mealService = new MealService(knex);
let restService = new RestService(knex,redisClient); // REDIS ONLY REQUIRED FOR USER RELATED SERVICES?
let userService = new UserService(knex,redisClient); // REDIS ONLY REQUIRED FOR USER RELATED SERVICES?

const {app,server,io} = require('./utils/init-app')(redisClient);


new SocketIORouter(io,userService).router();
app.use('/',new ViewRouter().router());
app.use('/api/dish', (new DishRouter(dishService)).router());
app.use('/api/fav', (new FavRouter(favService)).router());
app.use('/api/meal', (new MealRouter(mealService)).router());
app.use('/api/rest', (new RestRouter(restService)).router());
app.use('/api/user', (new UserRouter(userService)).router());

app.use('/api/fav',isLoggedIn,new FavRouter(favService).router()); // DO SOMETHING FOR LOGGED IN USERS?
app.use('/api/rest',isLoggedIn,new RestRouter(restService).router()); // DO SOMETHING FOR LOGGED IN USERS?
app.use('/api/user',isLoggedIn,new UserRouter(userService).router()); // DO SOMETHING FOR LOGGED IN USERS?


const httpsOptions = {
    key: fs.readFileSync('./localhost.key'),
    cert: fs.readFileSync('./localhost.crt')
}

https.createServer(httpsOptions, app).listen(8443, () => {
    console.log('Application started at port ' + 8443)
})


// // Import modules
// const express = require('express');
// const bodyParser = require('body-parser');
// const setupPassport = require('./passport');
// const hb = require('express-handlebars');
// const DishService = require('./services/DishService');
// const FavService = require('./services/FavService');
// const MealService = require('./services/MealService');
// const RestService = require('./services/RestService');
// const UserService = require('./services/UserService');
// const DishRouter = require('./routers/DishRouter');
// const FavRouter = require('./routers/FavRouter');
// const MealRouter = require('./routers/MealRouter');
// const RestRouter = require('./routers/RestRouter');
// const UserRouter = require('./routers/UserRouter');
// const router = require('./router')(express);

// // Connect to DB
// const knexConfig = require('./knexfile').development;
// const knex = require('knex')(knexConfig);

// // Define variables
// const app = express();
// const session = require('express-session');
// const port = "8080";

// app.use(session({
//     secret:'123456',
//     resave:false,
//     saveUninitialized:false
// }));

// // Set JSON as data type
// app.use(bodyParser.json());

// // Serve static files
// app.use(express.static("public"));

// // Define view engine
// app.engine('handlebars', hb({ defaultLayout: 'main' }));
// app.set('view engine', 'handlebars');

// // Initiate services
// let dishService = new DishService(knex);
// let favService = new FavService(knex);
// let mealService = new MealService(knex);
// let restService = new RestService(knex);
// let userService = new UserService(knex);

// // Insert path to routers
// app.use('/api/dish', (new DishRouter(dishService)).router());
// app.use('/api/fav', (new FavRouter(favService)).router());
// app.use('/api/meal', (new MealRouter(mealService)).router());
// app.use('/api/rest', (new RestRouter(restService)).router());
// app.use('/api/user', (new UserRouter(userService)).router());

// // passport.js
// setupPassport(app);
// app.use('/', router);

// // Handle initial get request before login
// app.get('/', (req,res) => {
//     restService.listRestByTag(8) // Insert default tags
//         .then((restaurants) => {
//             res.render('restaurant', {
//                 restaurants: restaurants
//             });
//         });
// });

// app.get('/index', (req,res) => {
//     console.log(req.auth.user);
//     restService.listRestByTag(5) // Insert custom tags
//         .then((restaurants) => {
//             res.render('restaurant', {
//                 restaurants: restaurants
//             });
//         });
// });

// // Handle initial get request after login
// // app.get('/main', (req,res) => {
// //     restService.listRestByTag() // Insert custom tags
// //         .then((restaurants) => {
// //             res.render('restaurant', {
// //                 restaurants: restaurants
// //             });
// //         });
// // });

// // app.get('/', (req,res) => {
// //     restService.list(req.auth.user)
// //         .then((restaurants) => {
// //             res.render('restaurant', { 
// //                 user: req.auth.user,
// //                 restaurants: restaurants
// //             });
// //         });
// // });

// // Check server running status
// app.listen(8080, () => console.log(`Application started at port ${port}`));