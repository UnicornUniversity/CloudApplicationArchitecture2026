const express = require("express");
const os = require("os");

const app = express();

// Generate unique instance ID (from environment or hostname)
const INSTANCE_ID = process.env.INSTANCE_ID || os.hostname();
const START_TIME = Date.now();
let requestCount = 0;

// CORS middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Middleware to inject X-Instance-Id header in all responses
app.use((req, res, next) => {
    res.setHeader('X-Instance-Id', INSTANCE_ID);
    requestCount++;
    next();
});

const port = process.env.PORT || 3005;

// Health check endpoint for ALB
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "healthy",
        timestamp: Date.now(),
        instanceId: INSTANCE_ID
    });
});

app.use("/tasks", require("./routes/tasks"));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Instance ID: ${INSTANCE_ID}`);
});