const express = require('express');
const passport = require('passport');
const isLoggedIn = require('./utils/guard').isLoggedIn;

module.exports = class ViewRouter{
    
    router(){
        const router = express.Router();

        // Home page
        router.get('/',(req,res)=>res.render("index")); // Display default lists of restaurants
        router.get('/',isLoggedIn,(req,res)=>res.render("index")); // DISPLAY CUSTOM LISTS FOR LOGGED IN USERS (FAV TAGS)

        // Login page
        router.get('/login',(req,res)=>res.render("login")); // Login panel with FB login button
        router.post('/login', passport.authenticate('local-login', {
            successRedirect: '/',
            failureRedirect: '/error',
            failureFlash: true
        }));

        router.get("/auth/facebook",passport.authenticate('facebook',{ // Run when the FB login button is clicked
            scope: ['user_friends', 'manage_pages'] 
        }));
        router.get("/auth/facebook/callback",passport.authenticate('facebook',{ //Handle redirections after FB login
            failureRedirect: "/error"
        }),(req,res)=>res.redirect('/'));

        // Sign up page
        router.get('/signup',(req,res)=>res.render("signup"));  // SIGN UP FORM REQUIRED
        router.post('/signup', passport.authenticate('local-signup', { // CREATE USER IN DB
            successRedirect: '/',
            failureRedirect: '/error',
            failureFlash: true
        }));
    
        // Error page
        router.get('/error', (req, res) => {
            res.send('You are not logged in!' + "   " + "***" + JSON.stringify(req.flash().error[0]) + "***");
        });
 
        // Restaurant details page
        router.get('/rest/:id',(req,res)=> res.render("restaurant",{id: req.params.id}));
        
        // INSERT ROUTERS FOR OTHER PAGES

        return router;
    }
}
