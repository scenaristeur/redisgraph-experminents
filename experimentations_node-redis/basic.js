import { createClient } from 'redis';

const client = createClient();

// or with config https://github.com/redis/node-redis/blob/3547b2029397c3cad4fd41d8eb5bafc43fe05ad4/docs/client-configuration.md
// createClient({
//   url: 'redis://alice:foobared@awesome.redis.server:6380'
// });

client.on('error', (err) => console.log('Redis Client Error', err));

await client.connect();

await client.set('key', 'value');
const value = await client.get('key');
console.log("get value",value)

let res = await client.graph.query('GRAPH_DEMO',
"CREATE (r:human {name:'roi', age:34}), (a:human {name:'amit', age:32}), (r)-[:knows]->(a)"
);

console.log("res", res)

let match = await client.graph.query('GRAPH_DEMO',
"MATCH (x) RETURN x.name"
);

console.log("match", match)
