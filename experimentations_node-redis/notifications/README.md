cd notif-server
npm install
node server.js


cd webclient
npm install
npm run serve




integer) 0
127.0.0.1:6379> PUBLISH app:notifications  "message from Redis2"
(integer) 1
127.0.0.1:6379> PUBLISH app:notifications  "message from Redis2"
(integer) 1
127.0.0.1:6379> SUBSCRIBE app:notifications
Reading messages... (press Ctrl-C to quit)
1) "subscribe"
2) "app:notifications"
3) (integer) 1
^[[A^[[B1) "message"
2) "app:notifications"
3) "new connection from websocket bridge"
1) "message"
2) "app:notifications"
3) "new connection from websocket bridge"

127.0.0.1:6379> SUBSCRIBE channel
Reading messages... (press Ctrl-C to quit)
1) "subscribe"
2) "channel"
3) (integer) 1
1) "message"
2) "channel"
3) "a cool message"





notif-server$ node server.js
WebSocket server started at ws://locahost:3000
message from Redis2
message makebueno
received: coucou
message bien
message bien
