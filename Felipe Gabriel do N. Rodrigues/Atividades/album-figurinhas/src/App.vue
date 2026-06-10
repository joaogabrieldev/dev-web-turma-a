<template>
  <router-view />
</template>
 
<script>
export default {
  name: 'App'
}
</script>
 
<style>
/* ===== Reset & Variáveis Globais ===== */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
 
:root {
  --color-bg:      #0d1117;
  --color-surface: #161b22;
  --color-border:  #30363d;
  --color-text:    #e6edf3;
  --color-muted:   #8b949e;
  --color-accent:  #4caf50;
}
 
html, body {
  background: var(--color-bg);
  color: var(--color-text);
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}
 
/* Scrollbar customizada */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: var(--color-bg); }
::-webkit-scrollbar-thumb { background: var(--color-border); border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: var(--color-accent); }
 
/* Seleção de texto */
::selection { background: rgba(76,175,80,0.3); }
 
a { color: var(--color-accent); text-decoration: none; }
button { font-family: inherit; }
</style>