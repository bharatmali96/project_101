const express = require('express');
const Router = express();

Router.use(express.json());
Router.use(express.urlencoded({extended:true}));

Router.set('view engine','ejs');
Router.set('views','./views');

const {home} = require('../controllers/homeController')

Router.get('/',home);


module.exports = Router;