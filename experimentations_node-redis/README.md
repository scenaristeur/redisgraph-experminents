# prerequis

- redisgraph
- optionnal redisinsight

```
docker run --name redisgraph --rm --network host -p 6379:6379 -it -v redis-data:/data redislabs/redisgraph:edge
docker run --name redisinsight --rm --network host -v redisinsight:/db -p 8001:8001 redislabs/redisinsight:latest
```

# nodejs

`node basic.js`

# browser
- necessite  un websocket-bridge car redis ne communique pas en http -> voir dossier notifications
```
npx http-serve
```

idee :
use rgc in console : ` window.rgc` exemple `window.rgc.init()``
