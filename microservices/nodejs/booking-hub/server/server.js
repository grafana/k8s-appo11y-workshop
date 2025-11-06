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

const ROOM_AVAILABILITY_URL = process.env.ROOM_AVAILABILITY_URL || "http://room-availability:8080";
const BOOKING_NOTIFICATION_URL = process.env.BOOKING_NOTIFICATION_URL || "http://booking-notification:8080";

app.post("/book", (req, res) => {

    traceIdString = getCurrentTraceIdString();

    const booking = req.body;
    console.log(traceIdString+"Received booking:", JSON.stringify(booking));

    //check availability
    axios.post(ROOM_AVAILABILITY_URL+'/check-availability', booking)
        .then(response => {
            if (!response.data.available) {
                console.log(traceIdString+"Booking not available");
                return res.status(200).json({ message: "Booking not available" });
            }
            // Here you can add code to save the booking to a database or perform other actions


            axios.post(BOOKING_NOTIFICATION_URL+'/notify', booking)
                .then(notificationResponse => {
                    console.log(traceIdString + "Notification registered successfully");
                })
                .catch(notificationError => {
                    console.error(traceIdString + "Error registering notification:", notificationError);
                });


            console.log(traceIdString+"Booking created successfully");
            res.status(201).json({ message: "Booking created successfully", booking });
        })
        .catch(error => {
            console.error(traceIdString+"Error checking availability");
            res.status(500).json({ message: "Error checking availability" });
        });
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