<template>
    <router-link to="/">Retour</router-link>
    <h1>{{ nom }}</h1>
    <h2>{{ themeData }}</h2>
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