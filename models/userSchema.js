const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create the structure of the data that will be stored in the database
const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  telephone: String,
  age: Number,
  country: String,
  gender: String
},{timestamps: true}); //this will automatically add createdAt and updatedAt fields to the schema

//create a model based on the schema
const User = mongoose.model('User', userSchema);

//export the model to be used in app.js file
module.exports = User;