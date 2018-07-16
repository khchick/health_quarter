const express = require('express');

class FavRouter {
    constructor(favService) {
        this.favService = favService;
    }

    router() {
        let router = express.Router();

        // Check favourite status
        router.get('/rest/:restID', (req, res) => {
            this.favService.isFavRest(req.params.restID, req.session.passport.user.id)
                .then((status) => res.json(status))
                .catch((err) => res.status(500).json(err));
        })

        router.get('/dish/:dishID', (req, res) => {
            this.favService.isFavDish(req.params.dishID, req.session.passport.user.id)
                .then((status) => res.json(status))
                .catch((err) => res.status(500).json(err));
        })

        router.get('/meal/:mealID', (req, res) => {
            this.favService.isFavMeal(req.params.mealID, req.session.passport.user.id)
                .then((status) => res.json(status))
                .catch((err) => res.status(500).json(err));
        })

        // Update favourite status
        router.post('/rest/:restID', (req, res) => { // Add to favourite
            this.favService.addFavRest(req.params.restID, req.session.passport.user.id)
                .then(() => this.favService.isFavRest(req.params.restID, req.session.passport.user.id))
                .then((status) => res.json(status))
                .catch((err) => res.status(500).json(err));
        })

        router.delete('/rest/:restID', (req, res) => { // Remove from favourite
            this.favService.delFavRest(req.params.restID, req.session.passport.user.id)
                .then(() => this.favService.isFavRest(req.params.restID, req.session.passport.user.id))
                .then((status) => res.json(status))
                .catch((err) => res.status(500).json(err));
        })

        router.post('/dish/:dishID', (req, res) => { // Add to favourite
            this.favService.addFavDish(req.params.dishID, req.session.passport.user.id)
                .then((res) => this.favService.isFavDish(req.params.dishID, req.session.passport.user.id))
                .then((res) => res.json(res))
                .catch((err) => res.status(500).json(err));
        })

        router.delete('/dish/:dishID', (req, res) => { // Remove from favourite
            this.favService.delFavDish(req.params.dishID, req.session.passport.user.id)
                .then((res) => this.favService.isFavDish(req.params.dishID, req.session.passport.user.id))
                .then((res) => res.json(res))
                .catch((err) => res.status(500).json(err));
        })

        router.post('/meal/:mealID', (req, res) => { // Add to favourite
            this.favService.addFavMeal(req.params.mealID, req.session.passport.user.id)
                .then((res) => this.favService.isFavMeal(req.params.mealID, req.session.passport.user.id))
                .then((res) => res.json(res))
                .catch((err) => res.status(500).json(err));
        })

        router.delete('/meal/:mealID', (req, res) => { // Remove from favourite
            this.favService.delFavMeal(req.params.mealID, req.session.passport.user.id)
                .then((res) => this.favService.isFavMeal(req.params.mealID, req.session.passport.user.id))
                .then((res) => res.json(res))
                .catch((err) => res.status(500).json(err));
        })

        // Favourite page listing
        router.get('/fav/restaurants', (req, res) => {
            this.favService.listFavRest(req.session.passport.user.id)
                .then((restaurants) => res.json(restaurants))
                .catch((err) => res.status(500).json(err));
        })

        router.get('/fav/dishes', (req, res) => {
            this.favService.listFavDish(req.session.passport.user.id)
                .then((dishes) => res.json(dishes))
                .catch((err) => res.status(500).json(err));
        })

        router.get('/fav/meals', (req, res) => {
            this.favService.listFavMeal(req.session.passport.user.id)
                .then((meals) => res.json(meals))
                .catch((err) => res.status(500).json(err));
        })

        router.get('/fav/recipes', (req, res) => {
            this.favService.listFavRec(req.session.passport.user.id)
                .then((recURLs) => res.json(recURLs))
                .catch((err) => res.status(500).json(err));
        })

        // Tag preference setting at profile page
        router.get('/myfav', (req, res) => {
            this.favService.listFavTag(req.session.passport.user.id)
                .then((tags) => res.json(tags))
                .catch((err) => res.status(500).json(err));
        })

        return router;
    }
}

module.exports = FavRouter;