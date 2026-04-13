const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const multer = require("multer");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({extended: true}));

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(
    multer({storage: fileStorage}).single("dogPortrait")
);

//end-points
app.use("/search", require("./routes/search"));
app.use("/profile", require("./routes/profile"));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error("Application error:", err);
    res.status(500).send("Something went wrong! Please try again later.");
});

app.listen(3000);