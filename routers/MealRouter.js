const express = require('express');

class MealRouter {
    constructor(mealService) {
        this.mealService = mealService;
    }

    router() {
        let router = express.Router();
        router.get('/', (req, res) =>{
            console.log('hihi')
            this.mealService.listAllMeal()
                .then((meals) => res.json(meals))
                .catch((err) => res.status(500).json(err));
        })
//used in rest.js
        router.get('/:restID', (req, res) => {
            console.log('hihi2')

            this.mealService.listMeal(req.params.restID)
                .then((meals) => res.json(meals))
                .catch((err) => res.status(500).json(err));
        })
//used in meal.js 
        return router;
    }
}

module.exports = MealRouter;