<template>
  <div>
    <nav id="nav">
      <router-link to="/" id="logo-url">
        <span id="logo">🍕 La Forneria</span>
      </router-link>
      <router-link to="/">Home</router-link> |
      <router-link to="/menu">Menu</router-link> |
      <router-link to="/pedidos">Pedidos</router-link>
    </nav>
  </div>
</template>
<script>
export default {
  name: "NavBarComponent",
};
</script>
<style scoped>
#logo {
  font-size: 26px;
  font-weight: bold;
  color: #fff8f0;
  white-space: nowrap;
}

#logo:hover {
  color: #1e8449;
  transition: 0.2s;
}

#nav #logo-url {
  margin: auto;
  margin-left: 0;
  text-decoration: none;
}

#nav {
  background-color: #2c2c2c;
  border-bottom: #c0392b 4px solid;
  padding: 15px 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

#nav a {
  color: #c0392b;
  text-decoration: none;
  margin-left: 20px;
  font-size: 18px;
}

#nav a:hover {
  color: #fff8f0;
  font-size: 22px;
  transition: 0.2s;
}
</style>
