<<<<<<< HEAD
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
=======
exports.seed = function (knex, Promise) {
>>>>>>> 5a0796b7821698ddbf579eba934a3508a3d66bdc
  // Deletes ALL existing entries
  return knex('restaurant').del()
    .then(function () {
      // Inserts seed entries
<<<<<<< HEAD
      return knex('restaurant').insert(restaurantData);
    })
  

    .then(()=> {
      return knex('users').del()
      .then(function () {
        // Inserts seed entries
        return knex('users').insert(usersData);
      })
    })

    .then(()=> {
      return knex('tag').del()
    .then(function () {
      // Inserts seed entries
      return knex('tag').insert(tagData);
    })
    })

    .then(()=> {
      return knex('dish').del()
    .then(function () {
      // Inserts seed entries
      return knex('dish').insert(dishData);
    })
    })

    .then(()=> {
      return knex('restaurant_tag').del()
    .then(function () {
      // Inserts seed entries
      return knex('restaurant_tag').insert(restaurantTagData);
    })
    })

    .then(()=> {
      return knex('meal_plan').del()
    .then(function () {
      // Inserts seed entries
      return knex('meal_plan').insert(mealPlanData);
    })
    })

    .then(()=> {
      return knex('users_fav_dish').del()
    .then(function () {
      // Inserts seed entries
      return knex('users_fav_dish').insert(usersFavDishData);
    })
    })

    .then(()=> {
      return knex('users_fav_meal_plan').del()
    .then(function () {
      // Inserts seed entries
      return knex('users_fav_meal_plan').insert(usersFavMealPlanData);
    })
    })

    .then(()=> {
      return knex('users_fav_recipe').del()
    .then(function () {
      // Inserts seed entries
      return knex('users_fav_recipe').insert(usersFavRecipeData);
    })
    })

    .then(()=> {
      return knex('users_fav_restaurant').del()
    .then(function () {
      // Inserts seed entries
      return knex('users_fav_restaurant').insert(usersFavRestaurantData);
    })
    })

    .then(()=> {
      return knex('users_fav_tag').del()
    .then(function () {
      // Inserts seed entries
      return knex('users_fav_tag').insert(usersFavTag);
    })
    })

    .then(()=> {
      return knex('users_review').del()
    .then(function () {
      // Inserts seed entries
      return knex('users_review').insert(usersReview);
    })
    })
};
