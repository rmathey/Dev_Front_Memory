<template>
    <button>
        <router-link :to="`/revision`">Retour</router-link>
    </button>
    <div v-if="ended">
        <label>{{ infoText }}</label>
        <label>Révision terminée</label>
    </div>
    <div v-else-if="currentCard.length !== 0">
        <label>{{ currentCard.recto }}</label>
        <input type="text" id="theme-text-input" v-model="inputText">
        <button @click="submitCardHandler()">Répondre</button>
        <label>{{ infoText }}</label>
    </div>
    <div v-else>
        Aucune révision en cours
    </div>
</template>
  
<script setup>
import { revisionStore } from '@/stores/revision.js';
import { themesStore } from '@/stores/themes.js';
import { ref } from 'vue';

const store = revisionStore();
const store2 = themesStore();
const { getNextCard, isEnded, getResults } = store;
const { update } = store2;

const inputText = ref('');
const currentCard = ref('');
const infoText = ref('');
const ended = ref('');
currentCard.value = getNextCard();

function submitCardHandler() {
    var resp;
    if (inputText.value.trim() === currentCard.value.verso) {
        infoText.value = "Bonne réponse !";
        resp = true;
    }
    else {
        infoText.value = "Mauvaise réponse !";
        resp = false;
    }
    currentCard.value = getNextCard(currentCard.value, resp);
    if (isEnded()) {
        ended.value = true;
        update(getResults());
    }
    inputText.value = "";
}

</script>
  