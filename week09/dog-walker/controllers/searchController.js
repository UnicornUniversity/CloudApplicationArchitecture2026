const express = require("express");
const dml = require("../data/dataManagementLayer");


module.exports.getForm = (req, res, next) => {
    res.render("search/form");
};

module.exports.doSearch = async (req, res, next) => {
    const dogSize = parseInt(req.body.dogSize);
    console.log("dogSize=" + dogSize);

    const allUsers = await dml.readUsers();
    console.log(allUsers);
    const results = allUsers.filter((dog) => parseInt(dog.dogSize) === dogSize);

    res.render("search/results", {"results": results});
};