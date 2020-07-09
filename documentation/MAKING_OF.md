# 1 : La maquette HTML

Une maquette HTML qui illustre le fonctionnement de l'application telle que je l'imagine
Pas de CSS
Pas de serveur, que du statique

Ce fut rapide (moins d'une heure) et le fait d'intéragir avec le résultat m'a donné envie
de continuer (... même si c'était moche)

# 2 : Le serveur

Ajout d'un serveur express qui va afficher les pages statiques précédement créées
via le moteur de template EJS
Je n'ai pas modifié les pages si ce n'est les url des liens et formulaires
(j'ai enlevé le .html, /options.html est devenu /options)

Ce fut rapide encore une fois (moins d'une heure)
Le rendu n'a pas changé mais maintenant j'ai un serveur et
un moteur de template fonctionnels

# 3 : la logique

Ajout de la logique dans les template pour afficher et modifier les sondages
Le stockage des sondages se fait en mémoire

J'ai maintenant une application fonctionnelle :-)

Ca m'a pris plus de temps (3h30), en particulier à cause
de l'implémentation du jugement majoritaire.

# 4 : Organisation de la persistence fichier

Ajout d'un dossier contenant deux exemples de sondages tels que j'imagine qu'ils seront stockés
une fois la persistence fichier mise en place

Ca m'a pris 1h et ca me permet de me rassurer sur le côté utilisable

Le fait d'ajouter la notice d'utilisation directement dans le contenu de chaque fichier me plait beaucoup

# 5 : Implémentation de la persistence fichier

Ca m'a pris beaucoup plus de temps ! Environ 4h30

Le fait de stocker la documentation dans le fichier qui contient la données rend difficile l'implémentation
des fonctions d'écriture et de lecture

Je pars sur le fait d'ajouter des fichiers status.readme.md, title.readme.md, options.readme.md... qui
contiennent la doc

# 1ère tentation : Embarquer le serveur node dans un service worker

J'y ai passé environ 5h

J'ai commencé par réutiliser ce projet : https://github.com/bahmutov/express-service

J'ai fait les corrections manuelles suivantes :

http.ServerResponse = Object.create({}, http.ServerResponseProto)

- http.ServerResponse.prototype = http.ServerResponseProto

var nodeVer = typeof process !== 'undefined' && process.versions && process.versions.node;

- if (nodeVer) {

* if (false && nodeVer) {
  (https://github.com/ashtuchkin/iconv-lite/issues/204)

Mais j'ai toujours des erreurs...

Est ce que je ne m'égare pas un peu ?

Allez ! on laisse ca de côté.

# 6 : Générer un exécutable

J'y ai passé environ 1H30

Les outils que j'ai trouvé pour ca sont :

- pkg (https://github.com/vercel/pkg)
- nexe (https://github.com/nexe/nexe)

Les deux semblent fonctionner mais le fait d'interagir avec un dossier externe a l'air plus galère avec pkg.
Je pars sur nexe.

# 7 : Ajouter du style

Au total j'ai du passer 3h à avoir une version desktop qui me plaisait

L'idée est d'utiliser un framework classless

Je commence par un au hasard qui me paraît pas trop moche : MVP.css (https://andybrewer.github.io/mvp/)
... mais ca ne me convient pas, il met les <form> dans des cards à chaque fois et ca ne rend pas bien

Je parcourt cette liste : https://github.com/dbohdan/classless-css

J'essaie Tacit (https://github.com/yegor256/tacit)
Ca me plait mieux, j'ai moins l'impression de me battre avec les choix imposés

Il reste un problème : sous mobile il n'y a pas de marges autour de la <section>

# 8 : Ajouter la synchro git

Cette synchro est une manière de ne pas tout perdre si le serveur crash

Ca m'a pris 1h MAIS seulement parce que j'avais déjà codé la synchronisation git dans un autre projet

Cette étape a été l'occasion de séparer les données du code

# 9 : Justification des choix techniques

Je prends 30 minutes pour poser par écrit la justification des choix techniques
dans le fichier CHOICES.txt

# 10 : Ménage

Je prends 2h pour :

- nettoyer toute trace de mon essai pour embarquer express dans un service worker (on verra ca plus tard)
- regrouper la doc dans un seul fichier nommé STRUCTURE.md, plus facile à maintenir
- déplacer les variables globales en dur dans un fichier configuration.js à la racine
- isoler le code de chaque route dans un fichier séparé situé dans /views ou /actions
- renommé les fichiers .js pour mieux faire ressortir leur rôle
- séparer l'application express du stockage fichier et de la synchronisation git
- compléter le README pour facilement entrer dans le projet
- factoriser l'entête des pages HTML dans /views/partials/head

# 11 : Mise à disposition avec localtunnel

Je pensais héberger l'application sur mon Raspberry Pi mais il semblerait qu'il soit HS :-/

Pour aller vite et partager l'application a des collègues, j'ajoute une configuration localtunnel (https://github.com/localtunnel/localtunnel)
Il se trouve que le service a l'air HS lui aussi
(https://github.com/localtunnel/localtunnel/issues/352)

En fait l'auteur ne semble plus maintenir le serveur utilisé : https://twitter.com/defunctzombie/status/1219768900537081856

Je trouve sur une autre issue qui mentionne un host alternatif qui marche
(https://github.com/localtunnel/localtunnel/issues/343)

En attendant d'avoir un point fixe d'hébergement, je fais en sorte d'utiliser toujours le même sous domaine.
Cela veut dire que l'application sera accessible à https://zdemocracy.serverless.social/ et
que n'importe qui peut l'héberger depuis son poste

Ca me prend 1h30

# 12 : Partage sur slack

Je partage la version en l'état sur slack pour récolter les avis.

(30min pour mettre les repos en public, faire du ménage, faire quelques ajouts dans la doc et écrire le message sur slack, 1h de plus pour retranscrire ca par écrit et cogiter)

## Définition de low-tech

Les discussions tournent beaucoup autour de "consommer moins", "plus économe".
J'ai l'impression que c'est le sens qu'attribuent les personnes au terme low-tech.
Peut être est ce plus judicieux de ne pas mentionner "low-tech" mais plutôt de parler
des objectifs : plus simple, plus accessible, plus durable.

## Trop centré technique

Les discussions tournent aussi beaucoup autour du choix de NodeJS qui peut sembler paradoxale
si on considère le low tech comme l'utilisation de technos économes
Il faudrait mieux mettre l'accent sur les stratégies pour rendre l'appli plus simple, accessible et durable :
1/ limiter le fonctionnel
2/ adopter une architecture simple et reproductible dans n'importe quel langage
Cela montrerait mieux que le choix de telle ou telle techno est finalement secondaire

## Un exemple, pas un framework ni une méthodo

On m'a suggéré de faire un tableau comparatif des différentes technos.
Cela me laisse penser qu'il faut présenter cette application comme un exemple qui
remplit les critères simple, durable, accessible mais qui ne reste qu'un exemple et non une méthodo à suivre

## La persistance fichier

Alexandre considère que la persistance fichier n'est pas assez résiliente :

```
Avoir une base de données embarquée comme celle qu'à indiqué @Luc (lowdb) ou alors un sqllite te permet d'avoir un truc assez léger mais t'abstrait de toute la partie accès concurrent, corruption de données...
```

Je me suis rendu compte en le codant que la persistance fichier n'était pas aussi simple à mannipuler que je l'imaginais, et que la structure des fichiers n'était pas aussi explicite que je le pensais

Je ne veux pas aller vers sqlite parce que ca empêcherai une synchro facile avec Git

L'approche lowdb pourrait être un bon compromis comme le suggère Luc

## L'hebergement

Mon RPi ne marche plus, je voulais m'en servir pour héberger l'application
J'ai utilisé localtunnel pour exposer l'appli qui tournait sur mon PC
Cette solution de secours s'avère pratique même si elle ne garantie pas un fonctionnement 100% online

En revanche, je constate qu'en hébergeant l'application en ligne, on perd la reactivité
qu'on a en local et cela se ressent beaucoup par exemple quand on ajoute des options à un sondages

Je me dit qu'il faut que je me concentre sur le local-first et que j'essaie de rendre
le process d'installation + première utilisation le plus simple possible

Le localtunnel me laisse aussi entrevoir la solution P2P suivante :

- chacun a un repo git local qu'il heberege avec gitdaemon
- ce repo contient les modifs locales et les merge de tous les répos distants connus
- une gestion de conflit basique est appliquée (le distant a toujours raison)
- le repo est exposé avec un tunnel ssh sur un serveur hébergé
- ce serveur pourrait mettre a disposition la liste des personnes qui font du tunneling sur lui
- chaque personne est identifié par <clé publique>.<host de tunneling>
- chaque message est signé

A voir...

# Next pour avoir un exemple représentatif de l'approche :

TODO Stocker les données dans le répertoire user de l'OS
TODO Utiliser lowdb pour la persistance fichier

# Refacto et fonctions bonus

TODO Ajouter une interface d'admin permettant de naviguer dans les dossiers, lire les fichiers et les supprimer si besoin
TODO Simplifier le format du stockage fichier ?
TODO Utiliser isomorphic git au lieu du git sur le pc ?
TODO Embarquer le serveur node dans un service worker pour faire une appli 100% front
TODO Peaufiner le style sous mobile (il n'y a pas de marge à gauche)
TODO Ajouter une favicon
TODO Renommer les fichiers pour que leur rôle soit plus explicite
TODO Valider la logique de jugement majoritaire avec un framework de test maison
TODO Gérer les cas d'égalité dans les résultats
TODO Ajouter la delegation à un autre utilisateur (démocratie liquide)
TODO Tester Turbolinks pour ajouter un côté plus réactif ?

# Interrogations :

TODO Quel genre de déploiement/hebergement adopter : centralisé ou non, client lourd ou pas, serveur fixe ou tunneling...
TODO La persistence fichier est verbeuse, est ce qu'une couche d'abstraction doit être ajoutée par dessus ?
TODO Les status n'ont pas de nom d'affichage comme les options ou les grades, en ajouter ?
