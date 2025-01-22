export CONTAINER_REGISTRY=grafana
export PROJECT_ARTIFACTID=k6
export PROJECT_VERSION=0.56.0
export BASE_URL=http://business-hub:8080

envsubst < broker.envsubst.yaml | kubectl apply -f -
envsubst < broker.envsubst.yaml | kubectl delete -f -

docker run --rm -i \
    ${CONTAINER_REGISTRY}/${PROJECT_ARTIFACTID}:${PROJECT_VERSION} \
    run \
    - < script.js

docker run --rm -i \
    -e BASE_URL=http://business-hub:8080 \
    --net mainnet \
    ${CONTAINER_REGISTRY}/${PROJECT_ARTIFACTID}:${PROJECT_VERSION} run  \
    --duration 5s \
    --vus 1 \
    - < script.js

docker run --rm -i \
    -e BASE_URL=http://business-hub:8080 \
    --net mainnet \
    ${CONTAINER_REGISTRY}/${PROJECT_ARTIFACTID}:${PROJECT_VERSION} run  \
    - < script.js

