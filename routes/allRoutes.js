const express=require('express');
const router=express.Router();
const userController=require('../controllers/userController');//import the controller to be used in allRoutes.js file
//get the data from the database and render it to the index.ejs file(read data from the database)
router.get('/',userController.users_index_get);
//render the add.ejs file to add a new user(send data to the database)
router.get('/user/add.html',userController.users_add_get);
//get the data of a specific user from the database and render it to the view.ejs file(read data from the database)
router.get('/view/:id',userController.user_view_get);
//send the data of a specific user to the edit.ejs file to be deleted(delete data from the database)
router.get('/edit/:id',userController.user_edit_delete);
//delete a specific user from the database and redirect to the index.ejs file(delete data from the database)
router.delete('/edit/:id',userController.user_index_delete);
//update a specific user in the database and redirect to the index.ejs file(update data in the database)
router.put('/edit/:id',userController.user_index_put);
//search for a specific user in the database and render it to the search.ejs file(search for data from the database)
router.post('/search',userController.user_search_post);
//add a new user to the database(send data to the database)
router.post('/',userController.user_index_post);

//export the router to be used in the app.js file
module.exports=router;