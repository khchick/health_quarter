const express = require('express');

class RestRouter {
    constructor(restService) {
        this.restService = restService;
    }

    router() {
        let router = express.Router();

        router.get('/:tagID', (req, res) => {
            this.restService.listRestByTag(req.params.tagID)
                .then((restaurants) => res.json(restaurants))
                .catch((err) => res.status(500).json(err));
        })

        router.get('/:coord', (req, res) => { // ???
            this.restService.listRestByGeo(req.params.coord)
                .then((restaurants) => res.json(restaurants))
                .catch((err) => res.status(500).json(err));
        })

        router.get('/:restID', (req, res) => { 
            this.restService.getRestDetail(req.params.restID)
                .then((restDetail) => res.json(restDetail))
                .catch((err) => res.status(500).json(err));
        })

        router.get('/:restID', (req, res) => { 
            this.restService.listReview(req.params.restID)
                .then((reviews) => res.json(reviews))
                .catch((err) => res.status(500).json(err));
        })

        return router;
    }
}

module.exports = RestRouter;