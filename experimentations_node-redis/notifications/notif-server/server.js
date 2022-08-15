import { WebSocketServer } from 'ws';

import { createClient, SchemaFieldTypes } from 'redis';

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


async function test_json(){


  // Create an index.
  // https://redis.io/commands/ft.create/
  try {
    await client.ft.create('idx:users', {
      '$.name': {
        type: SchemaFieldTypes.TEXT,
        SORTABLE: 'UNF'
      },
      '$.age': {
        type: SchemaFieldTypes.NUMERIC,
        AS: 'age'
      },
      '$.coins': {
        type: SchemaFieldTypes.NUMERIC,
        AS: 'coins'
      },
      '$.email': {
        type: SchemaFieldTypes.TAG,
        AS: 'email'
      }
    }, {
      ON: 'JSON',
      PREFIX: 'noderedis:users'
    });
  } catch (e) {
    if (e.message === 'Index already exists') {
      console.log('Index exists already, skipped creation.');
    } else {
      // Something went wrong, perhaps RediSearch isn't installed...
      console.error(e);
      process.exit(1);
    }
  }


  // Add some users.
  // https://redis.io/commands/json.set/
  await Promise.all([
    client.json.set('noderedis:users:1', '$', {
      name: 'Alice',
      age: 32,
      coins: 100,
      email: 'alice@nonexist.com'
    }),
    client.json.set('noderedis:users:2', '$', {
      name: 'Bob',
      age: 23,
      coins: 15,
      email: 'bob@somewhere.gov'
    })
  ]);

  // Search all users under 30
  console.log('Users under 30 years old:');
  console.log(
    // https://redis.io/commands/ft.search/
    JSON.stringify(
      await client.ft.search('idx:users', '@age:[0 30]'),
      null,
      2
    )
  );
  // {
  //   "total": 1,
  //   "documents": [
  //     {
  //       "id": "noderedis:users:2",
  //       "value": {
  //         "name": "Bob",
  //         "age": 23,
  //         "coins": 15,
  //         "email": "bob@somewhere.gov"
  //       }
  //     }
  //   ]
  // }
}

test_json()


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
