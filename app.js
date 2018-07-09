// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const hb = require('express-handlebars');
const path = require('path');
const RestService = require('./service/restService');
const RestRouter = require('./router/restRouter');
const myAuthorizer = require('./myAuthorizer');

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

// Import authorizer
app.use(basicAuth({
    authorizer: myAuthorizer(knex),
    authorizeAsync: true,
    challenge: true,
    realm: 'Health Quarter'
}))

// Initiate restService
let restService = new RestService(knex);

// Insert path to note router
app.use('/api/notes', (new RestRouter(restService)).router());

// Handle initial get request after login
app.get('/', (req,res) => {
    restService.list()
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