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

- 1H = 2H
- 3H30 = 5H30
- 1H = 6H30
- 4H30 = 11H
- 5H = 16H
- 1H30 = 17H30
- 3H = 20H30
- 1H = 21H30
- 30m = 22H
- 2H = 24H
- 1H30 = 25H30
- 1H30 = 27H
- 4H30 = 31H30
- 45m = 32H15
- 30m = 32H45
- 15m = 33H

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

# 20 : Synchroniser depuis plusieurs repositories - 1H30

Je dois un peu changer le process de synchronisation

Mon repository local n'a plus un seul repository origin, il a N repositories, certains en lecture seule et d'autres non

Le process pour chaque repository est :

- commiter les changements locaux (commit)
- s'ajouter dans les remote si ce n'est pas deja le cas (remote add)
- récupérer les changements (fetch)
- integrer les changement dans master du repository local (merge)
- si le repository accepte l'écriture, envoyer les changements (push)

Ca m'a pris 1H30

# 21 : Nouvelle passe sur la synchronisation - 2H45

Nouvelle modification de la synchronisation.

Le process devient :

- ajouter chaque repository dans les remote si ce n'est pas deja le cas (remote add)
- commiter les changements locaux (commit)
- mettre à jour les informations de server (update-server-info)
- pour chaque repository :
  - récupérer les changements (fetch)
  - integrer les changement dans master du repository local (merge)
  - si le repository accepte l'écriture, envoyer les changements (push)

... sauf que je n'arrive pas à cloner depuis d'autres repository à part github

Finalement il manquait un appel à 'git update-server-info' à chaque synchronisation

Ca m'a pris 2h45

# 22 : Faire une application de gestion de liste - 15min

Je fais une application simpliste qui permet de :

- lister les éléments de la liste
- en ajouter un nouveau
- en supprimer un existant
- en modifier un existant

Cela va permettre de tester des cas de conflit et choisir la meilleure stratégie

J'y passe 15min.

Quelque jours plus tard...

# 23 : Earthstar or not earthstar ? - 2H

