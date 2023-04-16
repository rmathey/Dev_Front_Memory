<template>
  <div id="app">
    <nav-bar />
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import NavBar from './components/NavBar.vue';
export default defineComponent({
  name: 'App',
  components: {
    NavBar,
  },
});
</script>