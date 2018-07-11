const express = require('express');

class DishRouter {
    constructor(dishService) {
        this.dishService = dishService;
    }

    router() {
        let router = express.Router();

        router.get('/:restID', (req, res) => {
            this.dishService.listDish(req.params.restID)
                .then((dish) => res.json(dish))
                .catch((err) => res.status(500).json(err));
        })

        router.get('/:dishID', (req, res) => {
            this.restService.getDishDetail(req.params.dishID)
                .then((dishDetail) => res.json(dishDetail))
                .catch((err) => res.status(500).json(err));
        })

        return router;
    }
}

module.exports = DishRouter;