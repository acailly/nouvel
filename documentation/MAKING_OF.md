# 1 : La maquette HTML - 1H

Une maquette HTML qui illustre le fonctionnement de l'application telle que je l'imagine
Pas de CSS
Pas de serveur, que du statique

Ce fut rapide (moins d'une heure) et le fait d'intéragir avec le résultat m'a donné envie
de continuer (... même si c'était moche)

# 2 : Le serveur - 1H

Ajout d'un serveur express qui va afficher les pages statiques précédement créées
via le moteur de template EJS
Je n'ai pas modifié les pages si ce n'est les url des liens et formulaires
(j'ai enlevé le .html, /options.html est devenu /options)

Ce fut rapide encore une fois (moins d'une heure)
Le rendu n'a pas changé mais maintenant j'ai un serveur et
un moteur de template fonctionnels

# 3 : la logique - 3H30

Ajout de la logique dans les template pour afficher et modifier les sondages
Le stockage des sondages se fait en mémoire

J'ai maintenant une application fonctionnelle :-)

Ca m'a pris plus de temps (3h30), en particulier à cause
de l'implémentation du jugement majoritaire.

# 4 : Organisation de la persistence fichier - 1H

Ajout d'un dossier contenant deux exemples de sondages tels que j'imagine qu'ils seront stockés
une fois la persistence fichier mise en place

Ca m'a pris 1h et ca me permet de me rassurer sur le côté utilisable

Le fait d'ajouter la notice d'utilisation directement dans le contenu de chaque fichier me plait beaucoup

# 5 : Implémentation de la persistence fichier - 4H30

Ca m'a pris beaucoup plus de temps ! Environ 4h30

Le fait de stocker la documentation dans le fichier qui contient la données rend difficile l'implémentation
des fonctions d'écriture et de lecture

Je pars sur le fait d'ajouter des fichiers status.readme.md, title.readme.md, options.readme.md... qui
contiennent la doc

# 1ère tentation : Embarquer le serveur node dans un service worker - 5H

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

# 6 : Générer un exécutable - 1H30

J'y ai passé environ 1H30

Les outils que j'ai trouvé pour ca sont :

- pkg (https://github.com/vercel/pkg)
- nexe (https://github.com/nexe/nexe)

Les deux semblent fonctionner mais le fait d'interagir avec un dossier externe a l'air plus galère avec pkg.
Je pars sur nexe.

# 7 : Ajouter du style - 3H

Au total j'ai du passer 3h à avoir une version desktop qui me plaisait

L'idée est d'utiliser un framework classless

Je commence par un au hasard qui me paraît pas trop moche : MVP.css (https://andybrewer.github.io/mvp/)
... mais ca ne me convient pas, il met les <form> dans des cards à chaque fois et ca ne rend pas bien

Je parcourt cette liste : https://github.com/dbohdan/classless-css

J'essaie Tacit (https://github.com/yegor256/tacit)
Ca me plait mieux, j'ai moins l'impression de me battre avec les choix imposés

Il reste un problème : sous mobile il n'y a pas de marges autour de la <section>

# 8 : Ajouter la synchro git - 1H

Cette synchro est une manière de ne pas tout perdre si le serveur crash

Ca m'a pris 1h MAIS seulement parce que j'avais déjà codé la synchronisation git dans un autre projet

Cette étape a été l'occasion de séparer les données du code

# 9 : Justification des choix techniques - 30m

Je prends 30 minutes pour poser par écrit la justification des choix techniques
dans le fichier CHOICES.txt

# 10 : Ménage - 2H

Je prends 2h pour :

- nettoyer toute trace de mon essai pour embarquer express dans un service worker (on verra ca plus tard)
- regrouper la doc dans un seul fichier nommé STRUCTURE.md, plus facile à maintenir
- déplacer les variables globales en dur dans un fichier configuration.js à la racine
- isoler le code de chaque route dans un fichier séparé situé dans /views ou /actions
- renommé les fichiers .js pour mieux faire ressortir leur rôle
- séparer l'application express du stockage fichier et de la synchronisation git
- compléter le README pour facilement entrer dans le projet
- factoriser l'entête des pages HTML dans /views/partials/head

# 11 : Mise à disposition avec localtunnel - 1H30

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

# 12 : Partage sur slack - 1H30

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

Lowdb est séduisante parce que le code a l'air hyper simple mais le côté monofichier me gêne là encore parce que je crains que ca bride la synchro Git

Je vais essayer de simplifier la persistance fichier actuelle sans pour autant utiliser de lib externes pour l'instant

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

# 13 : Simplification de la persistance fichier - 4H30

C'est une tentative pour ajouter un tout petit peu de convention pour simplifier la manipulation des fichiers

Le fait d'aller lire explicitement des fichiers avec fileReadContent(path.join(...)) est lourd

L'idée est de proposer des fonctions simples types read / write / delete / listKeys qui vont transposer ces appels en requête dans les fichiers

L'idée est aussi de ne plus utiliser les extension de fichiers comme des valeurs, c'est plus lisible à condition que l'on sache a priori ce que l'extension de tel fichier est sensée contenir

Je pars plutôt sur le fait d'utiliser uniquement des dossiers et des fichiers json

On aboutit donc à une base clé / valeur persisté en base :

- la clé est le chemin du fichier (/polls/poll1/info.json) auquel on a enlevé l'extension : /polls/poll1/info
- la valeur est le contenu du fichier JSON

Bonus, ca nous permet maintenant d'ajouter des fichiers non JSON dans les dossier sans que ca ne perturbe l'appli (des README spécifiques par exemple)

Cela m'a pris 4h30 au total

# 14 : Découplage et abstraction de la persistance fichier - 45m

C'est peut être le début de la sur-complexification du projet ?

J'ai fait en sorte que les fonctions de persistance (read, write, delete...) soient accessible dans un object unique (j'ai créé un index.js dans /storage-file) et j'ai importé ce fichier dans un fichier `storage.js` à la racine

Ca permet d'utiliser la persistance via `require('./storage')` au lieu de `require('./storage-file/read')`

Ca m'a pris 45 min

# 15 : Stockage des données dans le répertoire utilisateur - 30m

Le fait d'avoir à récupérer manuellement le repository git à côté du dossier de l'application avant de démarrer l'application est un frein à son utilisation, en particulier si l'application est distribuée sous forme d'exécutable

Je fais donc en sorte que la synchronisation git aille automatiquement cloner le repository distant dans le répertoire utilisateur.

Ca me prend 30min.

# 16 : Combien de temps passé jusqu'à maintenant ? - 15m

1H
+ 1H = 2H
+ 3H30 = 5H30
+ 1H = 6H30
+ 4H30 = 11H
+ 5H = 16H
+ 1H30 = 17H30
+ 3H = 20H30
+ 1H = 21H30
+ 30m = 22H
+ 2H = 24H
+ 1H30 = 25H30
+ 1H30 = 27H
+ 4H30 = 31H30
+ 45m = 32H15
+ 30m = 32H45
+ 15m = 33H

33H ! Je n'avais pas l'impression d'avoir passé autant de temps.


# 17 : Ajouter la notion d'identité - 30m

Je pars sur une identité simple composée d'un UUID v4

Ca me prend 30m

# 18 : Tentative d'exposer git via tunneling - 1H30

## git-daemon

Je teste si j'arrive à exposer un repository via git-daemon et localtunnel pour ensuite le 
cloner dans une autre repository

Je me base principalement sur ce site : https://railsware.com/blog/taming-the-git-daemon-to-quickly-share-git-repository/

D'abord testons juste git-daemon :

```
git daemon --base-path=. --export-all --reuseaddr --informative-errors --verbose
```

```
git clone git://127.0.0.1/ ./test
```

Ca marche, cool !

Maintenant essayons avec localtunnel :

```
npx localtunnel -h "https://serverless.social" --port 9418
```

```
git clone git://lucky-tiger-95.serverless.social/ ./test
```

Ca ne marche pas...

Arf, il semblerait que localtunnel ne supporte pas le raw tunneling :
https://github.com/localtunnel/localtunnel/issues/297

## dumb http

En lisant la doc de Git, je trouve un autre moyen d'héberger un repo git simplement : 
le protocole dumb HTTP
(https://git-scm.com/book/en/v2/Git-on-the-Server-The-Protocols)

Je fais une copie de mon repo contenant les données :

```
git clone /home/azerty/.zDemocracy/data test-origin

```

Je me place dans le dossier .git


```
cd test-origin/.git
```

J'active le hook comme marqué dans la doc

```
cp hooks/post-update.sample hooks/post-update
```

Je lance la commande qui est normalement lancée par le hook (j'ai eu besoin de faire ça sinon ca marchait pas)
Juste pour info cette commande va simplement mettre à jour (et créer si besoin) le fichier /info/refs en y consignant toutes les reférences (branches et tags) et les commits associés

```
git update-server-info
```

Je lance un serveur HTTP la dessus

```
npx http-server . -p 3333
```

Et j'essaie de cloner dans un autre répertoire

```
cd somewhere
git clone http://127.0.0.1:3333/ ./test
```

Et ca marche !

Maintenant, retentons avec localtunnel :

```
npx localtunnel -h "https://serverless.social" --port 3333
```

On clone

```
git clone https://young-duck-41.serverless.social ./test
```

Et ca marche !

Ca m'a pris environ 1H30, reste à l'implémenter proprement

# 19 : Exposer git via tunneling - 30min

Je fait une petite commande qui créé le hook, lance `git update-server-info` et lance 
un express sur le dossier .git du repository

Ca me prend 30 minutes

# Next pour avoir un exemple représentatif de l'approche :

TODO Ajouter une liste d'identity sur lesquelles faire un pull
TODO Tester un cas de conflit et modifier la commande Git pour qu'il merge automatiquement (en utilisant toujours la modif distante par exemple ?)

# Refacto et fonctions bonus

TODO Ajouter une interface d'admin permettant de naviguer dans les dossiers, lire les fichiers et les supprimer si besoin
TODO Utiliser isomorphic git au lieu du git sur le pc ?
TODO Embarquer le serveur node dans un service worker pour faire une appli 100% front
TODO Peaufiner le style sous mobile (il n'y a pas de marge à gauche)
TODO Ajouter une favicon
TODO Valider la logique de jugement majoritaire avec un framework de test maison
TODO Gérer les cas d'égalité dans les résultats
TODO Ajouter la delegation à un autre utilisateur (démocratie liquide)
TODO Tester Turbolinks pour ajouter un côté plus réactif ?
TODO Ajouter des fichier \*.schema.json qui contiennent un JSON schema pour valider les différentes valeurs de la persistance fichier
TODO Essayer d'ajouter des exemples exécutables dans la doc comme avec Elixir ?

# Interrogations :

TODO Quel genre de déploiement/hebergement adopter : centralisé ou non, client lourd ou pas, serveur fixe ou tunneling, via Tor comme Briar...
TODO La persistence fichier est verbeuse, est ce qu'une couche d'abstraction doit être ajoutée par dessus ?
TODO Les status n'ont pas de nom d'affichage comme les options ou les grades, en ajouter ?
TODO Les templates doivent ils être dans le repo de code ou dans le repo de data ?
TODO Est ce qu'on pourrait utiliser les mêmes clés ssh pour l'identité et pour la connexion git ?
