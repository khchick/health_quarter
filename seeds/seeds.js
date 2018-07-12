const restaurantData = require('../database_data/restaurant_data');
const usersData = require('../database_data/users_data');
const tagData = require('../database_data/tag_data');
const dishData = require('../database_data/dish_data');
const restaurantTagData = require('../database_data/restaurant_tag_data');
const mealPlanData = require('../database_data/meal_plan_data');
const usersFavDishData = require('../database_data/users_fav_dish_data');
const usersFavMealPlanData = require('../database_data/users_fav_meal_plan_data');
const usersFavRecipeData = require('../database_data/users_fav_recipe_data');
const usersFavRestaurantData = require('../database_data/users_fav_restaurant_data');
const usersFavTag = require('../database_data/users_fav_tag_data');
const usersReview = require('../database_data/users_review_data');


exports.seed = function(knex, Promise) {

  return knex('restaurant').del()
    .then(function () {
      return knex('restaurant').insert(restaurantData);
    })

    .then(()=> {
      return knex('users').del()
      .then(function () {
        return knex('users').insert(usersData);
      })
    })

    .then(()=> {
      return knex('tag').del()
    .then(function () {
      return knex('tag').insert(tagData);
    })
    })

    .then(()=> {
      return knex('dish').del()
    .then(function () {
      return knex('dish').insert(dishData);
    })
    })

    .then(()=> {
      return knex('restaurant_tag').del()
    .then(function () {
      return knex('restaurant_tag').insert(restaurantTagData);
    })
    })

    .then(()=> {
      return knex('meal_plan').del()
    .then(function () {
      return knex('meal_plan').insert(mealPlanData);
    })
    })

    .then(()=> {
      return knex('users_fav_dish').del()
    .then(function () {
      return knex('users_fav_dish').insert(usersFavDishData);
    })
    })

    .then(()=> {
      return knex('users_fav_meal_plan').del()
    .then(function () {
      return knex('users_fav_meal_plan').insert(usersFavMealPlanData);
    })
    })

    .then(()=> {
      return knex('users_fav_recipe').del()
    .then(function () {
      return knex('users_fav_recipe').insert(usersFavRecipeData);
    })
    })

    .then(()=> {
      return knex('users_fav_restaurant').del()
    .then(function () {
      return knex('users_fav_restaurant').insert(usersFavRestaurantData);
    })
    })

    .then(()=> {
      return knex('users_fav_tag').del()
    .then(function () {
      return knex('users_fav_tag').insert(usersFavTag);
    })
    })

    .then(()=> {
      return knex('users_review').del()
    .then(function () {
      return knex('users_review').insert(usersReview);
    })
    })
};