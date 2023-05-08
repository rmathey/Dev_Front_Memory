<template>
  <div class="container my-5">
    <h1 class="mb-4">Memory</h1>
    <div v-if="themeNames.length > 0">
      <h2 class="mb-3">Liste des thèmes:</h2>
      <ul class="list-group">
        <li v-for="(themeName, index) in themeNames" :key="index"
          class="list-group-item d-flex justify-content-between align-items-center">
          <router-link :to="{ name: 'theme-details', params: { nom: themeName } } " class="text-noir">{{ themeName }}</router-link>
          <button class="btn btn-primary"><router-link :to="{ name: 'theme-details', params: { nom: themeName } }" class="text-retour">Modifier</router-link></button>
          <button :key="themeName" :data-id="themeName" @click="deleteThemeHandler"
            class="btn btn-danger">Supprimer</button>
        </li>
      </ul>
    </div>
    <div v-else>
      <h1>Aucun thème</h1>
    </div>
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