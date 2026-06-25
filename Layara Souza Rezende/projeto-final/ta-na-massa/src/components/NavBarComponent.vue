<template>
  <div>
    <nav id="nav">
      <router-link to="/" id="logo-url">
        <img src="/img/Logotipo-sembg.png" id="logo" alt="Tá na Massa" />
      </router-link>
      <router-link to="/">Home</router-link>
      <router-link to="/menu">Cardápio</router-link>
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
  height: 110px;
  width: auto;
  object-fit: contain;
  transition: transform 0.4s ease;
}

#logo-url:hover #logo {
  transform: scale(1.05);
}

#nav #logo-url {
  margin: auto;
  margin-left: 0;
  display: flex;
  align-items: center;
  text-decoration: none;
}

#nav {
  background-color: #2e7d32;
  border-bottom: #c62828 4px solid;
  padding: 6px 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

#nav a {
  color: #ffffff;
  text-decoration: none;
  margin-left: 20px;
  font-size: 18px;
  font-weight: 500;
}

#nav a:hover {
  color: #fff8e7;
  font-size: 22px;
  transition: 0.2s;
}

#nav a.router-link-exact-active {
  color: #fff8e7;
  border-bottom: 2px solid #fff8e7;
}
</style>
