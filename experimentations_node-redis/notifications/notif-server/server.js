import { WebSocketServer } from 'ws';

import { createClient } from 'redis';

const client = createClient();
// Configuration: adapt to your environment
const REDIS_SERVER = "redis://localhost:6379";
const WEB_SOCKET_PORT = 3000;

// Connect to Redis and subscribe to "app:notifications" channel
// var client = createClient(REDIS_SERVER);

client.connect()
const subscriber = client.duplicate();

await subscriber.connect();

await subscriber.subscribe('channel', (message) => {
  console.log(message); // 'message'
});

await subscriber.pSubscribe('channe*', (message, channel) => {
  console.log(message, channel); // 'message', 'channel'
});

client.publish('channel', 'a cool message');
// await subscriber.unsubscribe('channel');
//
// await subscriber.pUnsubscribe('channe*');

// const article = {
//   id: '123456',
//   name: 'Using Redis Pub/Sub with Node.js',
//   blog: 'Logrocket Blog',
// };
// console.log(redisClient)

const wss = new WebSocketServer({ port: WEB_SOCKET_PORT });

wss.on('connection', function connection(ws) {
  ws.send("welcome");

  client.publish('app:notifications', 'new connection from websocket bridge');
  // client.publish('app:notifications', article);


  ws.on('message', async function message(data) {
    data = JSON.parse(data)
    if(data.type == "QUERY"){
      console.log("ohohohoh, a query", data)
      let res = await client.graph.query(data.graph, data.query );

      console.log("res", res)
      data.type= "resultat",
      data.res = res
      data.end = Date.now()
      ws.send(JSON.stringify(data))
    }else{
      console.log('received: %s', data);
    }

  });

  // broadcast on web socket when receving a Redis PUB/SUB Event
  subscriber.on('message', function(channel, message){
    console.log('avec on',message);
    ws.send(message);
  })

  subscriber.subscribe('app:notifications', (message) => {
    console.log('app:notif',message); // 'message'
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
