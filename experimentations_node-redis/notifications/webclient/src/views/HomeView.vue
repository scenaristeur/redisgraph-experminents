<template>
  <div class="home">
    <YjsExper />
    <EditorSimple />
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import EditorSimple from '@/components/EditorSimple.vue'
import YjsExper from '@/components/YjsExper.vue'

export default {
  name: 'HomeView',
  components: {
    // HelloWorld,
    EditorSimple,
    YjsExper
  }
}
</script>
