from flask import Flask, request, jsonify
import logging

app = Flask(__name__)

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(message)s")

@app.route('/', defaults={'path': ''}, methods=['GET', 'POST', 'PUT', 'DELETE', 'PATCH'])
@app.route('/<path:path>', methods=['GET', 'POST', 'PUT', 'DELETE', 'PATCH'])
def catch_all(path):
    # Capture request details
    headers = dict(request.headers)
    args = request.args.to_dict()
    try:
        data = request.get_json(force=True, silent=True)
    except Exception:
        data = None

    log_entry = {
        "path": path,
        "method": request.method,
        "headers": headers,
        "args": args,
        "json": data
    }
    logging.info(f"Received request: {log_entry}")

    # Respond with what was received
    return jsonify(log_entry)