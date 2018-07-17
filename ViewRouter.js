const express = require('express');
const passport = require('passport');
const unirest = require('unirest');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const isLoggedIn = require('./utils/guard').isLoggedIn;

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
        router.post('/signup', passport.authenticate('local-signup', {
            successRedirect: '/',
            failureRedirect: '/error',
            failureFlash: true
        }));

        // Error page
        router.get('/error', (req, res) => {
            res.send('You are not logged in!' + "   " + "***" + JSON.stringify(req.flash().error[0]) + "***");
        });

        // Restaurant details page
        router.get('/rest/:id', (req, res) => res.render("restaurant", { id: req.params.id }));

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



        // INSERT ROUTERS FOR OTHER PAGES



        return router;
    }
}
