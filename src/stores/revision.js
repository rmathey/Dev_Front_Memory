import { defineStore } from "pinia";

export const revisionStore = defineStore("revision", {
  state: () => ({
    cards: [],
    results: [],
    index: -1,
  }),
  getters: {
    //getThemes: (state) => state.themes,
  },
  actions: {
    startRevision(themesData, themes) {
      this.index = -1;
      this.cards = [];
      var cards = []
      this.resutls = [];

      for (let i = 0; i < themesData.length; i++) {
        const theme = themes.filter(node => node.nom === themesData[i][0])[0];

        
        var index = 0;
        var index3 = 0;
        while (index < themesData[i][1]) {
          var cardsLevel = theme.cards.filter(node => node.niveau === 7 - index3 );
          index3 += 1;
          if (cardsLevel.length > 0) {
            index += 1;
            for (let index2 = 0; index2 < cardsLevel.length; index2++) {
              cardsLevel[index2]["theme"] = theme.nom;
              cards.push(cardsLevel[index2]);
            }
          }
        }
        
        const newCards = theme.cards.filter(node => node.niveau === 0 );
        for (let k = 0; k < themesData[i][2]; k++) {
          newCards[k]["theme"] = theme.nom;
          cards.push(newCards[k]);
          }
      }
      this.cards = cards;
    },
    getNextCard(carte, reponse) {
      if (this.index >= 0) {
        this.results.push([carte, reponse]);
      }
      this.index += 1;
      if (this.cards.length === 0) {
        return [];
      } else {
        return this.cards[this.index];
      }
    },
    isEnded() {
      return this.index >= this.cards.length;
    },
    getResults() {
      return this.results;
    }
  },
});

export default revisionStore;
