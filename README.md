# memory

## Déploiement du projet:

Voici les commandes à effectuer:

```bash
npm install
```
```bash
npm run serve
```

Ensuite, avec son navigateur préféré, se rendre sur [localhost:8080](http://localhost:8080/)

## Fonctionnalités implémentées:

- Ajout et suppression de thèmes. Pour ajouter un thème, il suffit de se rendre sur l'onglet "Ajouter un thème" et compléter le formulaire. ![add_theme](img/add_theme.jpg)
Pour la suppression, il faut se rendre sur l'accueil et cliquer sur le bouton "Supprimer" à côté du thème.
![accueil](img/accueil.jpg)
- Ajout de cartes de révisions pour chaque thème, chaque carte est composée d'un recto et d'un verso composés de texte. Pour ajouter une ou plusieurs cartes, il faut se rendre sur l'accueil et cliquer sur le bouton "Modifier" (voir ci-dessus), puis sur le bouton "Ajouter une carte",                                                
![theme_page](img/theme_page.jpg)
puis remplir le formulaire.
![add_card](img/add_card.jpg)
- Réviser les cartes en sélectionnant un ou plusieurs thèmes et pour chaque thème choisir le nombre de niveaux et le nombre de nouvelles cartes. Il y a une vérification au niveau de la sélection: l'utilisateur ne peut pas sélectionner plus de cartes et plus de niveaux qui n'ont pas au moins une carte. Durant la révision, l'utilisateur doit se souvenir du verso de la carte, une fois toutes les cartes parcourues, les résultats sont enregistrés. Si la réponse de la carte est bonne, son niveau augmente d'un, sinon son niveau tombe à 1.
![choix_revision](img/choix_revision.jpg)
![revision](img/revision.jpg)
- Visualiser le nombre de nouvelles cartes, de cartes mémorisées et le nombre de cartes à chaque niveau.
![theme_page](img/theme_page.jpg)
- La demande d'autorisation des notifications a été implémentée mais pas le système de notification.
![notification](img/notification.jpg)
- Il y a un mode hors connexion, lorsque la connexion est interrompue, l'utilisateur est redirigé vers une page indiquant qu'il est déconnecté.                                                                                        
![hors_connexion](img/hors_connexion.jpg)

## Organisation de votre code et des composants