const express = require("express");

const app = express();

app.use("/health", (req, res, next) => {
    res.send("<h1>Express WS is OK!</h1>");
});

// Middleware to validate Content-Type header for JSON requests
app.use((req, res, next) => {
    // Allow requests without a body (GET, DELETE, etc.) or with proper JSON Content-Type
    if (["GET", "DELETE", "HEAD"].includes(req.method)) {
        return next();
    }

    const contentType = req.headers["content-type"];
    if (!contentType || !contentType.includes("application/json")) {
        return res.status(400).json({
            error: "Invalid Content-Type header. Expected 'application/json'"
        });
    }

    next();
});

app.use(express.json());

app.use("/classes", require("./routes/classes"));
app.use("/students", require("./routes/students"));
app.use("/subjects", require("./routes/subjects"));
app.use("/grades", require("./routes/grades"));

app.listen(3001);
