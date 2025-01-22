# booking-hub

This README provides instructions to build and run the booking-hub using Docker.

## env vars for otel

```bash 
export OTEL_METRICS_EXPORTER="otlp"
export OTEL_LOGS_EXPORTER="otlp"
export OTEL_TRACES_EXPORTER="otlp"
export OTEL_EXPORTER_OTLP_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4318"
export OTEL_SERVICE_NAME="booking-hub"
export NODE_OPTIONS="--require @opentelemetry/auto-instrumentations-node/register"
```

## Prerequisites

- Docker installed on your machine
- Docker Compose installed on your machine

## Running locally for dev

```sh
npm install 
node server/server.js
```


## Building the Docker Image

To build the Docker image for the booking-hub, run the following command:

```sh
docker rmi alainpham/booking-hub
docker build -t alainpham/booking-hub .
```

## Pushing to repository

```sh
docker push alainpham/booking-hub
```

## Running the Docker Container

To run the Docker container, use the following command:

```sh
docker run --rm -p 8080:8080 --name booking-hub alainpham/booking-hub
```

## Stopping the Docker Container

To stop the running container, use the following command:

```sh
docker stop booking-hub
```

## Removing the Docker Container

To remove the stopped container, use the following command:

```sh
docker rm booking-hub
```

## Deploy on kube

```sh
kubectl create ns apps
kubectl -n apps apply -f deploy.yaml
```