const express = require('express');
const Router = express();

Router.use(express.json());
Router.use(express.urlencoded({extended:true}));

Router.set('view engine','ejs');
Router.set('views','./views');

const multer = require("multer");
const path = require("path");

const session = require('express-session')

Router.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
}))
Router.use(express.static('resources'));


// const storage = multer.diskStorage({
//     destination:function(req, file, cb){
//         cb(null, path.join(__dirname, '../resources'))
//     },

//     filename:function(req, file, cb){
//         const name = 'example'+ path.extname(file.originalname);
//         cb(null, name)
//     }
// })

const upload = multer();

const { conTopdfView, conTopdf, download,mergepdf, mergepdfView, pdf2DocsView, pdf2Docs } = require('../controllers/convetorController');

Router.get('/contopdf',conTopdfView);
Router.post('/contopdf',upload.single('file'),conTopdf);
Router.get('/download', download);
Router.get('/mergpdf', mergepdfView);
Router.post('/mergpdf',upload.array('files'), mergepdf);
Router.get('/pdftoword',pdf2DocsView )
Router.post('/pdftoword',upload.single('file'),pdf2Docs);

module.exports = Router;