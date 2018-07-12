const express = require('express');
const passport = require('passport');

class UserRouter {
    constructor(userService) {
        this.userService = userService;
    }

    router() {
        let router = express.Router();

        function isLoggedIn (req, res, next){
            if(req.isAuthenticated()){
                return next();
            }
    
            res.redirect('/login');
        }

        router.get('/signup', (req, res) => {
            res.sendFile(__dirname + '/signup.html');
        });
        
        router.post('/signup', passport.authenticate('local-signup', {
            successRedirect: '/', 
            failureRedirect: '/error'
        }));


        router.get('/login', (req, res)=>{
            res.sendFile(__dirname + '/login.html');
        });
    
        app.post('/login', passport.authenticate('local-login', {
            successRedirect: "/",
            failureRedirect: "/error"
        })); 
    
        router.get('/error', (req, res)=>{
            res.send('You are not logged in!');
        });

        router.post('/', (req, res) => {
            this.userService.createUser(req.body.email, req.body.password, req.body.image, req.body.name, req.body.tags)
                .then(() => this.userService.getUserDetail(req.params.userID)) // Run get /:userID in function?
                .then((res) => res.json(res))
                .catch((err) => res.status(500).json(err));
        })

        router.get('/:userID', (req, res) => {
            this.userService.getUserDetail(req.params.userID)
                .then((userDetails) => res.json(userDetails))
                .catch((err) => res.status(500).json(err));
        })

        router.put('/:userID', (req, res) => { 
            this.userService.updateUserDetail(req.params.userID, req.body.image, req.body.name, req.body.tags)
                .then(() => this.userService.getUserDetail(req.params.userID))
                .then((userDetails) => res.json(userDetails))
                .catch((err) => res.status(500).json(err));
        })

        router.get('/:userID/reviews', (req, res) => { 
            this.userService.listOwnReview(req.params.userID)
                .then((reviews) => res.json(reviews))
                .catch((err) => res.status(500).json(err));
        })

        return router;
    }
}

module.exports = UserRouter;