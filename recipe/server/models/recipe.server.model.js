'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Recipe Schema
 */
var RecipeSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true,
        required: 'Title cannot be blank'
    },
    content: {
      type:String,
      default: '',
      trim: true,
      required: 'Content cannot be blank'
    },
    user: {
      type: Schema.ObjectId,
      ref: 'User'
  }
});

mongoose.model('Recipe', RecipeSchema);
