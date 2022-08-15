// import { createClient } from 'redis';

// import { createClient } from '../node_modules/@redis/client/dist/index.js';

class RedisGraphClient extends createClient(){

  init(){
    window.rgc = this
    console.log('redis-graph-client initialized, use window.rgc')
  }
}

export default new RedisGraphClient()
