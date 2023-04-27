<template>
    <button>
        <router-link :to="`/revision`">Retour</router-link>
    </button>
    <div v-if="currentCard.length !== 0">
        {{ currentCard.value }}
        <label>Recto:</label>
        <input type="text" id="theme-text-input" v-model="inputText">
    </div>
    <div v-else>
        Aucune révision en cours
    </div>
</template>
  
<script setup>
import { revisionStore } from '@/stores/revision.js';
import { ref, watch } from 'vue';

const store = revisionStore();
const { getThemes, getNextCard } = store;

const inputText = ref('');
const currentCard = ref([]);
currentCard.value = getNextCard();
const themes = ref([]);
themes.value = getThemes();


watch(inputText, () => {
    console.log(inputText.value);
});

</script>
  