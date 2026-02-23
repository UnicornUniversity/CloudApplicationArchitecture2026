const express = require("express");

const app = express();

app.use("/health", (req, res, next) => {
    res.send("<h1>Express WS is OK!</h1>");
});

app.use("/classes", require("./routes/classes"));

app.listen(3001, () => console.log("server listens 3001. Hurray!"));

