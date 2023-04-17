<template>
    <button>
        <router-link to="/">Retour</router-link>
    </button>
    <div v-if="themeData !== undefined">
        <h1>{{ nom }}</h1>
        <h2>{{ themeData }}</h2>
        <button>
            <router-link :to="{ name: 'add-card', params: { nom: nom } }">Ajouter une carte</router-link>
        </button>
        <button>
            <router-link :to="{ name: 'start-revision', params: { nom: nom } }">Commencer à réviser</router-link>
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
const { getTheme } = store;

const props = defineProps({
    nom: {
        type: String,
        required: true,
    },
});

const nom = ref(props.nom);
const themeData = getTheme(nom.value);


</script>