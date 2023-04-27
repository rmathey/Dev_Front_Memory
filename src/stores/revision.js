import { defineStore } from "pinia";

export const revisionStore = defineStore("revision", {
  state: () => ({
    cards: [],
    results: {},
    index: 0
  }),
  getters: {
    //getThemes: (state) => state.themes,
  },
  actions: {
    getThemes() {
      return this.themes;
    },
    startRevision(themesData, themes) {
      this.index = 0;
      this.cards = [];
      this.resutls = {};
      for (let i = 0; i < 7; i++) {
        this.resutls[i + 1] = [];
      }
      console.log("this.resutls1");
      console.log(this.resutls);
      for (let i = 0; i < themes.length; i++) {
        console.log("themes[i]");
        console.log(themes[i]);
        for (let j = 0; j < themes[i].cards.length; j++) {
            if (themes[i].cards[j].niveau !== 0 && themes[i].cards[j].niveau !== 8) {
              this.resutls[themes[i].cards[j].niveau].push(themes[i].cards[j]);
            }
          }
    }
    console.log("this.resutls2");
    console.log(this.resutls);
    console.log("themesData");
    console.log(themesData);
    console.log("themes");
    console.log(themes);
    },
    getNextCard() {
      if (this.cards.length === 0) {
        return [];
      }
      else if (this.index >= this.cards.length) {
        return this.results;
      }
      else{
        return this.cards[this.index];
      }
    }
  },
});


export default revisionStore;
