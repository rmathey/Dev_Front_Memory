<template>
    <div class="container">
        <button class="btn btn-secondary marge-haut">
            <router-link :to="`/`" class="text-retour">Retour</router-link>
        </button>
        <div v-if="themeData !== undefined">
            <h1>Nom du thème: {{ nom }}</h1>
            <div class="row marge-haut">
                <input type="text" id="newName" class="form-control" v-model="newName" placeholder="Nouveau nom">
            </div>
            <div v-if="infoText !== ''" class="row marge-haut alert alert-primary" role="alert">
                {{ infoText }}
            </div>
            <div class="row marge-haut">
                <button class="btn btn-primary" @click="modifyNameHandler">
                    Modifier le nom du thème
                </button>
            </div>
            <div class="marge-haut">
                <h2>Nouvelles cartes: {{ getCardLevel(nom, 0).length }}</h2>
                <h2>Cartes de niveau 1: {{ getCardLevel(nom, 1).length }}</h2>
                <h2>Cartes de niveau 2: {{ getCardLevel(nom, 2).length }}</h2>
                <h2>Cartes de niveau 3: {{ getCardLevel(nom, 3).length }}</h2>
                <h2>Cartes de niveau 4: {{ getCardLevel(nom, 4).length }}</h2>
                <h2>Cartes de niveau 5: {{ getCardLevel(nom, 5).length }}</h2>
                <h2>Cartes de niveau 6: {{ getCardLevel(nom, 6).length }}</h2>
                <h2>Cartes de niveau 7: {{ getCardLevel(nom, 7).length }}</h2>
                <h2>Cartes terminées: {{ getCardLevel(nom, 8).length }}</h2>
            </div>
            <div class="row marge-haut">
                <button class="btn btn-primary">
                    <router-link :to="{ name: 'add-card', params: { nom: nom } }" class="text-retour">Ajouter une
                        carte</router-link>
                </button>
            </div>
        </div>
        <div v-else class="alert alert-warning mt-3">
            Ce thème n'existe pas
        </div>
    </div>
</template>
  
<script setup>
import { themesStore } from '@/stores/themes.js';
import { ref, defineProps } from 'vue';
import { useRouter } from 'vue-router'
const router = useRouter();
const store = themesStore();
const { getTheme, getCardLevel, modifyName } = store;

const props = defineProps({
    nom: {
        type: String,
        required: true,
    },
});

const nom = ref(props.nom);
const themeData = getTheme(nom.value);
const newName = ref('');
const infoText = ref('');

function modifyNameHandler() {
    if (newName.value.trim() !== "") {
        const redirect = modifyName(nom.value, newName.value);
        if (redirect !== "") {
            console.log("redirect")
            console.log(redirect)

            nom.value = redirect;
            themeData.value = getTheme(redirect);
            newName.value = "";
            router.push({ name: 'theme-details', params: { nom: redirect } }).then(() => {
                window.location.reload();
            });
        }
        else {
            infoText.value = "Ce thème existe déjà";
        }
    }
    else {
        infoText.value = "Veuillez entrer un nom";
    }
}

</script>