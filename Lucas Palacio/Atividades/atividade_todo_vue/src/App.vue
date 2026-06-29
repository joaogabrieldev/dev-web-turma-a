<template> #a 
  <Component_to_do></Component_to_do>
</template>

<script>

import Component_to_do from './components/Component_to_do.vue';

export default {
  name: 'App',
  components: {
    Component_to_do,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
