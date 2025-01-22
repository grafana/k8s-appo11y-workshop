Create new project

```sh
rm project-service-name.zip
zip -r project-service-name.zip project-service-name -x '*node_modules*'
node create-service.js project-service-name.zip project-service-name booking-hub
node create-service.js project-service-name.zip project-service-name room-availability
node create-service.js project-service-name.zip project-service-name booking-notification
node create-service.js project-service-name.zip project-service-name sms-channel
node create-service.js project-service-name.zip project-service-name email-channel
```

run locally 
```sh 
docker network create --driver=bridge --subnet=172.20.0.0/16 --gateway=172.20.0.1 mainnet

docker run --rm -d --net mainnet -p 7080:8080 --name room-availability alainpham/room-availability
docker run --rm -d --net mainnet -p 7081:8080 --name booking-notification alainpham/booking-notification
docker run --rm -d --net mainnet -p 7082:8080 --name email-channel alainpham/email-channel
docker run --rm -d --net mainnet -p 7083:8080 --name sms-channel alainpham/sms-channel
docker run --rm -d --net mainnet -p 8080:8080 --name booking-hub alainpham/booking-hub

docker stop room-availability
docker stop booking-notification
docker stop email-channel
docker stop sms-channel
docker stop booking-hub
```