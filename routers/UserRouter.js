const express = require('express');
const passport = require('passport');
const app = express();

class UserRouter {
    constructor(userService) {
        this.userService = userService;
    }

    router() {
        let router = express.Router();

        router.get('/', (req, res) => {
            this.userService.getUserDetail(req.session.passport.user.id)
                .then((userDetails) => res.json(userDetails))
                .catch((err) => res.status(500).json(err));
        })

        router.put('/', (req, res) => {
            console.log(req.body.image);
            this.userService.updateUserDetail(req.session.passport.user.id)
                // .then(() => this.userService.getUserDetail(req.session.passport.user.id))
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