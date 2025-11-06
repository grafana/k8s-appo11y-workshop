from flask import Flask, request
import logging
import os
import json
import requests
import random
import time

app = Flask(__name__)
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Environment variables with defaults
EMAIL_CHANNEL_URL = os.getenv('EMAIL_CHANNEL_URL', 'http://email-channel:8080')
SMS_CHANNEL_URL = os.getenv('SMS_CHANNEL_URL', 'http://sms-channel:8080')


# Failure rates and response times with defaults
DBCONNECTION_FAILURE_RATE = float(os.getenv('DBCONNECTION_FAILURE_RATE', '5'))
STORAGELIMIT_FAILURE_RATE = float(os.getenv('STORAGELIMIT_FAILURE_RATE', '2'))
OK_RESPONSE_TIME_MS = float(os.getenv('OK_RESPONSE_TIME_MS', '20'))
ERROR_RESPONSE_TIME_MS = float(os.getenv('ERROR_RESPONSE_TIME_MS', '100'))



@app.route("/notify", methods=["POST"])
def notify():
    booking = request.get_json()
    logger.info(f"Received notification request: {json.dumps(booking)}")

    db_connection_failed = (random.randint(1, 100)) < DBCONNECTION_FAILURE_RATE
    storage_limit_failed = (random.randint(1, 100)) < STORAGELIMIT_FAILURE_RATE
    time.sleep(OK_RESPONSE_TIME_MS / 1000.0)

    if db_connection_failed:
        time.sleep(ERROR_RESPONSE_TIME_MS / 1000.0)
        logger.error("Exceeded maximum number of allowed database connections. Try again later.")
        return {"message": "Exceeded maximum number of allowed database connections. Try again later."}, 500

    if storage_limit_failed:
        time.sleep(ERROR_RESPONSE_TIME_MS / 1000.0)
        logger.error("Exceeded storage limit. Try again later.")
        return {"message": "Exceeded storage limit. Try again later."}, 500

    try:
        # Send email notification
        email_response = requests.post(f"{EMAIL_CHANNEL_URL}/email", json=booking)
        logger.info(f"Email notification sent: {email_response.json()}")
    except Exception as e:
        logger.error(f"Error sending email notification: {str(e)}")
        return {"message": "Error sending email notification."}, 500
 

    try:
        # Send SMS notification
        sms_response = requests.post(f"{SMS_CHANNEL_URL}/sms", json=booking)
        logger.info(f"SMS notification sent: {sms_response.json()}")
    except Exception as e:
        logger.error(f"Error sending SMS notification: {str(e)}")
        return {"message": "Error sending SMS notification."}, 500

    return {"message": "Notification registered successfully", "booking": booking}, 200
