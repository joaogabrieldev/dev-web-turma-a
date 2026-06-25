<template>
  <div>
    <nav id="nav">
      <router-link to="/" id="logo-url">
        <img src="/img/acai_premium.webp" id="logo" alt="Logo Açaíteria" />
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
  width: 60px;
  height: 60px;
  border-radius: 50%; /* Deixa o logo perfeitamente redondo */
  object-fit: cover;  /* Impede que a imagem do açaí fique esticada ou amassada */
  transition: transform 0.3s ease, width 0.3s ease, height 0.3s ease;
}

#logo:hover {
  width: 70px;
  height: 70px;
  transform: rotate(360deg); /* Substituído "rotate" puro por transform para maior compatibilidade */
}

#nav #logo-url {
  margin: auto;
  margin-left: 0;
  display: flex;
  align-items: center;
}

#nav {
  background-color: #333;
  border-bottom: darkgoldenrod 4px solid;
  padding: 15px 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

#nav a {
  color: darkgoldenrod;
  text-decoration: none;
  margin-left: 20px;
  font-size: 18px;
  transition: all 0.2s ease;
}

#nav a:hover {
  color: white;
  font-size: 22px;
}
</style>