const express = require('express');
require('dotenv').config();

const port = process.env.PORT || 3000

const app = express();

const homeRouter = require('./routes/homeRoutes');
const converRouter = require('./routes/convetRoutes')

app.use(homeRouter);
app.use(converRouter);

app.listen(port, ()=>{
    console.log(`lisening ${port}....`);
})
