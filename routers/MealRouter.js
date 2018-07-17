const express = require('express');

class MealRouter {
    constructor(mealService) {
        this.mealService = mealService;
    }

    router() {
        let router = express.Router();

        router.get('/:restID', (req, res) => {
            this.mealService.listMeal(req.params.restID)
                .then((meals) => res.json(meals))
                .catch((err) => res.status(500).json(err));
        })

        router.get('/all'), (req, res) =>{
            this.mealService.listAllMeal()
                .then((meals) => res.json(meals))
                .catch((err) => res.status(500).json(err));
        }

        return router;
    }
}

module.exports = MealRouter;