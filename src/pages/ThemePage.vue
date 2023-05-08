<template>
    <button>
        <router-link to="/">Retour</router-link>
    </button>
    <div v-if="themeData !== undefined">
        <h1>{{ nom }}</h1>
        <h2>Nouvelles cartes: {{ getCardLevel(nom, 0).length }}</h2>
        <h2>Cartes de niveau 1: {{ getCardLevel(nom, 1).length }}</h2>
        <h2>Cartes de niveau 2: {{ getCardLevel(nom, 2).length }}</h2>
        <h2>Cartes de niveau 3: {{ getCardLevel(nom, 3).length }}</h2>
        <h2>Cartes de niveau 4: {{ getCardLevel(nom, 4).length }}</h2>
        <h2>Cartes de niveau 5: {{ getCardLevel(nom, 5).length }}</h2>
        <h2>Cartes de niveau 6: {{ getCardLevel(nom, 6).length }}</h2>
        <h2>Cartes de niveau 7: {{ getCardLevel(nom, 7).length }}</h2>
        <h2>Cartes terminées: {{ getCardLevel(nom, 8).length }}</h2>
        <button>
            <router-link :to="{ name: 'add-card', params: { nom: nom } }">Ajouter une carte</router-link>
        </button>
    </div>
    <div v-else>
        Ce thème n'existe pas
    </div>
</template>
  
<script setup>
import { themesStore } from '@/stores/themes.js';
import { ref, defineProps } from 'vue';

const store = themesStore();
const { getTheme, getCardLevel } = store;

const props = defineProps({
    nom: {
        type: String,
        required: true,
    },
});

const nom = ref(props.nom);
const themeData = getTheme(nom.value);


</script>