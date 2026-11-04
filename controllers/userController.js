var moment = require('moment'); //import the moment library to format the date
const User = require('../models/userSchema');//import the model to be used in app.js file(send data to the database)

const users_index_get = (req, res) => {
    User.find()// Find all users in the database
        .then((arrUsers) => {
            res.render('index', { users: arrUsers, moment: moment });//Render the index.ejs file and pass the users data to it
        })
        .catch((error) => {
            console.error('Error fetching users:', error);
        });
}
const users_add_get = (req, res) => {
    res.render('user/add', {});
}
const user_view_get = (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.render('user/view', {object:result,moment: moment});
    })
    .catch((error) => {
      console.error('Error fetching user:', error);
    });
}
const user_edit_delete =(req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.render('user/edit', {object:result,moment: moment});
    })
    .catch((error) => {
      console.error('Error fetching user:', error);
    });
}
const user_index_delete =(req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect('/');
    })
    .catch((error) => {
      console.error('Error deleting user:', error);
    });
}
const user_index_put =(req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.redirect('/');
    })
    .catch((error) => {
      console.error('Error updating user:', error);
    });
}
const user_search_post = (req, res) =>{
  User.find({$or:[{firstName:req.body.query.trim()}, {lastName:req.body.query.trim()}]})
    .then((results) => {
      res.render('user/search', { users: results ,moment: moment});
    })
    .catch((error) => {
      console.error(error);
    });
}
const user_index_post = (req, res) =>{
  User
  .create(req.body)
    .then(() => {
      console.log(req.body);
      res.redirect('/');
    })
    .catch((error) => {
      console.error('Error saving user:', error);
    });
}
module.exports = {
    users_index_get,
    users_add_get,
    user_view_get,
    user_edit_delete,
    user_index_delete,
    user_index_put,
    user_search_post,
    user_index_post,
}