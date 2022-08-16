- https://www.youtube.com/watch?v=aGHALjV6JGc

```
docker run --name redisgraph --rm --network host -p 6379:6379 -it -v redis-data:/data redislabs/redisgraph:edge
docker run --name redisinsight --rm --network host -v redisinsight:/db -p 8001:8001 redislabs/redisinsight:latest

```
or with redisgraph+ redisjson -> redis stack https://developer.redis.com/create/redis-stack

```
 docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 -v redis-data:/data redis/redis-stack:latest
```
et pour y acceder ` docker exec -it redis-stack redis-cli`


redis-cli : sudo apt install redis-tools

-> redisinsight : localhost:8001
-> redis-cli


GRAPH.LIST -> lister les graphs
--> commands : https://redis.io/commands/?group=graph

```
redis-cli
127.0.0.1:6379> GRAPH.QUERY MyFirstGraph "CREATE (hans:Person {name: 'Hans'})-[:loves]->(cheese:Food {name: 'cheese'})"
1) 1) "Labels added: 2"
2) "Nodes created: 2"
3) "Properties set: 2"
4) "Relationships created: 1"
5) "Cached execution: 0"
6) "Query internal execution time: 1.222970 milliseconds"
127.0.0.1:6379>

127.0.0.1:6379> GRAPH.QUERY MyFirstGraph "MATCH (x) RETURN x"
1) 1) "x"
2) 1) 1) 1) 1) "id"
2) (integer) 0
2) 1) "labels"
2) 1) "Person"
3) 1) "properties"
2) 1) 1) "name"
2) "Hans"
2) 1) 1) 1) "id"
2) (integer) 1
2) 1) "labels"
2) 1) "Food"
3) 1) "properties"
2) 1) 1) "name"
2) "cheese"
3) 1) "Cached execution: 0"
2) "Query internal execution time: 0.460316 milliseconds"

127.0.0.1:6379> GRAPH.QUERY MyFirstGraph "MATCH (x) RETURN x.name"
1) 1) "x.name"
2) 1) 1) "Hans"
2) 1) "cheese"
3) 1) "Cached execution: 0"
2) "Query internal execution time: 0.393201 milliseconds"

127.0.0.1:6379> GRAPH.QUERY MyFirstGraph "MATCH (x)-[:loves]->(y) RETURN x.name, y.name"
1) 1) "x.name"
2) "y.name"
2) 1) 1) "Hans"
2) "cheese"
3) 1) "Cached execution: 0"
2) "Query internal execution time: 0.442369 milliseconds"


```

# bulk loader
- https://github.com/redisgraph/redisgraph-bulk-loader
```
pip install redisgraph-bulk-loader

nano ~/.bashrc
export PATH="$HOME/.local/bin:$PATH"
source ~/.bashrc

redisgraph-bulk-insert GRAPH_DEMO -n example/Person.csv -n example/Country.csv -r example/KNOWS.csv -r example/VISITED.csv
Person  [####################################]  100%
14 nodes created with label 'Person'
Country  [####################################]  100%
13 nodes created with label 'Country'
KNOWS  [####################################]  100%
13 relations created for type 'KNOWS'
VISITED  [####################################]  100%
35 relations created for type 'VISITED'
Construction of graph 'GRAPH_DEMO' complete: 27 nodes created, 48 relations created in 0.007280 seconds

redis-cli
127.0.0.1:6379> GRAPH.QUERY GRAPH_DEMO "MATCH (x) RETURN x.name"
1) 1) "x.name"
2)  1) 1) "Roi Lipman"
2) 1) "Alon Fital"
3) 1) "Ailon Velger"
4) 1) "Ori Laslo"
5) 1) "Boaz Arad"
6) 1) "Omri Traub"
7) 1) "Tal Doron"
8) 1) "Lucy Yanfital"
9) 1) "Jane Chernomorin"
10) 1) "Shelly Laslo Rooz"
11) 1) "Valerie Abigail Arad"
12) 1) "Gal Derriere"
13) 1) "Mor Yesharim"
14) 1) "Noam Nativ"
15) 1) "USA"
16) 1) "Prague"
17) 1) "Japan"
18) 1) "Greece"
19) 1) "Canada"
20) 1) "China"
21) 1) "Amsterdam"
22) 1) "Andora"
23) 1) "Kazakhstan"
24) 1) "Russia"
25) 1) "Germany"
26) 1) "Italy"
27) 1) "Thailand"
3) 1) "Cached execution: 0"
2) "Query internal execution time: 0.146875 milliseconds"

```

# node-redis
see experimentations_node-redis folder

```
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
```


# pas de support htttp -> need websocket-redis bridge https://redis.com/blog/how-to-create-notification-services-with-redis-websockets-and-vue-js/

# voir redis nested json
- https://developer.redis.com/howtos/redisjson/storing-complex-json-document/
- https://developer.redis.com/howtos/redisjson/using-nodejs/
- et/ou jsonld playground format N-quads ou normalized
- https://redis.com/blog/index-and-query-json-docs-with-redis/
- https://github.com/redis/node-redis/blob/master/examples/search-json.js

Using the Redis MONITOR command, you can see the Redis commands that node-redis sent to the Redis server while running the application: redis-cli > monitor


- https://github.com/redis/node-redis
- https://github.com/redis/node-redis/tree/master/packages/graph
- pubsub https://github.com/redis/node-redis#pubsub
- client config https://github.com/redis/node-redis/blob/master/docs/client-configuration.md
- graph commands https://redis.io/commands/graph.query/

# build nodejs app https://developer.redis.com/create/docker/nodejs-nginx-redis/


# alternatives
- https://github.com/RedisGraph/redisgraph.js/tree/master
- https://github.com/danitseitlin/redis-modules-sdk-ts
- https://github.com/Jonahss/ioredisgraph


- https://github.com/redis/node-redis/blob/master/packages/graph/lib/test-utils.ts
```
import TestUtils from '@redis/test-utils';
import RedisGraph from '.';

export default new TestUtils({
  dockerImageName: 'redislabs/redisgraph',
  dockerImageVersionArgument: 'redisgraph-version',
  defaultDockerVersion: '2.8.15'
  });

  export const GLOBAL = {
    SERVERS: {
      OPEN: {
        serverArguments: ['--loadmodule /usr/lib/redis/modules/redisgraph.so'],
        clientOptions: {
          modules: {
            graph: RedisGraph
          }
        }
      }
    }
  };
  ```


  ----
  # redis OM ?
  - https://redis.io/docs/stack/get-started/tutorials/stack-node/


  - outdated https://joshdurbin.net/posts/2020-1-redis-graph-product-recommendation-part-1-data-loading/
