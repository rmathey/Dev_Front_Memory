<template>
    <div class="container">
        <button class="btn btn-secondary marge-haut">
            <router-link :to="`/theme/${nom}`" class="text-retour">Retour</router-link>
        </button>
        <div v-if="themeData !== undefined">
            <h1>Thème: {{ nom }}</h1>
            <div class="form-group">
                <label for="recto">Recto de la carte :</label>
                <input type="text" id="recto" class="form-control" v-model="recto">
            </div>
            <div class="form-group">
                <label for="verso">Verso de la carte :</label>
                <input type="text" id="verso" class="form-control" v-model="verso">
            </div>
            <button class="btn btn-primary" @click="addCardHandler">Ajouter une carte</button>
            <div v-if="cardAddedText !== '' && recto === '' && verso === ''" class="alert alert-primary mt-3" role="alert">
                {{ cardAddedText }}
            </div>
        </div>
        <div v-else class="alert alert-danger" role="alert">
            Ce thème n'existe pas
        </div>
    </div>
</template>
  
<script setup>
import { themesStore } from '@/stores/themes.js';
import { ref, defineProps, watch } from 'vue';

const store = themesStore();
const { getTheme, addCard } = store;

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