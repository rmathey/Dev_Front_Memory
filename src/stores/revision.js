import { defineStore } from "pinia";

export const revisionStore = defineStore("revision", {
  state: () => ({
    data: [],
  }),
  getters: {
    getData: (state) => state.data,
  },
  actions: {
    startRevision(theme, cards) {
      //console.log(theme);
      //console.log(cards);
      //var cartesByLevel;
      var index = 0;
      for (let i = 6; i >= 0; i--) {
        while (cards[i][index] !== undefined) {
          console.log(cards[i][index].recto);
          index++;
        }
      }
    },
  },
});

export default revisionStore;
