<template>
  <div id="main-banner">
    <h1>Açaí Delicioso</h1>
  </div>
</template>

<script>
export default {
  name: "BannerComponent",
};
</script>

<style scoped>
#main-banner {
  /* Atualizado para uma imagem espetacular e nítida de açaí no topo */
  background-image: url("https://imgs.search.brave.com/d71YuH7UqZg6LVVV5H2pnyMfuFsMttM6-pfvaBdSSnc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9uYXR1/cmFsYnJhc2lsLmNv/bS5ici93cC1jb250/ZW50L3VwbG9hZHMv/MjAxOC8wNS9jb21v/LWZhemVyLWNyZW1l/LWRlLWN1cHVhY3Ut/cGFyYS1hY29tcGFu/aGFyLW8tYWNhaS1u/YXR1cmFsLWJyYXNp/bC0xMDE0eDQ4Ny5q/cGc");
  height: 300px;
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

#main-banner h1 {
  font-size: 40px;
  color: antiquewhite;
  background: #333;
  padding: 25px;
  border-radius: 100px 0px 0px 100px;
}
</style>