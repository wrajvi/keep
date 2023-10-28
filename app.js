const express = require('express'); 
const bodyParser = require('body-parser');
const feedRoutes = require('./routes/feed');
const mongoose = require('mongoose');


const app=express();

app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type','Authorization');
    next();

});

app.use('/feed',feedRoutes);


mongoose.connect('mongodb+srv://wrajvi13:LvMK1TUQd4pnk611@cluster0.wckoi9p.mongodb.net/messages?retryWrites=true&w=majority')
.then( result  => {
    app.listen(8080);
})
.catch(err => console.log(err));
