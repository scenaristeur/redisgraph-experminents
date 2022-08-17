<template>
  <div class="">


    yMap: {{ymap}}

    <hr>
    <input v-model="newName" placeholder="name of the new node" />
    <button @click="addNodeToMap">Add node to map</button>
    <button @click="clearMap">clear map</button>
    <button @click="populateMap">populate map</button>
    <input v-model="newStuff" placeholder="name of the stuff" />
    <button @click="changeStuff">change stuff</button>


    <hr><hr>
    yarray : {{yarray}}
    <button @click="clear">clear</button>
    <hr>
    <input v-model="newVal" type="number" placeholder="number, ex: 0 or 10" />
    <button @click="addToArray">Add</button>

    <hr>
    <input v-model="newName" placeholder="name of the new node" />
    <button @click="addNode">Add Node (does not work adding an object to an array)</button>

  </div>
</template>

<script>
// https://github.com/yjs/yjs/blob/main/tests/y-map.tests.js
//https://github.com/yjs/yjs#shared-types
import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'
import { WebsocketProvider } from 'y-websocket'
import { IndexeddbPersistence } from 'y-indexeddb'
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'YjsExper',
  data(){
    return{
      yarray: null,
      newVal: 3,
      newName: '',
      ymap: null,
      newStuff: 'c4'
    }
  },
  created(){
    const ydoc = new Y.Doc()

    // this allows you to instantly get the (cached) documents data
    const indexeddbProvider = new IndexeddbPersistence('count-demo', ydoc)
    indexeddbProvider.whenSynced.then(() => {
      console.log('loaded data from indexed db')
    })

    // Sync clients with the y-webrtc provider.
    const webrtcProvider = new WebrtcProvider('count-demo', ydoc)

    // Sync clients with the y-websocket provider
    const websocketProvider = new WebsocketProvider(
      'wss://demos.yjs.dev', 'count-demo', ydoc
    )
    console.log("providers", webrtcProvider, websocketProvider)

    // array of numbers which produce a sum
    this.yarray = ydoc.getArray('count')

    this.ymap = ydoc.getMap('test-map2')

    // observe changes of the sum
    // let app = this
    this.yarray.observe(event => {
      console.log(event)
      // print updates when the data changes
      console.log(this.yarray.toJSON())
      // console.log('new sum: ' + this.yarray.toArray().reduce((a,b) => a + b))
    })
    let calls = 0
    this.ymap.observeDeep(events => {
      events.forEach(event => {
        calls++
        console.log('calls', calls)
        // @ts-ignore
        console.log(event.keysChanged.has('deepmap'))
        console.log(event.path.length === 1)
        console.log(event.path[0] === 'map')
        // @ts-ignore
        // let dmapid = event.target.get('deepmap')._item.id
        // console.log(dmapid)
        console.log(event, event)
      })
      this.$forceUpdate();
    })

    // add 1 to the sum
    this.yarray.push([2]) // => "new sum: 1"
    this.populateMap()

  },
  methods:{
    addToArray(){
      this.yarray.push([this.newVal])
      this.newVal = '1'
    },
    clear(){
      this.yarray.delete(0, this.yarray.length)
    },
    addNode(){
      let node = {id: "ered", name: "er", created: "frt"}
      console.log("does not work!", node)
      this.yarray.push(node)
      this.newName = ''
    },
    addNodeToMap(){
      let node = {id: uuidv4(), name: this.newName, created: Date.now()}
      this.ymap.set(node.id, node)
      this.newName = ''
      this.$forceUpdate();
    },
    clearMap(){
      this.ymap.clear()
      this.$forceUpdate();
    },
    populateMap(){
      this.ymap.set('map', new Y.Map())
      const _map3 = this.ymap.get('map')
      _map3.set('deepmap', new Y.Map())
      this.ymap.set('stuff one', 'c2')
      _map3.set('stuff', 'c3')
    },
    changeStuff(){
      const _map3 = this.ymap.get('map')
      _map3.set('stuff', this.newStuff)
      this.newStuff= 'c4'
      this.$forceUpdate();
    }
  }


}
</script>

<style lang="css" scoped>
. {

}
</style>
