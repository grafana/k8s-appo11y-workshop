# room-availability

This README provides instructions to build and run the room-availability using Docker.

## env vars for otel

OTLP to agent

```bash 
export OTEL_METRICS_EXPORTER="otlp"
export OTEL_LOGS_EXPORTER="otlp"
export OTEL_TRACES_EXPORTER="otlp"
export OTEL_EXPORTER_OTLP_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4318"
export OTEL_SERVICE_NAME="room-availability"
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

To build the Docker image for the room-availability, run the following command:

```sh
docker rmi alainpham/room-availability
docker build -t alainpham/room-availability .
```

## Pushing to repository

```sh
docker push alainpham/room-availability
```

## Running the Docker Container

To run the Docker container, use the following command:

```sh
docker run --rm -p 8080:8080 --name room-availability alainpham/room-availability
```

## Stopping the Docker Container

To stop the running container, use the following command:

```sh
docker stop room-availability
```

## Removing the Docker Container

To remove the stopped container, use the following command:

```sh
docker rm room-availability
```

## Deploy on kube

```sh
kubectl create ns apps
kubectl -n apps apply -f deploy.yaml
```