const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();
const mongoURI = process.env.MONGO_URI;
var methodOverride = require('method-override'); //import the method-override library to use the put and delete methods in the form
const mongoose = require('mongoose');//create an instance of mongoose(connect to the mongodb)

app.set('view engine', 'ejs')//it will use the ejs template engine to render the views(read data from the database)
app.use(methodOverride('_method')); //use the method-override library to use the put and delete methods in the form
app.use(express.static('public'));//it will use the static files from the views folder(auto reload the css file)
app.use(express.urlencoded({ extended: true }));//add middleware to parse incoming request bodies(send data to the database)

const allRoutes = require('./routes/allRoutes');//import the routes to be used in app.js file
//add live reload functionality to the app(auto reload the css file)
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
const connectLivereload = require("connect-livereload");
app.use(connectLivereload());
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
//connect to the database(connect to the mongodb)
mongoose
//to use local database just replace the link below with ('mongodb://localhost:27017/all-data')
.connect(mongoURI)
.then(() => {
    app.listen(port, () => {
    console.log(`http://localhost:${port}/`)});
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});
//use the routes from the allRoutes.js file
app.use('/', allRoutes);