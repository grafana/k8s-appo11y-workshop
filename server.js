const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const promBundle = require("express-prom-bundle");
// Add the options to the prometheus middleware most option are for http_request_duration_seconds histogram metric
const metricsMiddleware = promBundle({
    includeMethod: true,
    includePath: true,
    includeStatusCode: true,
    includeUp: true,
    promClient: {
        collectDefaultMetrics: {
        }
    }
});
// add the prometheus middleware to all routes
const app = express();
const PORT = 8080;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../public"))); // Serve static files
app.use(metricsMiddleware)


app.get("/ping", (req, res) => {
    res.status(200).json({ message: "pong" });
});

app.post("/book", (req, res) => {
    const booking = req.body;
    console.log("Received booking:", booking);

    //check availability
    if (false) {
        return res.status(409).json({ message: "Booking not available" });
    }

    // Here you can add code to save the booking to a database or perform other actions
    res.status(201).json({ message: "Booking created successfully", booking });
});

// Start the server
server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



//gracefull shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received.');
    server.close(() => {
        console.log('Closed out remaining connections');
        // Additional cleanup tasks go here
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT signal received.');
    server.close(() => {
        console.log('Closed out remaining connections');
        // Additional cleanup tasks go here
    });
});
