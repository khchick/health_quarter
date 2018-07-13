const express = require('express');
const passport = require('passport');
const app = express();

class UserRouter {
    constructor(userService) {
        this.userService = userService;
    }

    router() {
        let router = express.Router();

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