import { WebSocketServer } from 'ws';

import { createClient } from 'redis';

const client = createClient();
// Configuration: adapt to your environment
const REDIS_SERVER = "redis://localhost:6379";
const WEB_SOCKET_PORT = 3000;

// Connect to Redis and subscribe to "app:notifications" channel
// var client = createClient(REDIS_SERVER);
const subscriber = client.duplicate();

  await subscriber.connect();


// console.log(redisClient)

const wss = new WebSocketServer({ port: WEB_SOCKET_PORT });

wss.on('connection', function connection(ws) {
  ws.send("welcome");
  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

    // broadcast on web socket when receving a Redis PUB/SUB Event
    subscriber.on('message', function(channel, message){
      console.log(message);
      ws.send(message);
    })

   subscriber.subscribe('app:notifications', (message) => {
      console.log(message); // 'message'
      ws.send(message);
    });


  ws.send('something');
});

// Create & Start the WebSocket server
// const ws = new WebSocket.Server({ port : WEB_SOCKET_PORT });
//
// // Register event for client connection
// server.on('connection', function connection(socket) {
//   // console.log(ws)
//   ws.send("welcome");
//   ws.onmessage = ({data}) => {
//     console.log(data);
//   }
//   // broadcast on web socket when receving a Redis PUB/SUB Event
//   redisClient.on('message', function(channel, message){
//     console.log(message);
//     ws.send(message);
//   })
//
// });

console.log("WebSocket server started at ws://locahost:"+ WEB_SOCKET_PORT);
