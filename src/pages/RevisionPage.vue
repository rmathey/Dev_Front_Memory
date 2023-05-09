<template>
    <div class="container marge-haut">
        <div v-if="themeNames.length > 0">
            <h2 class="row">Révision:</h2>
            <div class="row marge-haut">
                Nom | Nombre de niveaux | Nombre de nouvelles cartes
            </div>
            <label v-for="(option, index) in options" :key="index" class="row marge-haut">
                <input type="checkbox" :value="option.value" v-model="selectedThemes">
                <div class="label-revision">{{ option.label }}</div>
                <select v-model="selectedLevels1[option.value]" :key="`${option.value}-select1`"
                    @change="updateSelectedLevels1(option.value)">
                    <option v-for="i in getAmountOfFilledTheme(option.value) + 1" :value="i - 1"
                        :key="`${option.value}-option1-${i}`">{{ i - 1 }}</option>
                </select>
                <select v-model="selectedLevels2[option.value]" :key="`${option.value}-select2`"
                    @change="updateSelectedLevels2(option.value)">
                    <option v-for="i in getCardLevel(option.value, 0).length + 1" :value="i - 1"
                        :key="`${option.value}-option2-${i}`">
                        {{ i - 1 }}</option>
                </select>
            </label>
            <button @click="startRevisionHandler()" class="btn btn-primary row marge-haut">Commencer la révision</button>
            <div v-if="message !== ''" class="alert alert-primary mt-3 row">
                {{ message }}
            </div>
        </div>
        <div v-else>
            <h1>Aucun thème</h1>
        </div>
    </div>
</template>
  
<script setup>
import { useRouter } from 'vue-router'
import { themesStore } from '@/stores/themes.js';
import { revisionStore } from '@/stores/revision.js';
import { ref } from 'vue';

const store1 = themesStore();
const store2 = revisionStore();
const { startRevision } = store2;
const { getThemesNames, getCardLevel, getAmountOfFilledTheme, getData } = store1;
const router = useRouter();

const selectedThemes = ref([]);
const themeNames = ref([]);
const selectedLevels1 = ref({});
const selectedLevels2 = ref({});
const message = ref('');
themeNames.value = getThemesNames();
const options = themeNames.value.map((theme) => ({ label: theme, value: theme }));
themeNames.value.forEach((theme) => {
    selectedLevels1.value[theme] = 0;
    selectedLevels2.value[theme] = 0;
});

function updateSelectedLevels1(themeName) {
    const level = selectedLevels1.value[themeName];
    selectedLevels1.value = { ...selectedLevels1.value, [themeName]: level };
}
function updateSelectedLevels2(themeName) {
    const level = selectedLevels2.value[themeName];
    selectedLevels2.value = { ...selectedLevels2.value, [themeName]: level };
}


function startRevisionHandler() {
    var themesData = [];
    var item;
    var arg1;
    var arg2;
    var arg3;
    for (let i = 0; i < selectedThemes.value.length; i++) {
        arg1 = selectedThemes.value[i]
        arg2 = selectedLevels1.value[selectedThemes.value[i]];
        arg3 = selectedLevels2.value[selectedThemes.value[i]];
        item = [arg1, arg2, arg3]
        if (arg2 !== 0 || arg3 !== 0) {
            themesData.push(item);
        }
    }
    if (themesData.length === 0) {
        message.value = "Aucun thème sélectionné";
    }
    else {
        message.value = "";
        startRevision(themesData, getData());
        router.push({ path: '/revision/start' });
    }
}
</script>