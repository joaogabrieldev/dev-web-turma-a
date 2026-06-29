<template>
  <div id="main-banner">
    <h1>A autêntica pizza italiana, direto do forno a lenha 🍕</h1>
  </div>
</template>
<script>
export default {
  name: "BannerComponent",
};
</script>
<style scoped>
#main-banner {
  background-color: #c0392b;
  background-image: linear-gradient(
      rgba(44, 44, 44, 0.35),
      rgba(192, 57, 43, 0.45)
    ),
    url("https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80");
  height: 300px;
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

#main-banner h1 {
  font-size: 36px;
  max-width: 60%;
  text-align: right;
  color: #fff8f0;
  background: #2c2c2c;
  padding: 25px;
  border-radius: 100px 0px 0px 100px;
}
</style>
