<template>
  <div id="app">
    <Login msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import Login from './components/Login.vue'

export default {
  name: 'app',
  components: {
    Login,
  },
}
</script>

<style>
#app {
  min-width: 1300px;
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
