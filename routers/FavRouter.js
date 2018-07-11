const express = require('express');

class FavRouter {
    constructor(favService) {
        this.favService = favService;
    }

    router() {
        let router = express.Router();

        // Check favourite status
        router.get('/:restID', (req, res) => {
            this.favService.isFavRest(req.params.restID, req.auth.user)
                .then((res) => res.json(res))
                .catch((err) => res.status(500).json(err));
        })

        router.get('/:dishID', (req, res) => {
            this.favService.isFavDish(req.params.dishID, req.auth.user)
                .then((res) => res.json(res))
                .catch((err) => res.status(500).json(err));
        })

        router.get('/:mealID', (req, res) => {
            this.favService.isFavMeal(req.params.mealID, req.auth.user)
                .then((res) => res.json(res))
                .catch((err) => res.status(500).json(err));
        })

        // Update favourite status
        router.put('/:restID', (req, res) => {
            this.favService.toggleFavRest(req.params.restID, req.auth.user)
                .then((res) => this.favService.isFavRest(req.params.restID, req.auth.user))
                .then((res) => res.json(res))
                .catch((err) => res.status(500).json(err));
        })

        router.put('/:dishID', (req, res) => {
            this.favService.toggleFavDish(req.params.dishID, req.auth.user)
                .then((res) => this.favService.isFavDish(req.params.dishID, req.auth.user))
                .then((res) => res.json(res))
                .catch((err) => res.status(500).json(err));
        })

        router.put('/:mealID', (req, res) => {
            this.favService.toggleFavMeal(req.params.mealID, req.auth.user)
                .then((res) => this.favService.isFavMeal(req.params.mealID, req.auth.user))
                .then((res) => res.json(res))
                .catch((err) => res.status(500).json(err));
        })

        // Favourite page listing
        router.get('/restaurants', (req, res) => {
            this.favService.listFavRest(req.auth.user)
                .then((restaurants) => res.json(restaurants))
                .catch((err) => res.status(500).json(err));
        })

        router.get('/dishes', (req, res) => {
            this.favService.listFavDish(req.auth.user)
                .then((dishes) => res.json(dishes))
                .catch((err) => res.status(500).json(err));
        })

        router.get('/meals', (req, res) => {
            this.favService.listFavMeal(req.auth.user)
                .then((meals) => res.json(meals))
                .catch((err) => res.status(500).json(err));
        })

        router.get('/recipes', (req, res) => {
            this.favService.listFavRec(req.auth.user)
                .then((recURLs) => res.json(recURLs))
                .catch((err) => res.status(500).json(err));
        })

        // Tag preference setting at profile page
        router.get('/:userID', (req, res) => {
            this.favService.listFavTag(req.params.userID)
                .then((tags) => res.json(tags))
                .catch((err) => res.status(500).json(err));
        })

        return router;
    }
}

module.exports = FavRouter;