const express = require('express');

class FavRouter {
    constructor(favService) {
        this.favService = favService;
    }

    router() {
        let router = express.Router();

        // Check favourite status
        router.get('/rest/:restID', (req, res) => { // DONE
            this.favService.isFavRest(req.params.restID, req.session.passport.user.id)
                .then((status) => res.json(status))
                .catch((err) => res.status(500).json(err));
        })

        router.get('/recipes/:recURL', (req, res) => {
            this.faveService.isFavRec(req.params.recURL, req.session.passport.user.id)
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
        router.post('/rest/:restID', (req, res) => { // DONE
            this.favService.addFavRest(req.params.restID, req.session.passport.user.id)
                .then(() => this.favService.isFavRest(req.params.restID, req.session.passport.user.id))
                .then((status) => res.json(status))
                .catch((err) => res.status(500).json(err));
        })


        router.delete('/rest/:restID', (req, res) => { // DONE
            this.favService.delFavRest(req.params.restID, req.session.passport.user.id)
                .then(() => this.favService.isFavRest(req.params.restID, req.session.passport.user.id))
                .then((status) => res.json(status))
                .catch((err) => res.status(500).json(err));
        })

<<<<<<< HEAD
        router.post('/recipes/:recURL', (req, res) => {
            this.favService.addFavRec(req.params.recURL, req.session.passport.user.id)
                .then(() => this.favService.isFavRec(req.params.recURL, req.session.passport.user.id))
                .then((status) => res.json(status))
                .catch((err) => res.status(500).json(err));
        })

        router.delete('/recipes/:recUrl', (req, res)=>{
            this.favService.delFavRec(req.params.recURL, req.session.passport.user.id)
                .then(()=> this.favService.isFavRec(req.params.recURL, req.session.passport.user.id))
                .then((status) => res.json(status))
                .catch((err)=> res.status(500).json(err));
        })



=======
>>>>>>> 85bca108f7b99df0901d5d04ae5df1eeeaae74c9
        router.post('/dish/:dishID', (req, res) => {
            this.favService.addFavDish(req.params.dishID, req.session.passport.user.id)
                .then(() => this.favService.isFavDish(req.params.dishID, req.session.passport.user.id))
                .then((status) => res.json(status))
                .catch((err) => res.status(500).json(err));
        })

        router.delete('/dish/:dishID', (req, res) => {
            this.favService.delFavDish(req.params.dishID, req.session.passport.user.id)
                .then(() => this.favService.isFavDish(req.params.dishID, req.session.passport.user.id))
                .then((status) => res.json(status))
                .catch((err) => res.status(500).json(err));
        })

        router.post('/meal/:mealID', (req, res) => {
            this.favService.addFavMeal(req.params.mealID, req.session.passport.user.id)
                .then(() => this.favService.isFavMeal(req.params.mealID, req.session.passport.user.id))
                .then((status) => res.json(status))
                .catch((err) => res.status(500).json(err));
        })

        router.delete('/meal/:mealID', (req, res) => {
            this.favService.delFavMeal(req.params.mealID, req.session.passport.user.id)
                .then(() => this.favService.isFavMeal(req.params.mealID, req.session.passport.user.id))
                .then((status) => res.json(status))
                .catch((err) => res.status(500).json(err));
        })

        // Favourite page listing
        router.get('/restaurants', (req, res) => {
            this.favService.listFavRest(req.session.passport.user.id)
                .then((restaurants) => res.json(restaurants))
                .catch((err) => res.status(500).json(err));
        })

        router.get('/dishes', (req, res) => {
            this.favService.listFavDish(req.session.passport.user.id)
                .then((dishes) => res.json(dishes))
                .catch((err) => res.status(500).json(err));
        })

        router.get('/meals', (req, res) => {
            this.favService.listFavMeal(req.session.passport.user.id)
                .then((meals) => res.json(meals))
                .catch((err) => res.status(500).json(err));
        })

        router.get('/recipes', (req, res) => {
            this.favService.listFavRec(req.session.passport.user.id)
                .then((recURLs) => res.json(recURLs))
                .catch((err) => res.status(500).json(err));
        })

        // Tag preference setting at profile page
        router.get('/preference', (req, res) => { // DONE
            this.favService.listFavTag(req.session.passport.user.id)
                .then((tags) => res.json(tags))
                .catch((err) => res.status(500).json(err));
        })

        return router;
    }
}

module.exports = FavRouter;