<template>
    <button>
        <router-link :to="`/theme/${nom}`">Retour</router-link>
    </button>
    <div v-if="themeData !== undefined">
        <h1>{{ nom }}</h1>
        <h2>Cartes de niveau 1: {{ getCardLevel(nom, 1).length }}</h2>
        <h2>Cartes de niveau 2: {{ getCardLevel(nom, 2).length }}</h2>
        <h2>Cartes de niveau 3: {{ getCardLevel(nom, 3).length }}</h2>
        <h2>Cartes de niveau 4: {{ getCardLevel(nom, 4).length }}</h2>
        <h2>Cartes de niveau 5: {{ getCardLevel(nom, 5).length }}</h2>
        <h2>Cartes de niveau 6: {{ getCardLevel(nom, 6).length }}</h2>
        <h2>Cartes de niveau 7: {{ getCardLevel(nom, 7).length }}</h2>
        <h2>Cartes terminées: {{ getCardLevel(nom, 8).length }}</h2>
        <label for="text-input">Recto de la carte :</label>
        <input type="text" id="theme-text-input" v-model="recto">
        <label for="text-input">Verso de la carte :</label>
        <input type="text" id="theme-text-input" v-model="verso">
        <button @click="addCardHandler">Ajouter un theme</button>
        <div v-if="cardAddedText !== '' && recto === '' && verso === ''">
            {{ cardAddedText }}
        </div>
    </div>
    <div v-else>
        Ce thème n'existe pas
    </div>
</template>
  
<script setup>
import { themesStore } from '@/stores/themes.js';
import { ref, defineProps, watch } from 'vue';

const store = themesStore();
const { getTheme, addCard, getCardLevel } = store;

const props = defineProps({
    nom: {
        type: String,
        required: true,
    },
});

const nom = ref(props.nom);
const cardAddedText = ref('');
const recto = ref('');
const verso = ref('');
const themeData = getTheme(nom.value);

function addCardHandler() {
    const resp = addCard(nom.value, recto.value, verso.value).split("|");
    cardAddedText.value = resp[1];

    recto.value = "";
    verso.value = "";
}

watch(recto, () => {
    if (recto.value !== '' || verso.value !== '') {
        cardAddedText.value = '';
    }
});
watch(verso, () => {
    if (recto.value !== '' || verso.value !== '') {
        cardAddedText.value = '';
    }
});


</script>