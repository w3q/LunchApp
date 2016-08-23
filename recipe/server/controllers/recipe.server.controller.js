'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    path = require('path'),
    _ = require('lodash'),
    Recipe = mongoose.model('Recipe'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a 
 */
exports.create = function (req, res) {
    var recipe = new Recipe(req.body);
    recipe.user = req.user;

    recipe.save(function (err) {
        if(err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(recipe);
        }
    });
};

/**
 * Show the current 
 */
exports.read = function (req, res) {
    var recipe = req.recipe ? req.recipe.toJSON() : {};

    res.json(recipe);
};

/**
 * Update a 
 */
exports.update = function (req, res) {
    var recipe = req.recipe;

    recipe.title = req.body.title;
    recipe.content = req.body.content;

    recipe.save(function(err) {
        if(err) {
            res.status(400).send({
                message: errorHandler.getErrorMessage()
            });
        } else {
            res.json(recipe);
        }
    })
};

/**
 * Delete an 
 */
exports.delete = function (req, res) {
    var recipe = req.recipe;

    recipe.remove(function (err) {
       if(err) {
           return req.status(404).send({
               message: errorHandler.getErrorMessage(err)
           });
       } else {
           res.json(recipe);
       }
    });
};

/**
 * List of 
 */
exports.list = function (req, res) {
    var recipes = Recipe.find().sort('-created').populate('user', 'displayName').exec(function (err, recipes) {
        if(err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage()
            });
        } else {
            res.json(recipes);
        }
    });
};

/**
 * Recipe middleware
 */
exports.recipeByID = function (req, res, next, id) {
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Article is invalid'
        });
    }

    Recipe.findById(id).populate('user', 'displayName').exec(function (err, recipe) {
        if(err) {
            return next(err);
        } else if(!recipe) {
            return res.status(404).send({
                message: 'Recipe not found'
            });
        }

        req.recipe = recipe;
        next();
    });
};
