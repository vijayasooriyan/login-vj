const express = require("express");
const mysql= require("mysql");
const doenv = require("dotenv");
const path = require("path");
const hbs = require("hbs");
const cookieParser = require("cookie-parser");

const app=express();

doenv.config({
    path:"./.env",
});

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE,
});

db.connect((err) => {
    if(err) {
        console.log(err);
    } else {
        console.log("Hi guys your MYSQL Connection Success. on on fire");
    }
});

app.use(cookieParser());
app.use(express.urlencoded({ extended:false}));

const location=path.join(__dirname,'./public');
app.use(express.static(location));
app.set("view engine" , "hbs");

const partialsPath=path.join(__dirname, "./views/partials");
hbs.registerPartials(partialsPath);


app.use('/',require('./routes/pages'));
app.use('/auth',require('./routes/auth'));

app.listen(5000, () => {
    console.log("server Started @ port 5000");
});