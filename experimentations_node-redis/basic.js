import { createClient } from 'redis';

const client = createClient();

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
