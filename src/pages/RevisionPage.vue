<template>
    <button>
        <router-link :to="`/theme/${nom}`">Retour</router-link>
    </button>
    <div v-if="themeData !== undefined">
        <h1>{{ nom }}</h1>

        <div v-if="revisionStarted">
            <label>Recto :</label>
            <label>{{ recto }}</label>

            <label for="text-input">Verso :</label>
            <input type="text" id="theme-text-input" v-model="inputText">
        </div>
        <div v-else>
            <button @click="startRevisionHandler(nom)">Commencer la révision</button>
        </div>
    </div>
    <div v-else>
        Ce thème n'existe pas
    </div>
</template>
  
<script setup>
import { themesStore } from '@/stores/themes.js';
import { revisionStore } from '@/stores/revision.js';
import { ref, defineProps, watch } from 'vue';

const store1 = themesStore();
const store2 = revisionStore();
const { getTheme, getCardLevel } = store1;
const { startRevision } = store2;

const props = defineProps({
    nom: {
        type: String,
        required: true,
    },
});

const inputText = ref('');

const revisionStarted = ref(false);

const nom = ref(props.nom);
const recto = ref('');
const themeData = getTheme(nom.value);

function startRevisionHandler() {
    revisionStarted.value = true;
    var cards = [];
    for (let i = 7; i > 0; i--) {
        cards.push(getCardLevel(nom.value, i));
    }
    recto.value = startRevision(nom.value, cards);
}

watch(inputText, () => {
    console.log(inputText.value);
});
</script>