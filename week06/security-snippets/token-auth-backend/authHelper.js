const jwt = require("jsonwebtoken");

function getPrivateKey(){
    //NB! typically we store it outside of  source code
    //you should store it somewhere else. In this method you can read it from a storage
    return "aaabbbcccdddeee";
}

module.exports.createToken = (name) => {
    //check documentation about settings
    return jwt.sign({login: name}, getPrivateKey(), {expiresIn: "1h"});
};

function throwError(message, stsCode = 401){
    const error = new Error(message);
    console.log("server error: " + message);
    error.statusCode = stsCode;
    throw error;
}

//universal middleware to check if a user authenticated
//if success, passes to the next middleware (next method)
//if failed, throws error
module.exports.checkAuthentication = (req, res, next) => {
    //this is a special header
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        throwError("Header Authorization is not set");
    }
    //we estimate there word "Bearer" plus token
    const pieces =  authHeader.split(" ");
    if (pieces.length !== 2){
        throwError("Wrong structure of the header value");
    }
    const token = pieces[1];
    let tokenInfo;
    try {
        tokenInfo = jwt.verify(token, getPrivateKey());
    } catch (err) {
        throwError("Token parsing failed", 500);
    }
    if (!tokenInfo) {
        throwError("Authentication failed");
    }
    //you may dynamically add any properties
    res.userInfo = {login: tokenInfo.login, read: true, write: false};
    next();
};
