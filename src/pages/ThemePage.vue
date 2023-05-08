<template>
    <button class="btn btn-secondary">
        <router-link :to="`/`" class="text-retour">Retour</router-link>
    </button>
    <div v-if="themeData !== undefined">
        <h1>Nom du theme: {{ nom }}</h1>
        <h2>Nouvelles cartes: {{ getCardLevel(nom, 0).length }}</h2>
        <h2>Cartes de niveau 1: {{ getCardLevel(nom, 1).length }}</h2>
        <h2>Cartes de niveau 2: {{ getCardLevel(nom, 2).length }}</h2>
        <h2>Cartes de niveau 3: {{ getCardLevel(nom, 3).length }}</h2>
        <h2>Cartes de niveau 4: {{ getCardLevel(nom, 4).length }}</h2>
        <h2>Cartes de niveau 5: {{ getCardLevel(nom, 5).length }}</h2>
        <h2>Cartes de niveau 6: {{ getCardLevel(nom, 6).length }}</h2>
        <h2>Cartes de niveau 7: {{ getCardLevel(nom, 7).length }}</h2>
        <h2>Cartes terminées: {{ getCardLevel(nom, 8).length }}</h2>
        <button class="btn btn-primary">
            <router-link :to="{ name: 'add-card', params: { nom: nom } }" class="text-retour">Ajouter une carte</router-link>
        </button>
    </div>
    <div v-else class="alert alert-warning mt-3">
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