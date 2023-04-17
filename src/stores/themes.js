import { defineStore } from "pinia";

export const themesStore = defineStore("themes", {
  state: () => ({
    data: JSON.parse(localStorage.getItem("data")) || [],
  }),
  getters: {
    getData: (state) => state.data,
  },
  actions: {
    addTheme(themeName) {
      const theme = themeName.trim();
      var resp;
      if (theme !== "") {
        const exists = this.getTheme(theme) !== undefined;

        if (!exists) {
          var themeObj = { id: this.data.length, nom: theme, cards: [] };
          this.data.push(themeObj);
          localStorage.setItem("data", JSON.stringify(this.data));
          resp = "true|Le thème " + theme + " a bien été ajouté";
        } else {
          resp = "false|Le thème existe déjà";
        }
      } else {
        resp = "false|Nom du thème ne peut pas être vide";
      }
      return resp;
    },
    addCard(theme, recto, verso) {
      const themeName = theme.trim();
      const now = new Date();
      const card = {"recto": recto, "verso": verso, "niveau": 1, "timeStamp": now.getTime()};
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].nom === themeName) {
          this.data[i].cards.push(card);
        }
      }
      localStorage.setItem("data", JSON.stringify(this.data));
    },
    getTheme(themeName) {
      themeName = themeName.trim();
      var resp = undefined;
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].nom === themeName) {
          resp = this.data[i];
        }
      }
      return resp;
    },
    getThemesNames() {
      var resp = [];
      for (let i = 0; i < this.data.length; i++) {
        resp.push(this.data[i].nom);
      }
      return resp.sort();
    }
  },
  getThemeCards(themeName) {
    return this.getTheme(themeName).cards;
  },
});

export default themesStore;
