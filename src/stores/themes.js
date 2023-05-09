import { defineStore } from "pinia";
const CryptoJS = require("crypto-js");

export const themesStore = defineStore("themes", {
  state: () => ({
    data: JSON.parse(localStorage.getItem("data")) || [],
  }),
  getters: {
    //getData: (state) => state.data,
  },
  actions: {
    getData() {
      return this.data;
    },
    getCard(theme, recto) {
      const cards = this.getThemeCards(theme);
      var resp = undefined;
      var index = 0;
      while (cards[index] !== undefined) {
        if (cards[index].recto === recto) {
          resp = cards[index];
        }
        index++;
      }
      return resp;
    },
    getCardLevel(theme, level) {
      const cards = this.getThemeCards(theme);
      var resp = [];
      var index = 0;
      while (cards[index] !== undefined) {
        if (cards[index].niveau === level) {
          resp.push(cards[index]);
        }
        index++;
      }
      return resp;
    },
    getCardsLen(themeName) {
      return this.getTheme(themeName).cards.length;
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
    },
    getThemeCards(themeName) {
      return this.getTheme(themeName).cards;
    },
    getAmountOfFilledTheme(themeName) {
      const cards = this.getThemeCards(themeName);
      var count = 0;
      var checkIfEmpty;
      for (let i = 7; i > 0; i--) {
        var count2 = 0;
        checkIfEmpty = true;
        for (let j = 0; j < cards.length; j++) {
          if (cards[j].niveau === i) {
            checkIfEmpty = false;
          }
        }
        if (!checkIfEmpty) {
          count2 += 1;
        }
        count += count2;
      }
      return count;
    },
    addTheme(themeName) {
      const theme = themeName.trim();
      var resp;
      if (theme !== "") {
        const exists = this.getTheme(theme) !== undefined;
        if (!exists) {
          const themeHashed = CryptoJS.SHA256(theme);
          const id = CryptoJS.enc.Hex.stringify(themeHashed);
          var themeObj = { id: id, nom: theme, cards: [] };
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
    deleteTheme(themeName) {
      const theme = themeName.trim();
      var resp;
      this.data = this.data.filter((node) => node.nom !== theme);
      localStorage.setItem("data", JSON.stringify(this.data));
      return resp;
    },
    addCard(theme, recto, verso) {
      const themeName = theme.trim();
      if (recto === "" || verso === "") {
        return "false|Un des 2 champs est vide";
      }
      if (this.getCard(themeName, recto) === undefined) {
        const now = new Date();
        const card = {
          recto: recto,
          verso: verso,
          niveau: 0,
          timeStamp: now.getTime(),
        };
        for (let i = 0; i < this.data.length; i++) {
          if (this.data[i].nom === themeName) {
            this.data[i].cards.push(card);
          }
        }
        localStorage.setItem("data", JSON.stringify(this.data));
        return "true|La carte " + recto + " a été ajoutée";
      } else {
        return "false|La carte existe déjà";
      }
    },
    update(results) {
      for (let i = 0; i < results.length; i++) {
        for (let j = 0; j < this.data.length; j++) {
          if (this.data[j].nom === results[i][0].theme) {
            for (let k = 0; k < this.data[j].cards.length; k++) {
              if (this.data[j].cards[k].recto === results[i][0].recto) {
                console.log(this.data[j].cards[k].recto);
                if (results[i][1]) {
                  this.data[j].cards[k].niveau += 1;
                }
                else {
                  if (this.data[j].cards[k].niveau !== 0) {
                    this.data[j].cards[k].niveau = 1;
                  }
                }
              }
            }
          }
        }
        localStorage.setItem("data", JSON.stringify(this.data));
      }
    },
    modifyName(nom, newNom_) {
      const newNom = newNom_.trim();
      if (this.getTheme(newNom_) === undefined) {
        for (let i = 0; i < this.data.length; i++) {
          if (this.data[i].nom === nom) {
            this.data[i].nom = newNom;
          }
        }
        localStorage.setItem("data", JSON.stringify(this.data));
        return newNom;
      }
      else {
        return "";
      }
    }
  },
});

export default themesStore;
