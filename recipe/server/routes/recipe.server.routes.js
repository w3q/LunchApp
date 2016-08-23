'use strict';

var recipes = require('../controllers/recipe.server.controller');

module.exports = function(app) {
  //Recipes collection routes
  app.route('/api/recipes')
    .get(recipes.list)
    .post(recipes.create);

  //Single recipe routes
  app.route('/api/recipes/:recipeId')
    .get(recipes.read)
    .put(recipes.update)
    .delete(recipes.delete);

  app.param('recipeId', recipes.recipeByID);
};
