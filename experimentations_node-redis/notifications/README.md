cd notif-server
npm install
node server.js


cd webclient
npm install
npm run serve




integer) 0
127.0.0.1:6379> PUBLISH app:notifications  "message from Redis2"
(integer) 0
127.0.0.1:6379> PUBLISH app:notifications  "message from Redis2"
(integer) 0
127.0.0.1:6379> PUBLISH app:notifications  "message from Redis2"
(integer) 0
127.0.0.1:6379> PUBLISH app:notifications  "message from Redis2"
(integer) 0
127.0.0.1:6379> PUBLISH app:notifications  "message from Redis2"
(integer) 1
127.0.0.1:6379> PUBLISH app:notifications  "message makebueno"
(integer) 1
127.0.0.1:6379> PUBLISH app:notifications  "message bien"
(integer) 1
127.0.0.1:6379>