Un projet issu de l'ecosystème SSB m'avait beaucoup inspiré pour ce projet : earthstar (https://github.com/earthstar-project/earthstar)

Je vois un tweet mentionnant que la doc a été améliorée et je jette un oeil, c'est très proche de ce que je veux faire. D'où la question : est ce que je dois continuer ou contribuer à Earthstar ?

Chaque solution a ses avantages, je prend le temps de reflechir.
Ca me prend au moins 2H+

On bascule sur earthstar parce que :

- ca serait cool de bosser sur un projet à plusieurs qui a déjà une petite communauté
- il y a déjà des choses faites que j'aimerai ajouter (identité, signature, résolution de conflits par exemple)
- le stockage fichier a l'air de pouvoir être ajouté
- le fait de ne pas avoir besoin de Git mais d'un simple serveur http pourrait être un avantage

On conserve une autre approche parce que :

- ce projet ne repose que sur 1 personne
- même si l'approche fait veux de simplicité, elle est plus complexe que la mienne pour l'instant, peut être trop ?
- la synchronisation est basique, probablement moins efficace que Git (même si je n'ai pas testé)

Cependant je me rend compte que dans les deux cas, une inconnue demeure : comment faire une application mobile qui partage un maximum de code avec mon application node + express + ejs ???

C'était l'objet de ma première dérive juste après #5 où j'avais essayé d'embarquer express dans un service worker pour faire comme si on avait un serveur web directement en tâche de fond du navigateur

Jusqu'à maintenant mes deux axes forts ont été :

- Offline first
- Pas de JS dans le browser (avec éventuellement une exception pour le service worker)

Le premier point est validé par mon approche et earthstar, donc on peut le considérer comme OK.
Le fait de ne pas utiliser de JS dans le browser implique d'avoir une logique client-serveur, quitte à ce que le serveur soit dans un service wokrker

Mon approche consistant à mettre tout express dans un serviceworker était probablement trop extreme et difficilement maintenable

Une autre approche serait d'utiliser le même routeur (celui d'express) dans le navigateur et dans l'appli express pour pouvoir utiliser la même interface :

- Node/Express : HTML/CSS => router cross platform => express
- Browser : HTML/CSS => router cross platform => service worker

Une librairie candidate pour ce genre de manipulation serait Nighthawk : https://github.com/wesleytodd/nighthawk

Mais faisons une pause. Pourquoi je ne veux pas de JS dans le browser ?

Une première raison pourrait être pour la sécurité, comme le revendique Oasis par exemple : https://github.com/fraction/oasis
Dans ce cas il suffirait d'utiliser l'appli node/express sur un PC si on est un peu parano

La vraie raison est plutôt de rester simple !

Dans ce cas, l'appli mobile pourrait simplement être une version de l'appli node/express "browserifiée" avec uniquement les briques compatibles avec le browser :

- interface HTML /CSS (views via EJS)
- routeur (via nighthawk)
- la logique de l'appli (actions)
- base de données (via une implementation fs dans le browser)

et sans :

- synchronisation via Git
- la publication via git dumb http
- la publication via localtunnel

Et dans ce cas, utiliser earthstar permettrait d'inclure la synchronisation !
(plus tout ce qui est déjà implémenté)

Ca veut dire qu'il faut dire adieu à Git pour basculer sur une solution immature par contre...

Une autre solution pour ajouter la synchronisation dans le browser serait d'utiliser isomorphic-git qui semble plus mature

Dans tous les cas, il semble que la prochaine étape soit de valider le fait qu'on peut "browserifier" l'application telle que décrite ci-dessus, earthstar ou pas.

# 24 : Browserifier l'application - 13H

Je choisis de browserifier l'application de liste que j'avais à peine entamé pour ne pas risquer de casser zDemocracy

Au bout de 3H j'arrive à charger la page d'accueil dans le browser et dans express, yes !

Mais... les requêtes POST ne passent pas dans le routeur !

Il faut que je trouve un moyen pour gerer les requêtes POST, et j'ai l'impression que le serviceworker est la seule solution.

Je pars donc à la recherche d'un routeur universel qui puisse être utilisé à la fois dans express et un serviceworker

Je tombe sur cette page qui me fait penser que si je trouve un routeur assez simple, il sera faisable de l'intégrer à express : https://router5.js.org/advanced/universal-routing#server-side-routing

Je tombe sur cette page qui me fait penser qu'il n'est pas trop compliqué de capter les requêtes dans un service worker : https://github.com/berstend/service-worker-router#javascript

La question : est ce que je garde nighthawk ou est ce que je passe sur un router de base conçu pour être universel comme https://github.com/berstend/tiny-request-router ?

Pour l'instant je garde nighthawk pour tester l'utilisation dans un serviceworker

Cette petite reflexion et recherche m'a pris 1H

Je commence à tester d'intercepter les requêtes dans un serviceworker et de les rebalancer côté appli pour que le routeur les gère.

Je m'aide des docs suivantes :

- https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle
- https://felixgerschau.com/how-to-communicate-with-service-workers/

2H plus tard j'ai la tête explosée et je crois que j'arrive à une impasse

Les routeur universels sont séduisants par leur simplicité mais ils ne prennent que rarement en compte les requêtes POST et quand ils le font ils ne gèrent pas le body

Quitte à ne pas gérer les requêtes POST, Nighthawk a donc l'air d'être une meilleure option d'autant plus que l'on peut utiliser tous les middlewares d'Express, nottament pour gérer les fichiers statiques.

Le routing de Nighthawk est déclenché quand l'url du navigateur est modifiée (évenemtn 'popstate') donc une requête POST passe innaperçue et n'est pas envoyée au routeur.

L'astuce serait donc d'utiliser le service worker pour récupérer la requête POST et son body et le renvoyer à Nighthawk pour qu'il la traite.

Ca veut dire récupérer une requête de l'API Fetch (https://developer.mozilla.org/fr/docs/Web/API/Request) et la transformer en requête Express (https://expressjs.com/fr/api.html#req)

Nighthawk fait déjà un peu cela (https://github.com/wesleytodd/nighthawk/blob/master/lib/router.js#L242) mais pour l'instant je n'arrive pas à ajouter la gestion du body.

L'application utilise un body urlencoded et non JSON.
Quand j'esaie d'utiliser le middleware d'express qui gère ca (body-parser), j'ai les mêmes erreur que quand j'essayais de mettre tout express dans le service worker (avec iconv-lite et les streams).

Que faire ?
D'autant qu'en faisant tout ca je me rend compte que les cas où la requête a du multi-form data et autres cas plus complexes ne seront pas gérés...

J'essaie de faire un projet avec uniquement body-parser et de le browserifier pour vérifier que le souci vient bien de la.

Après 1H j'ai mieux compris d'où venait le problème avec iconv-lite \o/

En fait iconv-lite se base sur la présence ou non de process.versions.node pour charger les streams.
Normalement, cette variable est désactivée quand on build avec Browserify.
Sauf qu'on charge le shim de BrowserFS pour process, ce qui fait que process.versions.node est finalement définit.

En ajoutant la ligne suivante cela semble supprimer cette erreur :

```
process.versions.node = undefined // to fix the iconv-lite error with streams
```

J'arrive à utiliser body-parser avec browserify mais je dois toujours trouver un moyen de gérer les POST, et la perspective de modifier Nighthawk et ajouter ces transformations de format de requêtes me décourage... c'est alors que je retombe sur browser-express (https://github.com/williamcotton/browser-express) qui est un peu la même chose que Nighthawk (il revendique l'inspiration et à vrai dire c'est en grande partie du copier/coller) mais il affiche en plus une gestion du POST dans les exemples !

Il utilise un serviceworker ? Non ! il utilise un petit hack qui permet de capter les évenements submit des formulaires. J'avais écarté cette idée en la classant trop vite dans la catégorie "bidouille pas très propre" mais finalement ca me paraît plus simple et viable que de se lancer dans l'utilisation d'un serviceworker.

30 minutes de plus pour tester et... ca appelle bien la route POST \o/ ... et ensuite j'ai une autre erreur sur promisify qui n'est pas définit, mais au moins j'ai reglé ce problème.

Je prend 30 minutes pour isoler le problème sur promisify et je constate que c'est une histoire de dépendance transitive de browserify, ca s'annonce coton. Je poste une issue en espérant que quelqu'un m'explique la situation : https://github.com/browserify/browserify/issues/1978

J'essaie entre temps d'utiliser `npm-force-resolutions` mais sans succès (https://github.com/rogeriochaves/npm-force-resolutions).

Finalement je trouve util.promisify qui semble fonctionner (https://github.com/ljharb/util.promisify)

Je rajoute l'initialisation de BrowserFS que j'avais oublié et hourra !!!!
J'arrive enfin à ajouter des éléments dans ma liste (donc les requêtes POST sont exécutées)

Je fais un peu de ménage dans le code et je teste de mettre BrowserFS en mode IndexedDB et paf ! encore un bug, une erreur "Error: ENOTSUP: Operation is not supported"
Une issue semble être liée mais n'est pas résolue : https://github.com/jvilk/BrowserFS/issues/268

Je fais une pause avec cette erreur et je prends 30 min pour refactorer le code.

Je rejette un oeil à l'erreur, en fait c'est du au fait que mkdirSync n'est pas supporté par l'implémentation IndexedDB (qui est purement asynchrone)

Je m'engage donc dans une réécriture du stockage fichier en asynchrone avec async/await.
Au bout d'2H je pense avoir terminé mais aucun élément ne s'ajoute quand je clique sur le bouton...

Il semblerai que ca vienne du fait que fs.access() n'est pas implémentée : https://github.com/jvilk/BrowserFS/issues/128

30 min de plus pour utiliser stat() au lieu de access() et ca marche !
On a maintenant une application dans le navigateur qui sauvegarde les fichiers dans la base indexeddb !

Ca me prend 13H

# 25 : Utiliser isomorphic-git - 1H30

Prochaine étape : faire marcher git dans le navigateur

Au passage l'utilisation de Git ne dépendra plus de l'implémentation locale.

Au bout d'1H30min je me rend compte que isomorphic-git ne supporte pas le protocol dumb HTTP, celui que je voulais utiliser en mode client lourd local :-/

J'ai l'impression que depuis que j'ai commencé à browserifié l'application, j'ai mis le doigts dans une complexité inévitable.

Il faut que je fasse une pause pour réflechir à quelle direction je veux privilégier...

# 26 : Ajout de tinify - 15min

On continue encore un peu

A vrai dire la seule solution alternative à Git que je vois est WebDav
Mais je préfère Git parce que :

- il est "passif", pas besoin d'héberger un serveur, un simple dossier suffit
- il s'applique directement à la couche fichier, pas besoin de coder une couche de synchronisation manuellement
- il a l'air plus performant que WebDav (à vérifier) et garde un historique, ce qui peut être intéressant

Du coup je rajoute le plugin `tinify` faire un peu baisser la taille du bundle dans le navigateur

# A côté : webopen

J'ai bien passé deux soirées à créer un utilitaire "webopen"

Lien : https://github.com/acailly/webopen

Ca utilise deskgap pour ouvrir une URL dans la vue native

# 27 : Création de git-native et git-isomorphic - ???

Je revoie le module synchronization-git pour qu'il utilise isomorphic-git quand la commande git n'est pas dispo

TODO30min

# Next pour avoir un exemple représentatif de l'approche :

TODO Refactorer la partie Git pour utiliser Git s'il est présent et isomorphic-git sinon
TODO Sortir start-list-browser et start-list-express de list-express pour rendre list-express indépendant
TODO Revoir les noms des différents modules : expose-gitdumbhttp/localtunnel, build-browser, serve-node/browser, identity-uuid, app-list/zdemocracy, storage-file, synchronization-git  
TODO Ajouter une commande pour lancer l'appli via webopen

# Refacto et fonctions bonus

TODO Faire une application de gestion de liste pour tester plus simplement les cas de conflits
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
