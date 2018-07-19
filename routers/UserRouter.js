const express = require('express');
const passport = require('passport');
const app = express();


class UserRouter {
    constructor(userService) {
        this.userService = userService;
    }

    router() {
        let router = express.Router();

        router.get('/tags/all',(req,res)=> {
            this.userService.listAllTags()
                .then((tags) => res.json(tags))
                .catch((err) => res.status(500).json(err));
        });

        router.get('/tags/fav',(req,res)=> {
            this.userService.listFavTags(req.session.passport.user.id)
                .then((favTags) => res.json(favTags))
                .catch((err) => res.status(500).json(err));
        });

        router.delete('/tags/fav',(req,res)=> {
            this.userService.clearFavTags(req.session.passport.user.id)
                .then((favTag) => res.json(favTag))
                .catch((err) => res.status(500).json(err));
        });

        router.put('/tags/fav',(req,res)=> {
            console.log(req.body.tag.tag_id);
            this.userService.insertFavTag(req.session.passport.user.id,req.body.tag.tag_id)
                .then((favTag) => res.json(favTag))
                .catch((err) => res.status(500).json(err));
        });

        router.get('/', (req, res) => {
            this.userService.getUserDetail(req.session.passport.user.id)
                .then((userDetails) => res.json(userDetails))
                .catch((err) => res.status(500).json(err));
        })

        router.put('/', (req, res) => {
            this.userService.updateUserDetail(req.session.passport.user.id,req.body.nickname,req.body.imgURL)
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