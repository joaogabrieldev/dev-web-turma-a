<template>
  <div class="container-principal">
    <div id="app-box">
      <h2>Minhas Tarefas</h2>
      
      <AllComponents />
      
    </div>
  </div>
</template>

<script>

import AllComponents from './components/AllComponents.vue';

export default {
  name: 'App',
  components: {
    AllComponents
  }
}
</script>

<style>

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #1e1e2f; 
  color: #ffffff;
}

.container-principal {
  display: flex;
  justify-content: center;
  padding-top: 50px;
  height: 100vh;
}

#app-box {
  background-color: #2a2a40;
  padding: 30px;
  border-radius: 15px;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.5);
  height: fit-content;
}

h2 {
  color: #4facfe;
  text-align: center;
  margin-bottom: 25px;
  font-size: 28px;
}
</style>