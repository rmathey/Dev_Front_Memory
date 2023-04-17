<template>
    <h1>Ajouter un theme</h1>
    <label for="text-input">Nom du theme :</label>
    <input type="text" id="theme-text-input" v-model="inputThemeText">
    <button @click="addThemeHandler">Ajouter un theme</button>
    <div v-if="themeAddedText !== ''">
        {{ themeAddedText }}
    </div>
    <h2>Liste des themes:</h2>
    <ul>
        <li v-for="(themeName, index) in themeNames" :key="index">
            {{ themeName }}
        </li>
    </ul>
</template>
  
<script setup>
import { themesStore } from '@/stores/themes.js';
import { ref } from 'vue';

const store = themesStore();
const { addTheme, getThemesNames } = store;

const inputThemeText = ref('');
const themeAddedText = ref('');
const themeNames = ref([]);


function addThemeHandler() {
    const resp = addTheme(inputThemeText.value).split("|");
    themeAddedText.value = resp[1];
    if (resp[0] === "true") {
        inputThemeText.value = "";
        themeNames.value = getThemesNames();
    }
}

themeNames.value = getThemesNames();

</script>