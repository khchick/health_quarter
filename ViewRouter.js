const express = require('express');
const passport = require('passport');
const unirest = require('unirest');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const isLoggedIn = require('./utils/guard').isLoggedIn;

// For handling profile image upload
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/users')
    },
    filename: function (req, file, cb) {
      cb(null, 
        // Date.now() + '-' + 
        file.originalname)
    }
  })
const upload = multer({ storage: storage })
// require('dotenv').config(); // Define environments
// const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
// const REDIS_PORT = process.env.REDIS_PORT || 6379
// const NODE_ENV = process.env.NODE_ENV || 'development' 

// const knexFile = require('./knexfile')[NODE_ENV] // Connect to DB
// const knex = require('knex')(knexFile)

// const redis = require('redis'); // Connect to Redis server
// const redisClient = redis.createClient({
//     host: REDIS_HOST,
//     port: REDIS_PORT
// })
// 

module.exports = class ViewRouter {

    router() {
        const router = express.Router();

        // Home page
        router.get('/',(req,res)=>res.render("index")); // Display default lists of restaurants
        router.get('/',isLoggedIn,(req,res)=>res.render("home")); // DISPLAY CUSTOM LISTS FOR LOGGED IN USERS (FAV TAGS)

        // Login page
        router.get('/login', (req, res) => res.render("login")); // Login panel with FB login button
        router.post('/login', passport.authenticate('local-login', {
            // successRedirect: '/', 
            failureRedirect: '/error',
            failureFlash: true
            }),(req,res) => {
                res.render("home",{
                    userID: req.session.passport.user.id
                })
            }
        );

        router.get("/auth/facebook", passport.authenticate('facebook', { // Run when the FB login button is clicked
            scope: ['user_friends', 'manage_pages']
        }));
        router.get("/auth/facebook/callback", passport.authenticate('facebook', { //Handle redirections after FB login
            failureRedirect: "/error"
        }),(req,res)=>res.redirect('/')); // CREATE LOCAL ACCOUNTS UPON FIRST FB LOGIN

        // Sign up page
        router.get('/signup',(req,res)=>res.render("signup"));
        router.post('/signup', upload.single('profilePic'), passport.authenticate('local-signup', {
            successRedirect: '/login',
            failureRedirect: '/error',
            failureFlash: true
        }));

        router.get('/logout', function (req, res){
            req.session.destroy(function (err) {
              res.redirect('/');
            });
        });

        // Error page
        router.get('/error', (req, res) => {
            res.send('You are not logged in!' + "   " + "***" + JSON.stringify(req.flash().error[0]) + "***");
        });

        // Home page
        router.get('/home', (req, res)=>res.render('home'));

        // Meal Plans page
        router.get('/delivery', (req, res)=>res.render('meal'));

        // Restaurant details page
        router.get('/rest/:id', (req, res)=>res.render('restaurant'));

        // Dish details page
        router.get('/dish/:id', (req, res)=>res.render('dish'));

        // Meal plan details page
        router.get('/meal/:id', (req, res)=>res.render('meal'));

        //Recipe Finder page
        router.get('/recipeFinder', (req, res) => res.render("recipeFinder"));
        router.get('/recipeFinder', passport.authenticate('local-signup', {
            failureRedirect: '/error',
            failureFlash: true 
            }),(req,res) => { res.render("recipeFinder", {userID: req.session.passport.user.id})}); // DISPLAY CUSTOM LISTS FOR LOGGED IN USERS (FAV TAGS)
        
        //search by calorie
        router.post('/searchcal', urlencodedParser, function (req, res) {
            console.log(req.body);
            unirest.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByNutrients?number=${req.body.quantity}&random=true&maxCalories=${req.body.maxCalorie}&minCalories=${req.body.minCalorie}`)
                .header("X-Mashape-Key", "vCWPJf4dnVmsh6TnOwGo3q8oKumOp14Hxw8jsnhOrBKwlELEZm")
                .header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
                .end(function (result) {
                    console.log(result.status, result.headers, result.body);
                    let dataString = JSON.stringify(result.body);
                    console.log(dataString);
                    res.render('searchcal', { data: dataString, userID: req.session.passport.user.id });
                });
        });


        // search by tag needs work, due to url - limited number of tags...
        router.post('/searchtag', urlencodedParser, function (req, res) {
            console.log(req.body);
            unirest.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?number=${req.body.quantity}&tags=${req.body.tag1}%2C${req.body.tag2}%2C${req.body.tag3}%2C${req.body.tag4}%2C${req.body.tag5}`)
                .header("X-Mashape-Key", "vCWPJf4dnVmsh6TnOwGo3q8oKumOp14Hxw8jsnhOrBKwlELEZm")
                .header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
                .end(function (result) {
                    console.log(result.status, result.headers, result.body, result.body);
                    let dataString = JSON.stringify(result.body);
                    console.log(dataString);
                    res.render('searchtag', { data: dataString, userID: req.session.passport.user.id });
                });
        });


        //search by ingredient
        router.post('/searching', urlencodedParser, function (req, res) {
            console.log(req.body);
            unirest.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?ingredients=${req.body.tag1}%2C${req.body.tag2}%2C${req.body.tag3}%2C${req.body.tag4}%2C${req.body.tag5}&number=${req.body.quantity}&ranking=1`)
                .header("X-Mashape-Key", "vCWPJf4dnVmsh6TnOwGo3q8oKumOp14Hxw8jsnhOrBKwlELEZm")
                .header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
                .end(function (result) {
                    console.log(result.status, result.headers, result.body);
                    let dataString = JSON.stringify(result.body);
                    console.log(dataString);
                    res.render('searching', { data: dataString, userID: req.session.passport.user.id });
                });
        });

        // My Favourites page
        router.get('/favouriteRest',(req,res)=>res.render("favouriteRest"));
        router.get('/favouriteDish',(req,res)=>res.render("favouriteDish"));
        router.get('/favouriteMeal',(req,res)=>res.render("favouriteMeal"));
        router.get('/favouriteRec',(req,res)=>res.render("favouriteRec"));

        // My Account page
        router.get('/profile', (req, res)=>res.render('profile'));
        router.post('/', upload.single('imgfile', (req, res) => res.render("profile")));

        // INSERT ROUTERS FOR OTHER PAGES



        return router;
    }
}
