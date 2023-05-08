<template>
  <h1>Memory</h1>
  <div v-if="themeNames.length > 0">
    <h2>Liste des themes:</h2>
    <ul>
      <li v-for="(themeName, index) in themeNames" :key="index">
        <router-link :to="{ name: 'theme-details', params: { nom: themeName } }">{{ themeName }}</router-link>
        <button :key="themeName" :data-id="themeName" @click="deleteThemeHandler">Supprimer</button>
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
const { getThemesNames, deleteTheme } = store;
const themeNames = ref([]);


themeNames.value = getThemesNames();

function deleteThemeHandler(event) {
  const name = event.target.dataset.id;
    deleteTheme(name)
    window.location.reload();
}
</script>