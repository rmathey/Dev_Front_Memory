<template>
    <div class="container">
        <button class="btn btn-secondary marge-haut">
            <router-link :to="`/revision`" class="text-retour">Retour</router-link>
        </button>
        <div v-if="ended">
            <div v-if="infoText !== ''" class="alert alert-primary mt-3">
                <label>{{ infoText }}</label>
            </div>
            <div v-if="infoText !== ''" class="alert alert-success mt-3">
                <label>Révision terminée</label>
            </div>
        </div>
        <div v-else-if="currentCard.length !== 0" class="container">
            <h2 class="row marge-haut">Recto: {{ currentCard.recto }}</h2>
            <div class="row marge-haut">
                <h2>Verso: </h2>
                <input type="text" id="theme-text-input" v-model="inputText">
            </div>
            <button @click="submitCardHandler()" class="btn btn-primary row marge-haut">Répondre</button>
            <div v-if="infoText !== ''" class="alert alert-primary mt-3 row marge-haut">
                <label>{{ infoText }}</label>
            </div>
        </div>
        <div v-else>
            Aucune révision en cours
        </div>
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
    if (inputText.value.trim() === "") {
        infoText.value = "Veuillez entrer une réponse";
    }
    else {
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
    }
    inputText.value = "";
}

</script>