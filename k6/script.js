import http from 'k6/http';
import { check, sleep } from 'k6';

// Define the base URL of your API
const BASE_URL = __ENV.BASE_URL || 'http://booking-hub:8080';

// Define the options for your test
export let options = {
    stages: [
        { duration: '30s', target: 20 }, // Ramp up to 50 virtual users over 0.5 minute
        { duration: '2m', target: 50 }, // Stay at 50 virtual users for 2 minutes
        { duration: '30s', target: 0 }   // Ramp down to 0 virtual users over 0.5 minute
    ],
};

// Define the main function that represents your test scenario
export default function () {
    let body;
    let headers;
    let response;

    body = {
        "id": 0,
        "customerName": "alain",
        "bookingStartDate": "2023-12-10",
        "bookingEndDate": "2023-12-15",
        "hotel": "accor",
        "room": "3"
      };

    headers = {
        'Content-Type': 'application/json',
    };
    response = http.post(`${BASE_URL}/book`, JSON.stringify(body), { headers: headers });

    check(response, {
        'Status 20x': (r) => r.status === 200 || r.status === 201,
    });

    sleep(1);


    body = {
        "id": 0,
        "customerName": "alain",
        "bookingStartDate": "2023-12-10",
        "bookingEndDate": "2023-12-15",
        "hotel": "accor",
        "room": "5"
      };

    headers = {
        'Content-Type': 'application/json',
    };
    response = http.post(`${BASE_URL}/book`, JSON.stringify(body), { headers: headers });

    check(response, {
        'Status 20x': (r) => r.status === 200 || r.status === 201,
    });

    sleep(1);


    body = {
        "id": 0,
        "customerName": "alain",
        "bookingStartDate": "2023-12-01",
        "bookingEndDate": "2023-12-01",
        "hotel": "accor",
        "room": "5"
      };

    headers = {
        'Content-Type': 'application/json',
    };
    response = http.post(`${BASE_URL}/book`, JSON.stringify(body), { headers: headers });

    check(response, {
        'Status 20x': (r) => r.status === 200 || r.status === 201,
    });

    sleep(1);


}