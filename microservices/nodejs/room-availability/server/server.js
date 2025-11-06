const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const api = require('@opentelemetry/api');
const os = require('os');



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

const ROOM_AVAILABLE_RATE= process.env.ROOM_AVAILABLE_RATE || 80;

const DBCONNECTION_FAILURE_RATE = process.env.DBCONNECTION_FAILURE_RATE || 5;
const STORAGELIMIT_FAILURE_RATE = process.env.STORAGELIMIT_FAILURE_RATE || 2;
const OK_RESPONSE_TIME_MS = process.env.OK_RESPONSE_TILE || 20;
const ERROR_RESPONSE_TIME_MS = process.env.OK_RESPONSE_TILE || 100;
const numCores = os.cpus().length;
const availableParallelism = os.availableParallelism();

app.post("/check-availability", (req, res) => {

    //get trace id
    let current_span = api.trace.getSpan(api.context.active());
    let traceIdString = "";
    if (current_span) {
        traceIdString = "trace_id="+current_span.spanContext().traceId + " ";
    }


    const booking = req.body;
    console.log(traceIdString + "Received booking:", JSON.stringify(booking));
    
    console.log(traceIdString + "Processing Booking availability calculations");

    const startCpuTime = Date.now();
    // DO the thing here
    consumeCpu(OK_RESPONSE_TIME_MS);
    const endCpuTime = Date.now();
    console.log(traceIdString + "Booking availability calculations completed in " + (endCpuTime - startCpuTime) + "ms");

    const roomAvailable = (Math.floor(Math.random() * 100) + 1) < ROOM_AVAILABLE_RATE;
    const dbConnectionFailed = (Math.floor(Math.random() * 100) + 1) < DBCONNECTION_FAILURE_RATE;
    const storageLimitFailed = (Math.floor(Math.random() * 100) + 1) < STORAGELIMIT_FAILURE_RATE;

    if (dbConnectionFailed) {
        consumeCpu(ERROR_RESPONSE_TIME_MS);
        console.error(traceIdString + "Exceeded maximum number of allowed database connections. Try again later.");
        if (current_span){
            current_span.addEvent("Exceeded DB connections");
            current_span.setAttribute("errorLabel","exceeded_db_connections");
        }
        return res.status(500).json({ message: "Exceeded maximum number of allowed database connections. Try again later." });
    }

    if (storageLimitFailed) {
        consumeCpu(ERROR_RESPONSE_TIME_MS);
        console.error(traceIdString+"Exceeded storage limit. Try again later.");
        if (current_span){
            current_span.addEvent("Exceeded storage limit");
            current_span.setAttribute("errorLabel","exceeded_storage_limit");
        }
        return res.status(500).json({ message: "Exceeded storage limit. Try again later." });
    }

    if (roomAvailable) {
        //room is available
        console.log(traceIdString+"Room is available");
        if (current_span){
            current_span.setAttribute("available","yes");
        }
        return res.status(200).json({ available: true, booking });
    }else
    {
        //room is not available
        console.log(traceIdString+"Room is busy");
        if (current_span){
            current_span.setAttribute("available","false");
        }
        return res.status(200).json({ avialable: false, booking });
    }
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



/**
 * Consumes a specific percentage of CPU for a given duration.
 * 
 * @param {number} timeMs - The total time in milliseconds to run the CPU load.
 * @param {number} cpuPercentage - The percentage of CPU to consume (0-100).
 */
function consumeCpu(timeMs) {

    const endTime = Date.now() + timeMs;

    while (Date.now() < endTime) {
        // consumes cpu
    }


}