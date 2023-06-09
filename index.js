const express = require('express');

const port = 3000 || process.env.PORT;

const app = express();

const homeRouter = require('./routes/homeRoutes');
const converRouter = require('./routes/convetRoutes')

app.use(homeRouter);
app.use(converRouter);

app.listen(port, ()=>{
    console.log("listening at 3000.....")
})
