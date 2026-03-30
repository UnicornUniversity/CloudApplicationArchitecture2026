const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const authHelper = require("./authHelper");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST");
    //this header must be explicitly defined
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

//accessible without authentication
app.post("/login", (req, res) => {
    const name = req.body.login;
    console.log("login: " + name);
    res.json({userName: name, token: authHelper.createToken(name)});
});

//this one is accessible if a user authenticated only
//two middlewares run one after another
app.get("/hello", authHelper.checkAuthentication, (req, res) => {
    console.log("hello call");
    res.json({message: "Hello!", userInfo: res.userInfo});
});

app.listen(3001);