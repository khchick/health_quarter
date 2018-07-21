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

module.exports = class ViewRouter {

    router() {
        const router = express.Router();

        // Generic landing page
        router.get('/', (req, res, next) => {
            unirest.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByNutrients?number=3&random=true&maxCalories=800&minCalories=600`)
            .header("X-Mashape-Key", "vCWPJf4dnVmsh6TnOwGo3q8oKumOp14Hxw8jsnhOrBKwlELEZm")
            .header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
            .end(function (result) {
                console.log(result.status, result.headers, result.body);
                let dataString = JSON.stringify(result.body);
                console.log(dataString);
            res.render('index', { title: 'HealthQuarter // uncover your healthy lifestyle', data: dataString, css: ['common.css', 'index.css'] });
        });
        router.get('/', isLoggedIn, (req, res, next) => { // May not work
            unirest.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByNutrients?number=3&random=true&maxCalories=800&minCalories=600`)
            .header("X-Mashape-Key", "vCWPJf4dnVmsh6TnOwGo3q8oKumOp14Hxw8jsnhOrBKwlELEZm")
            .header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
            .end(function (result) {
                console.log(result.status, result.headers, result.body);
                let dataString = JSON.stringify(result.body);
                console.log(dataString);
            res.render('index', { title: 'HealthQuarter // uncover your healthy lifestyle', data: dataString, css: ['common.css', 'index.css'] });
        });

        // Personalised home page
        router.get('/home', (req, res, next) => {
            res.render('index', { title: 'HealthQuarter // uncover your healthy lifestyle', css: ['common.css', 'index.css'] });
        });

        // Restaurant list (of certain tag)
        router.get('/tag/:id', (req, res, next) => {
            res.render('restlist', { title: 'HealthQuarter // uncover your healthy lifestyle', css: ['common.css', 'index.css'] });
        });

        // Restaurant details page
        router.get('/rest/:id', (req, res) => res.render('restaurant'));

        // Dish details page
        router.get('/dish/:id', (req, res) => res.render('dish'));

        // Meal plan details page
        router.get('/meal/:id', (req, res) => res.render('meal'));

        // Meal Plans page
        router.get('/mealplans', (req, res, next) => {
            res.render('mealplans', { title: 'HealthQuarter // uncover your healthy lifestyle', css: ['common.css', 'index.css'] });
        });

        //Recipe Finder page
        router.get('/recipeFinder', (req, res) => res.render("recipeFinder"));
        router.get('/recipeFinder', passport.authenticate('local-signup', {
            failureRedirect: '/error',
            failureFlash: true
        }), (req, res) => { res.render("recipeFinder", { userID: req.session.passport.user.id }) }); // DISPLAY CUSTOM LISTS FOR LOGGED IN USERS (FAV TAGS)

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
        router.get('/favouriteRest', (req, res, next) => {
            res.render('favouriteRest', { title: 'HealthQuarter // uncover your healthy lifestyle', css: ['common.css', 'index.css'] });
        });
        router.get('/favouriteDish', (req, res, next) => {
            res.render('favouriteDish', { title: 'HealthQuarter // uncover your healthy lifestyle', css: ['common.css', 'index.css'] });
        });
        router.get('/favouriteMeal', (req, res, next) => {
            res.render('favouriteMeal', { title: 'HealthQuarter // uncover your healthy lifestyle', css: ['common.css', 'index.css'] });
        });
        router.get('/favouriteRec', (req, res, next) => {
            res.render('favouriteRec', { title: 'HealthQuarter // uncover your healthy lifestyle', css: ['common.css', 'index.css'] });
        });

        // My Account page
        router.get('/profile', (req, res, next) => {
            res.render('profile', { title: 'HealthQuarter // uncover your healthy lifestyle', css: ['common.css', 'index.css'] });
        });
        router.post('/api/user/avatar', upload.single('avatar'), (req, res) => res.redirect('/profile'));

        // Sign up page
        router.get('/signup', (req, res, next) => {
            res.render('signup', { title: 'HealthQuarter // uncover your healthy lifestyle', css: ['common.css', 'index.css'] });
        });
        router.post('/signup', upload.single('profilePic'), passport.authenticate('local-signup', {
            successRedirect: '/login',
            failureRedirect: '/error',
            failureFlash: true
        }));

        // Login page
        router.get('/login', (req, res, next) => {
            res.render('login', { title: 'HealthQuarter // uncover your healthy lifestyle', css: ['common.css', 'index.css'] });
        });
        router.post('/login', passport.authenticate('local-login', {
            // successRedirect: '/', 
            failureRedirect: '/error',
            failureFlash: true
        }), (req, res) => {
            res.render("home", {
                userID: req.session.passport.user.name
            })
        }
        );

        router.get("/auth/facebook", passport.authenticate('facebook', { // Run when the FB login button is clicked
            scope: ['user_friends', 'manage_pages']
        }));
        router.get("/auth/facebook/callback", passport.authenticate('facebook', { //Handle redirections after FB login
            failureRedirect: "/error"
        }), (req, res) => res.redirect('/')); // CREATE LOCAL ACCOUNTS UPON FIRST FB LOGIN ---> To be implemented

        // Logout redirection
        router.get('/logout', function (req, res) {
            req.session.destroy(function (err) {
                res.redirect('/');
            });
        });

        // Error page
        router.get('/error', (req, res) => {
            res.send('You are not logged in!' + "   " + "***" + JSON.stringify(req.flash().error[0]) + "***");
        });

        return router;
    }
}
