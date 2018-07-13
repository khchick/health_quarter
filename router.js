const path = require('path');
const passport = require('passport');

module.exports = (express) => {
    const router = express.Router();

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }

        res.redirect('/login');
    }

    router.get('/signup', (req, res) => {
        res.sendFile(`${__dirname}${path.sep}signup.html`);
    });

    router.post('/signup', passport.authenticate('local-signup', {
        successRedirect: "/index", 
        failureRedirect: "/error"
    }));

    router.get('/login', (req, res)=>{
        res.sendFile(`${__dirname}${path.sep}login.html`);
    });

    router.post('/login', passport.authenticate('local-login', {
        successRedirect: "/index",
        failureRedirect: "/error"
    }))

    router.get('/error', (req, res)=>{
        res.send('You are not logged in!');
    });

    return router;
};
