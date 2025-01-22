const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const api = require('@opentelemetry/api');
const axios = require('axios');

// add the prometheus middleware to all routes
const app = express();
const PORT = 8080;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../public"))); // Serve static files


app.get("/ping", (req, res) => {
    traceIdString = getCurrentTraceIdString();
    console.log(traceIdString+"Received ping");
    res.status(200).json({ message: "pong" });
});

const EMAIL_CHANNEL_URL = process.env.EMAIL_CHANNEL_URL || "http://email-channel:8080";
const SMS_CHANNEL_URL = process.env.SMS_CHANNEL_URL || "http://sms-channel:8080";


app.post("/notify", (req, res) => {
    
    traceIdString = getCurrentTraceIdString();

    const booking = req.body;
    console.log(traceIdString+"Received notification request:", JSON.stringify(booking));

    axios.post(EMAIL_CHANNEL_URL + '/email', booking)
        .then(response => {
            console.log(traceIdString + "Email notification sent:", JSON.stringify(response.data));
        })
        .catch(error => {
            console.error(traceIdString + "Error sending email notification:", JSON.stringify(error));
        });

    axios.post(SMS_CHANNEL_URL + '/sms', booking)
        .then(response => {
            console.log(traceIdString + "SMS notification sent:", JSON.stringify(response.data));
        })
        .catch(error => {
            console.error(traceIdString + "Error sending SMS notification:", JSON.stringify(error));
        });

    res.status(200).json({ message: "Notification registerd successfully", booking });
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

function getCurrentTraceIdString(){
    let current_span = api.trace.getSpan(api.context.active());
    let traceIdString = "";
    if (current_span) {
        traceIdString = "trace_id="+current_span.spanContext().traceId + " ";
    }
    return traceIdString;
}