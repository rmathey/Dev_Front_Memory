<template>
    <div class="container marge-haut">
        <h1>Ajouter un thème</h1>

        <div class="form-group">
            <label for="theme-text-input">Nom du thème :</label>
            <input type="text" id="theme-text-input" v-model="inputThemeText" class="form-control">
        </div>

        <button @click="addThemeHandler" class="btn btn-primary">Ajouter un thème</button>

        <div v-if="themeAddedText !== '' && inputThemeText === ''" class="alert alert-primary mt-3">
            {{ themeAddedText }}
        </div>

        <div v-if="themeNames.length > 0">
            <h2>Liste des thèmes :</h2>
            <ul>
                <li v-for="(themeName, index) in themeNames" :key="index">{{ themeName }}</li>
            </ul>
        </div>

        <div v-else>
            <h2>Aucun thème</h2>
        </div>
    </div>
</template>
  
<script setup>
import { themesStore } from '@/stores/themes.js';
import { ref, watch } from 'vue';

const store = themesStore();
const { addTheme, getThemesNames } = store;

const inputThemeText = ref('');
const themeAddedText = ref('');
const themeNames = ref([]);


function addThemeHandler() {
    const resp = addTheme(inputThemeText.value).split("|");
    themeAddedText.value = resp[1];
    if (resp[0] === "true") {
        themeNames.value = getThemesNames();
    }
    inputThemeText.value = "";
}

watch(inputThemeText, () => {
    if (inputThemeText.value !== '') {
        themeAddedText.value = '';
    }
});

themeNames.value = getThemesNames();

</script>