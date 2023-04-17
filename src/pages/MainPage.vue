<template>
  <h1>Memory</h1>
  <div v-if="themeNames.length > 0">
    <h2>Liste des themes:</h2>
    <ul>
      <li v-for="(themeName, index) in themeNames" :key="index">
        <router-link :to="{ name: 'theme-details', params: { nom: themeName } }">{{ themeName }}</router-link>
      </li>
    </ul>
  </div>
  <div v-else>
    <h1>Aucun thème</h1>
  </div>
</template>

<script setup>
import { themesStore } from '@/stores/themes.js';
import { ref } from 'vue';

const store = themesStore();
const { getThemesNames } = store;

const themeNames = ref([]);


themeNames.value = getThemesNames();

</script>