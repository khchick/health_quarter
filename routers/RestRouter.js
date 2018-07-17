const express = require('express');

class RestRouter {
    constructor(restService) {
        this.restService = restService;
    }

    router() {
        let router = express.Router();

        router.get('/rest/:id', (req, res) => {
            this.restService.listReview(req.params.restID)
            .then(review => {
                console.log(review);
                res.render("restaurant", {
                    user: req.session.passport.user,
                    review: review
                });
            });
        });

        router.get('/tag/:tagID', (req, res) => { // DONE
            this.restService.listRestByTag(req.params.tagID)
                .then((restaurants) => res.json(restaurants))
                .catch((err) => res.status(500).json(err));
        })

        // router.get('/location/:coord', (req, res) => {
        //     this.restService.listRestByGeo(req.params.coord)
        //         .then((restaurants) => res.json(restaurants))
        //         .catch((err) => res.status(500).json(err));
        // })

        router.get('/detail/:restID', (req, res) => { // DONE
            this.restService.getRestDetail(req.params.restID)
                .then((restDetail) => res.json(restDetail))
                .catch((err) => res.status(500).json(err));
        })

        router.get('/review/:restID', (req, res) => { 
            this.restService.listReview(req.params.restID)
                .then((reviews) => res.json(reviews))
                .catch((err) => res.status(500).json(err));
        })

        router.post('/review/:restID', (req, res) => {
            this.restService.addReview(req.body.comment,req.body.rating,req.session.passport.user.id,req.params.restID)
                .then(() => this.restService.listReview(req.params.restID))
                .then((reviews) => res.json(reviews))
                .catch((err) => res.status(500).json(err));
        })

        return router;
    }
}

module.exports = RestRouter;