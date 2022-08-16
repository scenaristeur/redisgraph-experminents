<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <h3>
      message:  {{message}}
    </h3>
    <hr>
    <b-container>
      <b-input v-model="humain1" placeholder="Humain1" /> knows     <b-input v-model="humain2" placeholder="Humain2" />
      <b-button @click="testCreate">Test Create</b-button>
    </b-container>
    <b-button @click="testMatch">Test Match</b-button>
    <hr>
    <router-view/>


    <hr/>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      message: "df",
      ws: null,
      humain1: "",
      humain2: ""
    }
  },
  created(){
    try {
      this.ws = new WebSocket("ws://localhost:3000/");
      this.ws.onopen = () =>{
        this.ws.send(JSON.stringify({message: 'coucou'}))
      }
      this.ws.onmessage = ({data}) => {
        this.message =  data;
        console.log(this.message);
      }
    } catch(err) {
      console.log(err);
    }
  },
  methods: {
    testCreate(){
      this.ws.send(JSON.stringify({type: "QUERY", graph:"GRAPH_DEMO", query:"CREATE (r:Human {name:'"+this.humain1+"' , age:34}), (a:Human {name:'"+this.humain2+"', age:32}), (r)-[:knows]->(a)", start: Date.now()}))
    },
    testMatch(){
      this.ws.send(JSON.stringify({type: "QUERY", graph:"GRAPH_DEMO", query:"MATCH (x) RETURN x.name", start: Date.now()}))
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
}

nav {
  padding: 30px;
    text-align: center;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
