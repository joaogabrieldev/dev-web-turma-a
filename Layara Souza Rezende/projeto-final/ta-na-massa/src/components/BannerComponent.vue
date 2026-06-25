<template>
  <div id="main-banner" :style="{ backgroundImage: 'url(/img/banner.png)' }">
    <div id="banner-text">
      <img src="/img/logo_tanamassa.png" width="256" height="auto" id="banner-logo" alt="Tá na Massa" />
      <div id="banner-copy">
        <h1>Pizza artesanal</h1>
        <p>Ingredientes frescos, sabor de verdade</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "BannerComponent",
};
</script>
<style scoped>
#main-banner {
  width: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  aspect-ratio: 16 / 9;
}

#banner-text {
  display: flex;
  align-items: center;
  gap: 18px;
  background: rgba(46, 125, 50, 0.88);
  /* padding: 22px 40px 22px 24px; */
  border-radius: 100px 0px 0px 100px;
  border-left: 5px solid #c62828;
}

#banner-logo {
  width: 200px;
  height: 200px;
  object-fit: cover;
  flex-shrink: 0;
}

#banner-copy h1 {
  font-size: 38px;
  color: #fff8e7;
  margin: 0 0 4px 0;
  font-family: Georgia, serif;
}

#banner-copy p {
  font-size: 16px;
  color: #ffffff;
  margin: 0;
  letter-spacing: 1px;
}
</style>
