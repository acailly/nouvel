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

# 16 : BILAN INTERMEDIAIRE - Combien de temps passé jusqu'à maintenant ? - 15m

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

# 27 : Création de git-native et git-isomorphic - 1H30

Je revoie le module synchronization-git pour qu'il utilise isomorphic-git quand la commande git n'est pas dispo

Ca me prend 1H30

# 28 : Reorganisation des dossiers - 1H

Je renomme les dossiers en les classant par intention :

- app-\* : application
- dist-[browser,node] : distribuer l'application
- expose-[gitdumbhttp,localtunnel] : exposer les données de l'application
- synchronization-[git] : synchroniser les données
- git-[native,isomorphic] : implémentation de git
- storage-[file] : stocker les données
- identity-[uuid] : fournir une identité

Ca me prend 1H

# 29 : Gestion des secrets - 2H15

Un point reste à élucider : comment gérer les secrets ? (login, motdepasse, token...)

Ces secrets ne peuvent pas être définis à l'avance, il doivent pouvoir être renseignés par l'utilisateur

Ils doivent donc être stockés par l'application, mais ils ne doivent pas être partagés aux autres utilisateurs, ils ne doivent pas se situer dans un endroit qui sera synchronisé avec Git.

On dirait qu'il faut deux stockages : un qui contiendra les données de l'application et qui sera synchronisé avec les autres utilisateurs, et un qui contiendra les données personnelles de l'utilisateur et qui ne sera pas synchronisés avec les autres utilisateurs

Or actuellement, une seul stockage est prévu, il est pointé par le fichier `storage.js` à la racine.

Je vois deux solutions :

- ajouter la possibilité de gérer plusieurs stockages
- faire en sorte que la synchronisation puisse synchroniser une sous partie du stockage

Dans un lecteur de flux RSS fait maison que j'utilise, je ne synchronise qu'un sous ensemble des données utilisées par l'application, je vais me lancer dans cette voie

Je commence par renommer `storage.js` par `@storage.js` et je fait de même pour `@identity.js` et `@configuration.js`
Cela permet de mieux voir les "aspects" partagés de l'application
Ca me prend 15min

... et finalement je me rend compte qu'on stocke déjà des données en dehors du stockage puisqu'on stocke l'identité dans le fichier `~/.zDemocracy/identity.json`

Du coup on pourrait stocker les secrets dans un fichier `~/.zDemocracy/secrets.json` ?
Espérons que ca marche en mode Browser !

Ca pourrait permettre de chiffrer ce fichier par la suite.
Allez, on part sur la création de `@secrets.js` et de `secrets-plaintext`

Ca me prend 5min

Viens ensuite la question de comment l'utiliser dans la synchronisation Git

L'idée est que, si les identifiants du repository Git ne sont pas renseignés, l'application les demandes

Il faudrait donc une page pour renseigner les identifiants Git
... et par la suite on aura surement besoin d'une page pour renseigner les différents repositories...
... et on voudra surement stocker ces repositories ailleurs que dans la config...
... et on retombe sur le fait de ne synchroniser qu'une sous partie du stockage !

OK donc on va :

- 1/ faire en sorte de synchroniser une sous partie du stockage
- 2/ créer une interface pour ajouter/supprimer un repository
- 3/ stocker les repositories dans une partie non synchronisées du stockage

Le 1/ est fait en 30min
Je prend 10min pour ajouter une option `syncEnabled` pour désactiver la synchro facilement

Je passe 30min sur l'étape 2 et je me rend compte qu'il vaut mieux stocker les identifiants git dans le stockage classique, ca va être plus simple
Même si le module `secrets-plaintext` pourrait être utilisé pour autre chose, je préfère le supprimer pour l'instant

Maintenant je dois faire en sorte que la synchronization git aille chercher les repositories dans le stockage
Au passage je rajoute une config `useNativeGit` permettant de désactiver l'utilisation du Git natif

Ca me prend 45min

Au final 2H15 pour avoir une appli qui peut configurer ses repositories Git \o/

Prochaine étape : faire un build Desktop et un build Browser pour pouvoir tester l'édition conjointe de liste

# 30 : L'heure du test - 2H

Je prends 15 min pour trouver et mettre un nouveau host pour localtunnel

Je prends 10min pour rajouter un menu vers les repositories depuis la page de la liste

... et la je me rend compte que la navigation ne marche pas en Browser, il me semblait pourtant que c'était réglé !
Je me replonge dans le code de browser-express et je me rends compte que toutes les options sont désactivées par défaut, dont la détéction du clic sur un lien
J'active certaines options et ca marche mieux
Ca m'a pris 45 min

Je me rends compte aussi que le bouton précédent ne fonctionne pas.
Je me plonge dans la gestion de l'historique faite par browser-express... pour me rendre compte au bout de 30min que c'est la fonction `render` que j'ai codé pour le browser qui n'utilise pas `res.send` et donc qui ne complète pas l'historique

Cette correction m'évite en plus d'avoir à utiliser une balise div custom pour y accrocher l'HTML rendu, que du bonus !

Je teste d'ouvrir l'appli sur mon smartphone, mais c'est trop lent via localtunnel.
En clonant l'appli sur mon smartphone j'arrive à lancer l'application.
Ca me prend 10min de plus.

Prochaines étape :

- tester la modification en même temps sur le même github
- se débrouiller pour que l'appli browser n'ait plus besoin du serveur (cache PWA ?)

# 31 : Offline dans le browser - 2H30

J'ai ajouté un service worker dans l'application pour mettre en cache toutes les ressources non .js

Ca m'a pris 2H30 mais ca marche bien :-)

# 32 : Deployer sur github pages - 3H

Première étape : déployer l'appli de façon à facilement pouvoir la récupérer sur mobile

Mais avant ca un petit bug avec Git qui me prend 15 min à corriger

J'installe `gh-pages` et je le configure pour déployer les résultat du build situé dans... mince, le build est généré au milieu de pleins d'autres fichiers qui n'ont pas à être exposés

Je prend le temps de revoir les scripts de build pour générer l'appli browser dans le dossier : `output/distrib-browser`
Au passage je renomme `dist-*` en `distrib-*`, `dist` étant souvent utilisé pour le résultat d'un build justement
Ca me prend 45min et ca me permet de corriger un bug : je n'avais pas mis le bundle JS dans la liste des fichiers à mettre en cache :-)

Maintenant que l'appli est bien générée, je teste le déploiement avec `gh-pages` : les fichiers sont bien là mais l'appli ne s'ouvre pas

Premier souci : l'url du bundle est absolue (`/bundle.js`), je la met relative (`bundle.js`)

Deuxième souci, il semblerait que `browser-express` utilise des urls absolues également.
S'en suit 1H30min+ pour ajouter la gestion d'une base URL custom dans `universal-render-middleware`

Mais ca ne marche toujours pas, `browser-express` va bien chercher les fichiers au bon endroit, l'application semble marcher correctement, mais dès la première navigation la base URL disparait de la barre d'addresse du navigateur
Ce qui fait que si on rafraichit la page, il échoue à recharger la page

En cherchant plus loin je me rend compte que ce sont les appels à `redirect("/toto")` dans les actions qui ne prennent pas en compte la base URL
Je patch la fonction redirect pour prendre en comtpe la base URL dans le browser, ca me prend 30min

Et ca marche !!! L'appli est maintenant accessible sur le net !

# 33 : BILAN INTERMEDIAIRE - Combien de temps passé jusqu'à maintenant ? - 15m

A l'étape 16 on était à 33H

- 30m = 16H30
- 1H30 = 18H
- 30min = 18H30
- 1H30 = 20H
- 2H45 = 22H45
- 15min = 23H
- 2H = 25H
- 13H = 38H
- 1H30 = 39H30
- 15min = 39H45
- 1H30 = 41H15
- 1H = 42H15
- 2H15 = 44H30
- 2H = 46H30
- 2H30 = 49H
- 3H = 52H
- 15min = 52H15

52H15, soit l'équivalent de 6,5j de 8H de travail non stop

# 34 : Tester la modification en même temps - 8H30

Je voudrais tester la modification en même temps sur desktop et mobile, il faut donc que j'active la synchro git sur la version Browser

Je prends 15min pour corriger un bug quand on initialise le projet sur un nouveau PC

15min de plus pour corriger un bug pour le choix de l'implémentation de Git

Et revoila les bugs lié à mkdirSync qui n'est pas supporté par IndexedDB :-/
Je les ai bien supprimé, mais j'ai laissé les appels à `mkdirp.sync()`
Ca me prend 15min de réécrire ces appels en utilisant la dépendance `make-dir` à la place

Une fois cette correction effectuée je tente à nouveau de faire marcher la synchro git sur browser

Je complète l'implémentation du merge pour gérer le cas du repo vide, mais j'ai toujours des comportements bizarres, je ne récupère qu'un seul commit dans l'historique et la synchro ajoute sans cesse de nouveau commits... ca fait 2h de plus passées la dessus

Je décide de faire marcher isomorphic-git sur node avant de le faire marcher dans le browser, pour ne pas perdre de temps à chaque fois en rebuildant l'application, et aussi pour pouvoir débugger l'état du repository avec le vrai Git natif.
Je me rends compte que la fonction `listFiles` que j'utilisais pour récupérer la liste des fichiers à commiter n'est peut être pas la bonne commande, ou en tout cas elle ne me rend pas les résultats attendus.
Je galère, je teste des choses (nottament https://isomorphic-git.org/docs/en/statusMatrix#q-what-files-have-unstaged-changes et https://isomorphic-git.org/docs/en/statusMatrix#q-what-files-have-been-modified-since-the-last-commit qui me font découvrir la fonction `statusMatrix`)... et je me rends compte qu'il y a l'air d'y avoir un bug sous Windows sur l'affichage des status !!!
Je renseigne une issue ici : https://github.com/isomorphic-git/isomorphic-git/issues/1275
Ca m'a pris 1H45 de plus, et pour l'instant je suis bloqué :-/

Je continue sur Linux en attendant, car le problème ne s'y produit pas. 1H de plus.

Finalement les corrections sous Linux ont eu l'air de regler le problème sous Windows... étrange...

Je rajoute un bouton "Actualiser" dans l'application pour pouvoir voir les mises à jour effectuées par les autres participants. Ca me prend 30min.

Je me rends compte qu'il y a encore un souci dans le push avec isomorphic git.
Ca a l'air d'être cette issue : https://github.com/isomorphic-git/isomorphic-git/issues/398
Ca me prends 45min.

Je fait un test de modification concurrente entre :

- Alice : une version locale express, git natif, lancée sur mon PC, avec les droits de push
- Bob : une version browser PWA, isomorphic git, lancée sur mon PC, avec les droits de push
- Charlie : une version browser PWA, isomorphic git, lancée sur mon PC, sans les droits de push

Test 1 : Il y a 1 élément dans la liste, Alice ajoute un élément, Bob et Charlie actualisent et voient cet élément
C'est un échec, l'élément d'Alice est bien envoyé mais disparait ensuite quand Bob se synchronise :-/

J'ai essayé pendant 1H de trouver pourquoi Bob effacait le commit
Je reproduis le cas quand Alice et Bob utilisent tous deux isomorphic git et que Bob ajoute l'élément, ce qui permet de reproduire le bug dans la version local express, bonne nouvelle
Et ca a donc l'air de venir de la gestion des changements à commiter avec isomorphic git

Après 30min, j'ai l'impression que c'est toujours du à ce souci sur Windows (https://github.com/isomorphic-git/isomorphic-git/issues/1275), il faudra que j'essaie sur Linux

En attendant je teste avec deux git natifs pour valider le fait que les modifs se font bien, ca me prend 15min et c'est un succès !

Je teste avec succès le fait qu'Alice ajoute un TODO et que Bob le recoive, et le fait qu'Alice et Bob ajoutent un TODO chacun et que chacun finissent par afficher ces deux TODOs (Bob a un échec de push quand il essaie de pousser en même temps que Alice, mais à la synchro suivante ca passe)

Au total 8H30min et un test bien moins ambitieux que ce que j'espérais (deux gits natifs sur le même PC)

# 35 : Bug bloquant - 6H15min

Comment on se dépatouille de https://github.com/isomorphic-git/isomorphic-git/issues/1275 ???

Le mainteneur de isomorphic-git a l'air toujours actif mais pas très réactif, je ne vais pas lui en vouloir

J'ai donc l'impression qu'il va falloir que je corrige moi même le bug, que j'essaie du moins

Le bon côté c'est que comme ca je pourrais juger si cette brique, dont je me serais passé avec plaisir s'il y avait eu une alternative plus simple, est maintenable pas un développeur qui n'y connait pas grand chose sur le projet

Le mauvais côté c'est que ca peut me prendre BEAUCOUP de temps, que le succès n'est pas garanti et que ca peut remettre en cause pas mal de choses sur mes choix passés :-/

Allez, j'essaie.

Je décide de repartir d'un repo qui isole le bug, pour que ce soit plus simples.
Je créé le repo suivant : https://github.com/isomorphic-git/isomorphic-git/issues/1275
Ca me prend 45min

Je creuse pendant 45min de plus et j'identifie plus précisément où se trouve le problème, sans avoir pour autant de piste de solution : https://github.com/isomorphic-git/isomorphic-git/issues/1275#issuecomment-743766873

Pistes à explorer :

- ca a l'air d'être lié à windows, creuser le sujet sur le net
- utiliser node 14 comme sur WSL

Je commence par mettre à jour Node de la version v12.18.4 à v14.15.1
Bilan : ca ne corrige rien :-(
15min

J'oriente donc mes recherches vers "node inode windows"
Je me rends compte que c'est peut être lié à Git finalement, en affichant l'index il semblerait qu'il y a bien 0 écrit là où est écrit l'inode
(https://git-scm.com/docs/index-format)
(https://stackoverflow.com/a/25806452)
Je tente de mettre à jour Git. Bilan : toujours le bug :-(

Ca va être compliqué à corriger si ca vient de Git...
Au bout de 3H d'investigation, j'ai identifié que le problème venait en fait des caractères de fin de ligne (CRLF sous Windows, LF sous Linux), classique...

Cette subtilité n'est pas gérée par isomorphic-git, et vu l'ampleur des changements que ca peut entraîner, il y a peu de chance que ca soit le cas dans un avenir proche

J'ai trouvé un moyen de contourner ce problème, en forcant le caractère de fin de ligne LF dans un fichier `.gitattributes` qu'on met sur le repo :

```
*		text eol=lf
```

Je fait un nouveeau test de modification concurrente entre :

- Alice : une version locale express, git natif, lancée sur mon PC, avec les droits de push
- Bob : une version locale express, isomorphic git, lancée sur mon PC, avec les droits de push

Il y a toujours le problème d'avant, à savoir que quand Alice ajoute un élément dans la liste, Bob le supprime à la synchronisation d'après...
Encore 1H15min d'investigation pour trouver que `git merge test master` et `isogit merge --theirs="remotes/test/master" --author.name="Mr. Test" --author.email="mrtest@example.com"` n'ont pas le même effet, le premier rappatrie les nouveaux éléments, le deuxième les supprime
Le comportement est reproduit sur Windows et Linux

Il va falloir que je fasse un nouveau mini repo pour isoler le problème...
1H après, voici la nouvelle issue postée sur le repo d'isomorphic-git : https://github.com/isomorphic-git/isomorphic-git/issues/1286
30min après avoir naviguer dans le code d'isomorphic-git, je découvre que la commande merge ne fait que modifier la ref mais ne la checkout pas
J'ajoute un checkout juste après mon merge et ca fonctionne \o/

Je fait un nouveau test de modification concurrente entre :

- Alice : une version locale express, git natif, lancée sur mon PC, avec les droits de push
- Bob : une version browser PWA, isomorphic git, lancée sur mon PC, avec les droits de push

Ces 30min de tests marquent la fin d'une belle galère !

Total 6H15min

# 36 : Une faille dans le routeur côté browser - 1H30

(interlude: petite correction qui me prend 15min)

Il y a encore un problème qui me paraît encore assez bloquant pour potentiellement remettre en cause les choix techniques effectués

Quand on ouvre l'appli PWA sur http://localhost:9999/zDemocracy-lowtech/ et qu'on clic sur le menu 'repositories', on arrive sur http://localhost:9999/zDemocracy-lowtech/repositories

Si on rafraichit la page à ce moment (CTRL+R), alors on obtient une 404 avec le message suivant :

```
Cannot GET /zDemocracy-lowtech/repositories
```

Comment faire pour que le routeur capte et traite la requête qui arrive à ce moment la ?

Après 1H15, la nouvelle stratégie du service worker a l'air de fonctionner :-)

Total : 1H30min

J'ai maintenant le sentiment d'avoir un fonctionnement relativement stable et sans gros blocage pouvant remettre en cause le tout
La prochaine étape me semble de faire une application réelle et utile : un lecteur de flux RSS

L'appli semble bien parti pour fonctionner dans le browser, mais les CORS bloquent la récupération du contenu des flux

# 37 : Lecteur de flux RSS - 13H30

L'objectif de cette étape est multiple :

- mesurer le temps que je met à construire une petite app réellement utile (avec de la chance, ce ne sera pas beaucoup)

- commencer à utiliser moi même le fruit de ce projet (pour garder la motivation)

- fournir un support concret pour parler de ce projet, au lieu de dire "on pourrait faire ci, on pourrait faire ca"

- fournir une application d'exemple pour tester de nouvelles formes de distribution (sous mobile avec Capacitor par exemple ?)

Au bout d'1H45, j'ai une appli qui permet d'ajouter des feeds et de télécharger leurs news pour les afficher sur la page d'accueil
J'ai été aidé de la base de la Todo list d'un côté, et du code de récupération de flux RSS d'un autre projet

1H45 après j'avais la possibilité de télécharger dans leur dossier respectif
et j'avais migré tous mes feeds depuis mon appli existante

1H après les news étaient triées par date, la suppression était gérée, ainsi que le fait de ne pas ajouter une deuxième fois des éléments qui avaient déjà été ajoutés

1H après, j'ai supprimé les items déjà lus

2H après j'ai ajouté la gestion du feed twitter à la main (il n'y a pas encrore moyen d'ajouter un feed dans l'UI)

Maintenant le dernier blocage vient de la gestion des secrets. Il y a le github token utilisé pour la synchro avec le repository git, et les twitter tokens pour récupérer les news twitter.

Des recherches précédentes m'ont donné comme conclusion que je n'allais pas facilement trouver de solution bien sécurisée qui fonctionne dans le browser et dans node sans avoir à investir beaucoup de temps

Une des options attirantes est la génération d'une clé non extractable générée avec l'api Browser WebCrypto et stockée dans IndexedDB (qui peut stocker directement la clé sans avoir à la transformer, apparement)
... Mais cette API n'est pas dispo sur Node, je n'ai pas investit assez de temps pour savoir s'il y avait des choses équivalente, ni même si c'était utile

En revanche je suis tombé sur OpenPGP.js (https://github.com/openpgpjs/openpgpjs), maintenu par ProtonMail, qui offre PGP dans le browser et dans Node.
Elle offre même le chiffrement symétrique à l'aide d'un mot de passe.

Comme première solution, cela me parait correct :

- au chargement, on demande le mot de passe à l'utilisateur
- on stocke ce mot de passe en mémoire
- à chaque fois qu'il faut lire une donnée chifrée, on utilise OpenPGP.js avec le mot de passe stocké en mémoire

Il y a sûrement des problème de sécu dues au mot de passe se trouvant en clair en mémoire, d'autant que je n'ai pas du tout regardé les CSP sur ce projet.
Bref, la sécu n'est pas un sujet sur lequel je pourrais vanter les mérites de ce projet, pour l'instant du moins.

Ce qui me plait, c'est qu'on reste sur des approches de chiffrement qui sont matures (OpenPGP), même si elles ne surement pas parfaites.

1H45 après le mécanisme de gestion de secret est ajouté, et il est validé avec Github et Twitter

15min après j'ai ajouté les dossiers news/feed et news/\_deleted_flag dans las synchronisation Git

J'essaie de tester la PWA et les résultats sont encourageants sauf que (et m....) la redirection redirect("back") utilisée pour certaines actions ne prend pas en compte la base URL
Le gestion de la base URL se fait déjà à la main car "browser-express" ne la gère pas nativement
Je rajoute la gestion de ce cas dans le code spécifique au browser, au final ce n'est pas très compliqué
1H s'est écoulée

Ensuite je me rend compte que quand la synchro git est longue, la suivante démarre avant que la première ait terminée, ce qui a de grande chances de mettre la machine à genoux
Du coup je change le mécanisme de synchro pour qu'il attende la fin d'une itération pour lancer la suivante
Au bout de 45min, j'ai bien modifié la synchro mais je constate que les données ne sont pas rappatriées puisque je ne vois aucun feed
D'autant plus que la synchro semble s'arrêter sans pour autant renvoyer une erreur...

Je me rends compte rapidement que je m'étais trompé dans le nom du dossier à synchroniser (feed au lieu de feeds), donc c'est normal si je n'avais aucun feed qui apparaissait
Je constate également que l'ajout des dossier (git add) est trèèèèèès long et fait souffler le ventilo du PC.
Je fais un petit script de test sur le fait de faire un "git add" sur le dossier "news/\_deleted_flag", et ca donne 100s pour 2400 fichiers qui n'ont aucun changement, pas top :-/
Au bout d'1H15, je n'ai toujours pas trouvé de moyen d'accélerer ce temps. Ca veut dire que chaque synchro mettera 100s quand on utilise isomorphic-git... c'est une coup dur !

Je prends quand même 30min pour retester la PWA, les feeds sont bien récupérés (cool) mais l'étape "git add" prend un temps infini (pas cool) et en plus la plupart des feeds ne peuvent pas être récupérés parce qu'ils ne gèrent pas les CORS (pas cool, mais à la limite s'il n'y avait que ca, on pourait utiliser des proxy CORS dispos)

Je passe 45min à tester si la méthode d'ajouter tout par défaut fonctionne, en listant les fichiers à l'aide de globby (https://isomorphic-git.org/docs/en/snippets#git-add-no-all-), mais cela semble pire

Je tente une autre approche, celle d'utiliser `wasm-git` (https://github.com/petersalomonsen/wasm-git) au lieu de `isomorphic-git`. Il y a moins de star, ca a l'air moins utilisé, mais ca a l'air d'être plus proche du Git original, donc potentiellement plus rapide et plus complet
Je me lance pour écrire une implémentation `git-wasm` et puis je me rend compte que ca va encore me prendre un temps fou et j'ai déjà l'impression qu'il manque des choses... que faire ?
Il s'est encore écoulé 1H et je ne sais pas comment continuer...

Au total, 13H30min sur cette étape

# 38 : Récapitulatif des modules - 30min

Pour me changer les idées, je fait une page de doc avec les différents modules de ce projet, leurs implémentations existantes et possibles

Ca me prend 30min

# 39 : Lecteur RSS - la suite - 1H45

Le fait de faire la liste des modules m'a donné plein d'idées alternatives pour me débloquer : utiliser pouchdb par exemple, qui semble être assez mature pour ne pas détonner parmi les autres choix effectués. Ou encore un serveur Webdav, qui pour le coup est encore plus Low Tech que tout le reste.
Toutefois tant que l'espoir de faire marcher le projet avec Git persiste, je préfère garder ce choix car :

- il est BEAUCOUP plus simple aujourd'hui d'avoir un repo Git accessible sur le net gratuitement que d'avoir un serveur compatible pouchdb, webdav ou autre
- ce choix permet une totale transparence des données et une synchronisation/backup parralèlle hyper simple

Bref je décide de m'entêter sur Git et me résigne à simplifier l'application puisque isomorphic-git montre déjà ses limites

Permière piste : au lieu de stocker un fichier par item lu dans `_deleted_flag/items/nom_du_feed/id_de_l_item.json`, je vais stocker la liste des items lus par une personne spécifique dans un fichier `_deleted_flag/items/nom_du_feed/id_du_user.json`
Ca devrait faire baisser le nombre de fichier et j'espère permettre à isomorphic-git de traiter ce volume en un temps raisonnable
Au bout d'1H15, j'ai une implémentation qui fonctionne. Il me faut maintenant reprendre les données existants (plus de 5000 items déjà supprimés) pour appliquer le nouveau format.
Ca me prend 15 minutes, en utilisant directement l'api du module `storage-file`.

Et cette fois ci la PWA arrive à synchroniser les fichiers en un temps (long mais) acceptable \o/

Reste le problème de CORS
Je teste d'utiliser le proxy de zserge (https://github.com/zserge/headline/blob/master/app.js)
15 min après j'ai la plupart des feeds qui se synchronisent SAUF certains dont Twitter :-/
Et je me rends compte que la suppression ne fonctionne pas

Bref, ya du mieux, mais je ne peux pas vraiment dire que c'est une solution viable pour un projet avec de plus grandes ambitions (pas encore?)

Total : 1H45min

# 40 : On change de cap, storage-pouchdb - 2H30

Je sens que le fait d'utiliser Git dans une PWA est de moins en moins en phase avec mon idée de faire quelque chose avec des technos matures que l'on peut facilement apprivoiser. D'autant que niveau performance, même si ce n'était pas un critère essentiel, ce n'est vraiment pas terrible.

Dans mes recherches pour une autre technologie mature de synchronisation, je n'ai pas trouvé grand chose autre que PouchDB

Allons y, après tout c'est une techno qui existe depuis un bout de temps, qui a l'air d'être encore utilisée et qui a l'air de privilegier la simplicité (le slogan de CouchDB était "time to relax")

Mon seul regret est de ne pas profiter de la facilité d'avoir un repository Git, il va falloir héberger une instance de CouchDB quelque part je le crains.

Il va falloir aussi décider si je garde l'espèce d'abstraction (à base de clé valeur) que j'avais utilisée au dessus du stockage fichier

Je me lance, je créé le dossier storage-pouchdb
Ca ne me prend qu'1H15 pour refaire les mêmes fonctions que `storage-file`, alors que je n'avais jamais utilisé PouchDB avant, c'est une bonne surprise

Je créé un compte heroku et y mettre une instance couchdb à l'aide du buildpack suivant : https://elements.heroku.com/buildpacks/creativegeekjp/heroku-buildpack-couchdb
(`heroku buildpacks:set https://github.com/creativegeekjp/heroku-buildpack-couchdb.git`)
Au bout de 45min je n'arrive toujours pas à le faire marcher
Je bascule sur une autre option : le free tier sur cloudant (https://www.ibm.com/cloud/free)
Au bout de 15min j'ai reussi à créer une instance cloudant et je cherche comment marche l'auth. Mais je me dis que ce serait aussi simple avec un `pouchdb-server` sur heroku (https://github.com/pouchdb/pouchdb-server)

... sauf qu'en cherchant sur le net je tombe sur un projet qui pourrait beaucoup ressembler à ce que je suis en train de faire : https://github.com/lybekk/offPIM
Il dit qu'il arrive à se connecter à cloudant en précisant simplement une URL et un login/mot de passe.
Du coup je passe 30min en plus pour trouver où se trouve les crédentials à utiliser, il fallait bien préciser à la création de l'instance qu'on voulait le mode d'authentification legacy.

Total : 2H30

# 41 : expose-pouchdbserver - 45min

Pour tester la synchronization pouchdb, qui remplacera `synchronization-git`, le plus pratique serait de lancer un serveur en local (j'utiliserai l'instance cloudant pour mon usage réel)

Je créé donc un module `expose-pouchdbserver` qui lance un serveur `pouchdb-server` (https://github.com/pouchdb/pouchdb-server)

Ca me prend 45min

# 42 : pouchdb dans le browser - 45min

Etape suivante, revoir le build browser pour utiliser pouchdb au lieu de browserfs et isomorphic-git

Normalement il va y avoir beaucoup de chose à supprimer, c'est une bonne nouvelle :-)

J'en profite au passage pour supprimer les dépendances que je n'utilise plus : isomorphic-git, browserfs...

Ca me prend 45min

# 43 : @pouchdb - 15min

Pour l'instant j'instancie un nouvel object PouchDB à chaque fois que je veux faire une entrée en base

Je fait un fichier `@pouchdb.js` qui pointe vers `pouchdb-default`

Ca laisse de la place pour tester d'autres configurations de pouchdb (plugins différents, adapter sqlite, etc.)

Ca me prend 15min

# 44 : synchronization-pouchdb - 1H30

Je commence le module de synchro avec PouchDB, normalement ca devrait être bien plus simple qu'avec Git

Au bout de 30 minutes j'ai un truc qui est supposé marcher avec un remote mis en dur dans le code, sauf que j'ai une erreur de CORS sur le expose-pouchdbserver

```
"The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '\*' when the request's credentials mode is 'include'"
```

Ce sera corrigé en mettant `{origin: true, credentials: true}` dans les options du middleware express `cors`

15 minutes après j'arrive à me synchroniser \o/

La différence avec la synchro git, c'est que la quasi totalité des données de l'appli va être synchronisée, il faut donc que je fasse attention à bien stocker les infos de remote dans une clé locale (`_local/xxx`) qui n'est pas répliquée

45min après la gestion des remotes était fonctionnelle (y compris la gestion des mots de passe, même si je n'ai pas encore testé)

Total : 1H30

# 45 : identity et autres bugs - 30min

Il y a une erreur dans le browser quand j'essaie de marquer un élément comme lu
Ca semble venir du module identity, qui est toujours basé sur un fichier

L'idée serait de la stocker dans `_local/identity`

Je corrige ca plus quelques autres trucs, ca me prend 30min

# 46 : bouton tout supprimer - 15min

Pour migrer de Git à PouchDB, je vais :

- me mettre à jour sur la version Git
- ajouter les flux sur la version PouchDB
- tout télécharger sur la version PouchDB
- tout marquer comme lu sur la version PouchDB

Pour faire ca, il faut une fonction "Tout Supprimer"

Je met 15min à la faire

# 47 : migration vers pouchdb - 2H

Comme prévu, voici la procédure :

- me mettre à jour sur la version Git
- ajouter les flux sur la version PouchDB
- tout télécharger sur la version PouchDB
- tout marquer comme lu sur la version PouchDB

Je met 15min pour ajouter tous les flux... sauf le flux twitter !
Actuellement l'interface ne permet pas d'afficher un fil twitter, et ca ne posait pas de problème quand on pouvait l'ajouter manuellement

Sauf qu'on ne peut plus. Deux options : j'ajoute un formulaire dédié, ou je créé un explorateur de fichier pour éditer le contenu des objets.

Avant de décider je lance la récupération des news des autres fluxs, et ca plante, et je ne vois rien, et contrairement au mode fichier je ne peux pas explorer les entrailles... du coup ca me décide : je prends 15min pour faire un explorateur de fichiers qui me montre qu'il n'y a aucune news qui a été récupérée :-/

Au bout de 15min de plus je me rends compte que le fait de chercher entre "toto/" et "toto/\uffff" ne renvoyait pas les clés qui commencaient par des émojis comme "toto/📢 tata"

15 min me permette de regler ce souci en utilisant `\u{10ffff}` (voir mon commentaire ici : https://github.com/pouchdb/pouchdb/issues/6456#issuecomment-753092061)

15 minutes de plus pour supprimer toutes les news récupérées

Sauf que je ne vois toujours pas le dossier `items` ou `_deleted_flag` dans mon nouvel explorateur
Encore 15min pour me rendre compte que ca venait d'une erreur de copier coller ^^

30min de plus pour ajouter la possibilité de modifier et de supprimer un item et je peux ajouter mon flux custom twitter \o/

Total : 2H

# 48 : changement de CORS proxy - 15min

Au lieu d'utiliser le CORS proxy de zserge, j'essaie d'en trouver un autre qui fonctionne mieux, je trouve celui ci : https://allorigins.win/

Ca me prend 15min

# 49 : Utilisation de l'instance Cloudant - 30min

Maintenant que tout marche plutôt bien sous node (il reste des soucis dans le browser), il ne me reste plus qu'à ajouter un remote qui soit tout le temps online pour pouvoir utiliser l'appli sur mon PC et sur mon téléphone (via node dans termux)

Comme j'ai créé une instance Cloudant et que c'est gratuit en dessous des 1Go utilisé, j'ajoute celle ci dans l'appli. On verra plus tard s'il n'y a pas d'autres meilleures solutions.

Au passage ca permet de valider que l'appli marche 1/ avec un remote "professionnel" 2/ avec un remote avec authentification

C'est l'occasion de regler un bug : la synchronisation n'attend pas que la précédente soit terminée pour se lancer

Ca me prend 30min, ca y est ! L'appli utilise maintenant PouchDB pour la synchronisation et le stockage, et elle fonctionne avec des remotes externes \o/

# 50 : Faire marcher tout ca dans le browser - 2H15

Tout a l'air de marcher dans le browser sauf le flux twitter

C'est encore un problème de CORS, sauf qu'il n'y a pas de paramètres pour préciser une URL custom pour l'API Twitter (on pourrait mettre une adresse qui passe par corsanywhere)

Je trouve une autre lib JS pour gérer twitter, Twit (https://github.com/ttezel/twit) mais il y a l'air d'y avoir les mêmes soucis

En regardant le code de la lib actuelle, node-twitter, je vois que les URLs utilisée peuvent être données en options, même si ca n'est pas documenté dans le README : https://github.com/desmondmorris/node-twitter/blob/master/lib/twitter.js

J'essaie de passer l'URL avec proxy CORS via l'option `rest_base` et... ca marche pas
Avec le proxy anyorigins et celui de zserge, j'ai toujours une erreur CORS
Avec le proxy cors-anywhere j'ai une erreur 401

Je me demande si ca ne vient pas du fait que la lib twitter modifie l'URL en interne avant d'effectuer réellement la requête. Du coup je regarde si je ne pourrais pas intégrer la gestion du proxy CORS directement dans le service worker.
Ca aurait pour conséquence positive qu'on utiliserait plus de CORS proxy dans node :-)
A priori il y a un événement spécial `foreign-fetch` (https://filipbech.github.io/2017/02/service-worker-and-caching-from-other-origins) mais ca a l'air d'être un truc expérimental Google only (https://www.chromestatus.com/feature/5684130679357440). Dommage ca aurait pu permettre de se passer totalement du CORS proxy.
Après moult essais, j'arrive à faire marcher un feed normal et le feed twitter en utilisant le CORS proxy `https://cors-anywhere.herokuapp.com` \o/
Ca m'a pris 2H pour corriger ce bug

Je suis confiant, j'ajoute l'instance cloudant et... un problème de CORS !!!
J'avais testé un remote local et je n'avais pas eu de souci, mais cette fois ci sur un remote distant le sujet des CORS est une nouvelle fois sur la table :-/

Heureusement on peut activer les CORS depuis l'interface de gestion d'IBM, ouf!
15min après j'ai enfin la totalité de mes feeds et news dans la PWA \o/
Je teste la récupération des feeds et... ca marche ! mais... je me prend une erreur 429 (Too Many Requests) venant, je pense, du CORS proxy

Il va falloir trouver une solution plus stable, mais c'est très encourageant

Je déplois la PWA pour pouvoir la tester sur smartphone, ca marche :-)

Par contre je me rend compte que ca ne passe pas en local quand on est connecté via un VPN + proxy (je ne sais pas lequel des deux pose problème)

Total : 2H15min

# 51 : Deploiement sur electron - 2H

Il reste des soucis en cours (limite sur CORS proxy, VPN+proxy, etc.)
mais après avoir parlé du projet autour de moi il me semble qu'un des
points qui peut faire un effet wahou est de pouvoir déployer une appli
sur serveur + web (pwa) + desktop + mobile en peu de temps

Du coup je commence à regarder côté déploiement electron,
c'est parti pour `distrib-electron`

Après 30 minutes j'arrive à lancer une fenêtre Electron qui ouvre l'URL de l'appli node lancée en tâche de fond... et voila !

Reste la génération des executables, ca me prend 1H30 à configurer electron-forge (https://www.electronforge.io/), et il y a un truc qui ne me plait pas : electron-forge se base sur le champ `main` de `package.json`, ce qui fait que je suis obligé d'y mettre une valeur spécifique à electron (`distrib-electron.index.js`)
Ca m'inquiète car d'autres outils utilisent ce champ...

Total 2H

# 52 : Nettoyage de la configuration - 30min

Je prends 30min pour revoir certains mecanismes de config et essayer d'isoler au maximum les différents modules

# 53 : BILAN INTERMEDIAIRE - Combien de temps passé jusqu'à maintenant ? - 15m

A l'étape 33 on était à 52H15

- 8H30 = 60H45
- 6H15 = 67H
- 1H30 = 68H30
- 13H30 = 82H
- 30 = 82H30
- 1H45 = 84H15
- 2H30 = 86H45
- 45min = 87H30
- 45min = 88H15
- 15min = 88H30
- 1H30 = 90H
- 30min = 90H30
- 15min = 90H45
- 2H = 92H45
- 15min = 93H
- 30min = 93H30
- 2H15 = 95H45
- 2H = 97H45
- 30min = 98H15
- 15min = 98H30

98H30, presque 100H, soit l'équivalent d'un peu plus de 12j de 8H de travail non stop

# 54 : Deploiement sur capacitor - 13H15

Je me lance dans l'ajout d'un module `distrib-capacitor`

Première difficulté, la configuration n'est pas très flexible et je n'arrive pas à bien isoler le module sans avoir à créer un autre `package.json` directement dans le dossier `distrib-capacitor`
Mais pour l'instant ca ne pose pas de problèmes

J'arrive à lancer un hello world, le workflow est plutôt simple

Deuxième difficulté, j'essaie d'embarquer la version PWA de l'appli, or le service worker ne marche pas sur Android
Et quand l'appli cherche à charger http://localhost/zDemocracy-lowtech/views/login.html, elle ne trouve rien

Est ce que ca va remettre en cause tout mon système avec le service worker ? je n'espère pas
En tout cas j'ai déjà passé 2H30 dessus

Je passe 2H30 à trouver un moyen de modifier la base URL utilisée au moment du build plus des bugs à résoudre

Au final, j'arrive à lancer l'appli mobile et à parler avec cloudant \o/

Par contre je n'arrive pas à récupérer les news, et c'est encore un problème de CORS !
J'avais reglé ce problème en appelant un CORS proxy directement dans le Service Worker, sauf que capacitor ne lance pas le service worker :-)

Avant de me repencher sur ce problème, je prends 15min pour déployer une instance perso de cors-anywhere sur heroku : https://acailly-cors-anywhere.herokuapp.com/
Ca évitera peut être les erreurs 429 et ca pourrira moins l'instance publique

Bon donc on a encore un problème avec les CORS et si on utilise simplement un cors proxy sur l'URL du feed ca ne va pas suffir parce que le flux twitter est récupéré de manière différente, par la lib `node-twitter` (voir étape 50). Comment faire ?

Après 30min de recherche, je tombe sur cette issue : https://github.com/draftbit/twitter-lite/issues/41
Du coup je me lance dans le remplacement de la lib `twitter` par `twitter-lite`

30min après j'ai un proto qui donne les mêmes résultats que `twitter`...
au bout de 45min de recherche je me demande si ca ne donnerait pas de meilleurs résultats en essayant d'utiliser l'authentification App au lieu de User : https://github.com/draftbit/twitter-lite#app-authentication-example
15 minutes de plus pour invalider cette piste, apparement cette méthode de connexion ne peux pas accéder à l'endpoint que j'utilise (statuses/home_timeline)

45min de recherche plus tard je remarque deux choses. La première c'est que si je fait en sorte d'utiliser le subdomain avec cors-anywhere sur l'url oauth et sans cors-anywhere sur l'url de l'api (https://github.com/draftbit/twitter-lite/blob/8c016a3f9a09a447b92a7d7fb271dc097963c47b/twitter.js#L77), alors ca marche (spoiler : en fait ca marche parce que j'ai laissé le cors proxy dans le serviceworker, snif)
La deuxième, c'est que je note que je ne passe pas de callbackUrl, or j'ai l'impression que l'API en demande une (https://developer.twitter.com/en/docs/authentication/api-reference/request_token). Est ce que la lib en met une part defaut ? dans ce cas la doc dit que `We require that any callback URL used with this endpoint will have to be configured within the App’s settings on developer.twitter.com*`, il y a donc peut être un truc à configurer ?
En cherchant un peu plus j'ai l'impression que quand on met pas de callback on peut utiliser l'endpoint `/authorize` à la place (https://github.com/draftbit/twitter-lite/issues/112 qui pointe vers https://developer.twitter.com/en/docs/authentication/api-reference/authorize). A creuser...

Au bout de 2H30 de plus c'est bon ! En fait c'est ce mecanisme d'identification qui est utilisé : https://developer.twitter.com/en/docs/authentication/oauth-1-0a
Le problème venait du fait que le client oauth, chargé de générer les données d'authentification à placer dans les headers, prenait l'URL avec proxy.
Avec un petit hack j'ai réussi à contourner ca et ca marche !
J'en ai profité pour passer le cors proxy en config.

Je prend 30min pour tester sur capacitor et... c'est pas encore ca mais ya du mieux
Il reste :

- des erreurs 401 sur certains feeds comme https://acailly-cors-anywhere.herokuapp.com/https://blog.angular.io/feed
- des "Unexpected close tag" sur certains feeds comme https://acailly-cors-anywhere.herokuapp.com/https://feeds.feedburner.com/DilbertDailyStrip

Alors que sur node ces feeds ont l'air de fonctionner. Encore un point à éclaircir...

Au bout de 30min j'y vois plus clair sur certaines erreur. Sur certains feeds, même s'il n'y a pas d'erreur de CORS, je recoit la réponse "localhost is not an allowed domain". J'imagine que le site distant se base sur le header `Referer` ou quelque chose du genre, or je ne peux pas le modifier dans le browser et celui ci sera donc toujours localhost pour une appli capacitor par exemple...
La seule piste que je vois serait que le CORS proxy réécrive ces headers peut être ?

Je passe 45min à essayer de configurer le CORS proxy que j'héberge (https://github.com/acailly/cors-anywhere) pour réécrire les headers `Referer` et `Origin`, sans succès :-((((

Pour résumer :

- certains sites bloquent donc leur contenu si la requête est émise depuis localhost
- je suis obligé de fonctionner sur localhost dans certains cas

Je suis bloqué !?

Je continue de jouer avec cors-anywhere pendant 30min et j'arrive à faire marcher une des requêtes qui échouait quand je lui indique de supprimer (et non réécrire) les headers `Referer` et `Origin`

Encore 30min et ca y est ! J'arrive à lancer l'appli sur Android, à synchroniser et à récupérer les news \o/

Total : 13H15min

# 55 : Nettoyage, doc et ajustements - 2H15min

Je passe 2H15min à :

- modifier un peu le style pour l'adapter au mobile
- supprimer le code lié aux apps list et zdemocracy
- supprimer le code lié à git
- faire le tri dans les TODOS ci dessous
- faire le tri dans les dépendances
- mettre à jour le README
- mettre à jour les dépendances avec des alertes de sécurité
- changer le nom du repo et la base URL associée (nouveau nom : nouvèl, nouvelles en Gallo)

# 56 : BILAN INTERMEDIAIRE - Combien de temps passé jusqu'à maintenant ? - ???

A l'étape 53 on était à 98H30

- 13H15 = 111H45
- 2H15 = 114H
- 15min = 114H15

114H15, soit l'équivalent d'environ 18j de 8H de travail non stop

# 57 : Peaufinement de la PWA - 9H30

Je me base sur l'article "Développer sa première PWA" de mon collègue Yann Bertrand paru dans le numéro 243 du magazine Programmez pour peaufiner l'export PWA

Je commence par prendre 1H pour générer les icônes et favicon sur le site https://realfavicongenerator.net/ à partir de l'icone que j'ai trouvé ici : https://www.iconfinder.com/icons/2528135/blog_dailynews_information_news_newspaper_paper_survey_icon

Je continue en réorganisant le code du serviceworker et en ajoutant des logs, pendant 30min

Je prend 1H à corriger des problèmes d'icône et à essayer de rendre la PWA installable.
A priori j'y arrive car je vois le log "pwa can be installed" dans la console, mais je ne vois pas mon bouton "Install" qui devrait apparaître.
Et en regardant le source je me rends compte que le header de l'app normale (qui contient le title par exemple) se retrouve dans le body de la page !?
Ca a toujours été comme ca ???
Gros stress : est ce que ca pourrait remettre en cause la viabilité du projet ???

La raison de ca est que `browser-express` remplace le body de la page avec le résultat de la requête : https://github.com/williamcotton/browser-express/blob/master/src/response.js#L55
Si je remplace ca par `document.write(content)` ca a l'air de fonctionner, sauf que faire ca enlève les listeners placés par `browser-express` pour intercepter les submits des formulaires, et casse tout le mécanisme :-/

Après 1H30min de recherche et de bidouille, j'ai trouvé deux pistes.

Piste 1 - modification de browser-express :

- dans `browser-express`, au lieu de faire `document.body.innerHTML = content;`, on fait `document.documentElement.innerHTML = content;`
- dans `browser-express`, au lieu de faire `document.body.addEventListener`, on fait `window.addEventListener`

Piste 2 - suppression de "<head>" :

- dans mon renderer cutom `universal-render-middleware.js`, tronquer la balise `head` avec `html.replaceAll(/<head>[\s\S]*<\/head>/gim, "");`

La deuxième piste est séduisante parce qu'elle ne nécessite pas beaucoup de modif. Sauf que si on l'applique, on doit copier les CSS qui sont ajouté par l'appli express dans le head du fichier index.html de la PWA, car tout le head renvoyé par express est ignoré. Ca me paraît ajouter du couplage entre l'appli et distrib-browser alors qu'à l'origine j'esperais que ce module reste plus ou moins générique.

La première piste pourrait aller dans ce sens. On pourrait alors définir toutes les icônes, favicon et manifeste directement dans l'app et alléger ainsi le index.html de distrib-browser
Mais ca veut dire forker `browser-express`. Après tout j'ai déjà tellement épluché ses sources que ca ne sera pas difficile.

Prochaine étape : Récuperer le code de `browser-express` directement dans le projet et faire les modifs nécessaires. Et ensuite valider que mon bouton "Installer" fonctionne bien.

15min de plus pour télécharger le code depuis https://github.com/williamcotton/browser-express, le copier dans le projet, et changer le code qui l'utilise

Encore 15min pour appliquer les correctifs de la piste 1 (voir ci dessus) et copier tout le code HTML et les assets (icônes, manifest, etc.) spécifiques à la PWA directement dans l'app, laissant uniquement dans `distrib-browser` un fichier `index.html` qui ne fait que charger le bundle

Bilan : toute la configuration de la PWA se fait directement dans l'app, pas besoin d'ajouter une couche d'abstraction et de configuration pour gérer ca de manière bancale, ca me plait :-)

J'essaie ensuite de faire marcher le bouton d'installation. Etant donné que ce code peut maintenant se trouver dans l'app (ce qui est une bonne chose car toutes les apps ne veulent pas forcément ajouter un bouton d'install custom), je peux ajouter ce bouton et le code javascript associé (qui se trouve dans une balise `script` pour être executée coté client) dans directement dans un partial.

C'est trop beau pour être vrai, les scripts ne sont pas exécutés quand on utilise `innerHTML=mon_contenu`, ce que fait `browser-express`
(voir https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML)

Je trouve un contournement ici, https://stackoverflow.com/a/20584396, que j'ajoute directement dans browser-express. Ca marche, cool.

1H de plus d'écoulée.

Mais je me rends compte que l'import d'un partial depuis un partial ne se comporte pas de la même façon sur node ou sur PWA.
Sur node je dois importer `customInstallButton.html` alors que sur PWA je dois importer `partials/customInstallButton.html`
En me basant sur le code de `ejs` (https://github.com/mde/ejs/blob/main/lib/ejs.js#L118) j'arrive à corriger mon `universal-render-middleware` pour qu'il fonctionne de la même façon que `ejs`
Ca me prend 45min

Je me lance dans le fait d'ajouter un bouton de mise à jour à partir de quelques liens d'exemple (https://medium.com/progressive-web-apps/pwa-create-a-new-update-available-notification-using-service-workers-18be9168d717 et https://deanhume.com/displaying-a-new-version-available-progressive-web-app/ et https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle)
Au bout de 1H de tests et de recherches, j'ai l'impression que ce bouton n'est pas très utile si on active automatiquement le nouveau service worker avec skipWaiting. Je me trompe peut être (j'ai l'impression que je passe à côté de quelque chose) mais pour l'instant je ne poursuit pas dans cette direction.

Par contre durant ces tests je me suis rendu compte que les `script` étaient réexécutés à chaque fois qu'on changeait de page. En y reflechissant c'est plutôt logique, en revanche, comme la page n'est pas totalement rechargée, les variables globales, les variables `window.xxx` et les listeners sur windows restent.
On peut facilement vérifier les leaks du coté des listeners en tapant `getEventListeners(window)` dans la console
Il faut donc prêter une attention particulière dans les `script` embarqués afin de ne pas causer d'erreurs ou de fuites mémoires.
Je prend 45min pour refactorer le script du bouton d'install custom afin qu'il ne cause pas d'erreur et ne laisse pas trainer des listeners

Il y a encore un point qui me chiffone, si je vais sur l'adresse `http://localhost:9999/nouvel/` quand la PWA n'est pas servie depuis mon PC, rien ne s'affiche. Le service worker ne devrait il pas s'activer et charger depuis le cache ???
J'essaie de faire en sorte que les deux scenarios suivants marchent :

- 1/ je charge l'appli, je coupe le serveur, je rafraichis la page : le service worker doit charger la page d'accueil depuis le cache
- 2/ je charge l'appli, je coupe le serveur, je dévérouille : la page de news doit s'afficher car toutes les données sont déjà dans le cache

Pour faire ca je m'aide de ce lien pour remettre au clair ma gestion du cas offline : https://web.dev/offline-fallback-page/

Au bout d'1H30, les deux scénarios semblent fonctionner. Et en plus le rafraichissement depuis une page autre que la page d'accueil semble fonctionner aussi.

# 58 : Affichage d'un status - 8H45

L'idée est de trouver un moyen d'afficher du contenu de manière dynamique avec un minimum de JS (sans aucun JS ?)

Dans l'appli de news, je vois deux choses sur lesquelles il manque un retour visuel :

- indiquer quand la synchronisation PouchDB se fait
- indiquer l'état d'avancement de la récupération des feeds

Je cherche du côté de l'approche COMET (https://en.wikipedia.org/wiki/Comet_(programming)).

Mon premier test est la technique de la Forever Frame (https://www.infoworld.com/article/2077843/java-se-asynchronous-http-comet-architectures.html?page=6)
Je me rend compte que, même si c'est assez minimaliste, il y a un gros problème : le handler côté serveur ne sait pas quand s'arrêter.
Et si on appelle le handler à chaque fois qu'on rafraichit la page ou qu'on navigue sur une autre page, alors on se retrouve avec beaucoup de handler inutile qui consomment des ressources.
Il est peut être envisageable de gerer côté serveur le fait qu'une nouvelle connexion soit etablie et de fermer les précédentes, mais j'ai peur que cela s'avère fastidieux.

Une autre option est de basculer sur du Server Sent Event, mécanisme intégré à la plupart des navigateurs mais pas sur IE
Il y a une limite qu'il est bon a connaitre également sur le nombre de connection simultané par browser (https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events) :

```
When not used over HTTP/2, SSE suffers from a limitation to the maximum number of open connections, which can be especially painful when opening multiple tabs, as the limit is per browser and is set to a very low number (6). The issue has been marked as "Won't fix" in Chrome and Firefox. This limit is per browser + domain, which means that you can open 6 SSE connections across all of the tabs to www.example1.com and another 6 SSE connections to www.example2.com (per Stackoverflow). When using HTTP/2, the maximum number of simultaneous HTTP streams is negotiated between the server and the client (defaults to 100).
```

Une troisième option serait d'utiliser Coherence (https://github.com/dominictarr/coherence) ou HTMX Load polling (https://htmx.org/docs/#load_polling). Mais ca rajoute du développement custom ou un framework...

Une quatrième option serait carément de faire du polling à interval régulier, on perdrait le côté reactif immédiat mais c'est probablement la solution qui serait supportée partout

Je ne sais pas trop quelle est la solution qui sera le meilleur compromis entre compatibilité étendue, simplicité de la solution et performances mémoire/cpu

Du coup je me lance sur le plus simple : le polling

Au bout d'1H30 de reflexion (principalement) et de bidouillage (un peu), j'ai un poc de polling qui fonctionne dans le footer
1H30 après j'ai un footer qui affiche la synchronisation en cours ou la date de dernière synchronisation \o/
J'ajoute un bouton de rechargement de la page en dessous du status (15min)

Je teste ce nouveau status dans la PWA... et ca ne marche pas ! (pour changer)
La requête GET vers `/status` est toujours en 404
Cela doit venir du fait que c'est la première requête AJAX de l'appli (via fetch) qui est émise depuis le code et non suite à la soumission du formulaire

Comment faire ?

Dans angular, il y a les http interceptors. J'ai l'impression que leur fonctionnement consiste à surcharger la méthode fetch. Il y a un exemple ici : https://github.com/werk85/fetch-intercept/blob/develop/src/attach.js

Une piste serait donc d'ajouter une option `interceptFetch` à `browser-express` qui surcharge fetch et le redirige vers le routeur
J'ai l'impression que d'ajouter un paramètre `noHistoryUpdate` dans `Router.prototype.processRequest` suffirait à pouvoir utiliser cette méthode sans opur autant à rafraichir la page
(15min de reflexion pour trouver ca)

J'essaie de tester cette piste en incluant directement le projet `fetch-intercept` (https://github.com/werk85/fetch-intercept) dans mon fork local de `browser-express` puis en modifiant celui ci pour intercepter les bons fetch de la bonne façon, en particulier en évitant de recharger la page quand on essaie de récupérer le status de synchronisation

Au bout de 30 min je sens que je vais devoir revoir pas mal de trucs dans browser-express si je veux que ca marche, et je ne suis pas trop confiant dans le fait de réussir.
Je passe 45min de plus à tester une solution à base d'iframe mais je réalise que ca ne marchera pas tant qu'il n'y aura pas quelque chose qui redirigera la requête vers le routeur, comme on redirige le formulaire actuellement

Je crois qu'il faut que je me résoude à l'évidence, je vais devoir revoir une bonne partie du code de browser-express
J'ai trouvé deux commits d'un fork de nighthawk (dont browser-express est issu) qui devraient m'aider à mieux découper le code avant de le modifier :

- https://github.com/rob-marr/nighthawk/commit/6821db322a7607a66aee781ceac3c96b1f2ce364
- https://github.com/rob-marr/nighthawk/commit/7ff0216691c30e01ba8df408fa860d91af6429f2

Ca y est \o/\o/\o/\o/\o/\o/\o/ !!!
Au bout de 3H30 de refacto j'arrive enfin à afficher le status dans la PWA.
La solution n'est pas trop dégueulasse et reste en phase avec le fonctionnement existant, en gros un nouveau paramètre `interceptPostFetch` est ajouté et active la redirection des fetchs avec la méthode POST vers le routeur

Ouf! maintenant place à la page de suivi du téléchargement des feeds :-p

(mais avant 15min de plus pour les finitions)

TOTAL : 8H45

# 59 : Affichage du suivi du téléchargement des feeds - 2H

Je modifie l'app pour que le bouton "Télécharger les feeds" renvoie vers une page dédiée qui affiche la liste des feeds et leur état : ✅ 📡 ⏳

Cette page est mise à jour dynamiquement avec la même technique JS que pour le status de synchro

Au bout de 2H j'arrive à un résultat pas trop mal

Total : 2H

# 60 : Ajout de feeds spéciaux - 1H30

J'ajoute

- la possibilité d'ajouter le flux d'une chaine Youtube
- la possibilité de supprimer un abonnement
- la possibilité d'ajouter un fil personnalisé Twitter

Ca me prend 1H30 sans aucun blocage, ca fait du bien pour une fois

Total : 1H30

# 61 : Utilisation de morphdom - 15min

Je prends 15min pour ajouter un paramètre `useMorphdom` dans `browser-express`, ca se fait sans soucis et fait disparaitre les effets de clignotements à chaque changement de page :-)

# 62 : Activation du compactage automatique - 15min

L'application commence à devenir lente, et je me rends compte que j'ai moins envie de travailler dessus quand c'est le cas.

Ca me rappelle cet article : https://bdickason.com/posts/speed-is-the-killer-feature/

Comme j'ai d'autres chantiers en cours (le webRTC), je prends juste 15min pour activer la compaction automatique : https://pouchdb.com/guides/compact-and-destroy.html#auto-compaction

# 63 : Exploration du côté de WebRTC - 6H30

Le fait de reposer sur l'instance Cloudant ne me rassure pas

Idealement j'aimerais pouvoir stocker les données dans un repo Git, mais les travaux nécessaires me semblent très importants

Une alternative moins coûteuse à développer pourrait être de synchroniser via WebRTC. De cette façon, même si mon instance cloudant vient à disparaître ou ne plus être fonctionnelle, je pourrais toujours synchroniser les données entre mon PC et mon téléphone.

Mon point de départ est le projet `pouch-replicate-webrtc`, en particulier le fork de fiatjaf : https://github.com/fiatjaf/pouch-replicate-webrtc

Je passe 2H pour faire marcher pouchdb avec simple-peer (https://github.com/feross/simple-peer) en utilisant ce projet

Je passe 1H pour tester peerjs (https://github.com/peers/peerjs) qui met à disposition un signaling server, ce qui pourrait s'avérer indispensable
Malheureusement, peerjs n'est pas supporté sur node contrairement à peerjs

Il faut donc que j'utilise mon propre signaling server, je passe 1H à mettre en ligne une instance de https://github.com/t-mullen/simple-signal à l'adresse suivante : https://acailly-simple-signal.herokuapp.com/

Après 2h30 de plus, j'arrive à faire fonctionner mon exemple avec pouchdb et simple-peer en utilisant mon instance de simple-signal, le concept est validé

Je passe ensuite 1H de plus à essayer de trouver comment je pourrais intégrer ca dans le code de l'application existante, et au fur et à mesure de mes reflexions je me rend compte que ca va me prendre beaucoup de temps si je veux garder l'ensemble simple à utiliser et à maintenir

J'en conclut qu'il vaut mieux s'arrêter là sur ce sujet et consacrer le peu de temps disponible à ce qui va vraiment apporter de la valeur à cette solution (à mon avis) : l'interfacage PouchDB <-> Git.

J'ajoute tout de même le code au repo pour ne pas le perdre, dans le dossier `poc-pouchdb-webrtc`

Total : 6H30

# 64 : PouchDB avec Git, premiers tests - ???

L'idée serait de faire un truc qui :

- d'un côté parle le langage de PouchDB et stocke les données dans un repo Git
- d'un autre côté parle le langage de Git et applique la résolution de conflit automatique de PouchDB

Mon idée initiale est de :

- repartir d'un vieux repo d'il y a 12 ans (!) qui essayait d'ajouter une couche PouchDB au dessus d'un repo Git, GitCouch : https://github.com/ivanstojic/GitCouch
- tester avec Futon si les tests de compliance passent
- implémenter ce qui manque
- peut être revoir le stockage dans Git en utilisant une des approches qu'avait étudié Benoit Averty dans sa prez : https://gitlab.com/BenoitAverty/git-key-value-store et https://gitlab.com/BenoitAverty/talk-write-better-tests (la prez est dedans)
- implémenter la résolution de conflit de PouchDB en créant un custom merge driver : https://www.julianburr.de/til/custom-git-merge-drivers/ et https://gregmicek.com/software-coding/2020/01/13/how-to-write-a-custom-git-merge-driver/
- si j'ai un truc qui marche :
- parler de ca au gars qui fait offPIM pour avoir son avis : https://github.com/lybekk/offPIM
- packager tout ca et communiquer un peu partout (HN, devs PouchDB, etc.)
- contacter l'auteur initial de GitCouch, ca pourrait lui faire plaisir de voir que son idée n'est pas morte :-) : https://ordecon.com/

Les autres ressources utiles identifiées sont :

- L'API CouchDB : https://docs.couchdb.org/en/stable/api/index.html et https://docs.couchdb.org/en/1.6.0/http-api.html

Pour mémoire, l'algo de résolution de conflit de PouchDB est le suivant :

- Select revisions with the highest depth field that are not marked as deleted
- If there is only 1 such field, treat it as the winner
- If there are more than 1, sort the revision fields in descending order and pick the first.

Ca m'a déjà pris 30min à regrouper toutes ces infos

Je créé un dossier `poc-pouchdb-git` pour garder le code pas loin de l'appli

Je commence par récupérer le code de GitCouch pour le faire tourner.
J'essaie de le lancer sous forme de service mais ca me prend beaucoup de temps (1H) pour pas grand chose
J'essaie à la place de créer un mini projet nodejs/expressjs qui fera le lien entre le navigateur et les scripts bash de gitcouch
L'idée étant d'arriver à ouvrir l'interface Futon et d'explorer la base de données via cette interface
Ensuite l'idée sera de transformer les scripts bash de gitcouch en code javascript, plus facile a maintenir et plus multiplateforme
Ca me prend TODO 1H+ (non compté dans le temps plus bas) pour arriver à TODO (explorer la base ?)

TODO : 1H30min+

# NEXT

## Général

TODO Afficher la version de l'application en bas de chaque page (en discret) 

TODO Faire une commande qui génère d'un coup tous les artefacts :

- lance l'appli node
- lance l'appli PWA
- lance l'appli electron
- ouvre l'IDE android

TODO Rendre les logs plus lisible en ajoutant de la couleur

TODO Tester les différents modes de distribution sur mon vieux HTC Desire

## app-news

TODO Pouvoir entrer l'adresse d'un site web et que l'app cherche toute seule les flux associés
TODO Faire un design system classless pour remplacer Tacit
TODO Ajouter une vague en SVG parce que c'est joli (avec https://getwaves.io/)
TODO Ajouter une section `Need help?` ou `How to use this page?` en dessous de chaque page qui tiendrait le rôle de manuel utilisateur (et pourquoi pas de specs)
TODO Ajouter un bouton de nettoyage qui supprime les items supprimés il y a plus de XX jours (puis en faire un traitement auto)

## configuration

TODO Faire en sorte qu'on puisse plus facilement distinguer à quel module appartiennent les clés de configuration (utilisation d'un prefixe, séparation en sous objets...)

## distrib-nexe

TODO Sortir l'export exe dans un module `distrib-nexe`

## distrib-browser

TODO Refaire un essai d'ajout de bouton "Une nouvelle version est disponible, mettre à jour" parce que la PWA ne semble jamais se mettre à jour

## distrib-capacitor

TODO Pouvoir configurer l'icone et autres paramètres d'une app mobile
TODO Pouvoir générer l'APK Android sans avoir à ouvrir l'IDE

## distrib-electron

TODO Trouver un moyen de ne pas utiliser le champ "main" de package.json pour spécifier le script de lancement de l'application electron dans electron-forge

## storage-file

TODO Se servir du reliquat de persistence fichier `storage-file` pour faire une fonction d'export (et d'import) des données

## synchronization-pouchdb

TODO Activer la replication live
TODO Etudier la gestion des droits côté serveur (CouchDB, PouchDB server, Cloudant, etc.) : https://github.com/pouchdb-community/pouchdb-authentication/blob/master/docs/recipes.md

## expose-localtunnel

TODO Tester expose-localtunnel avec expose-pouchdbserver (est ce trop lent ?)

## Sécurité

TODO Regarder le reglage des CSP

## Audit, benchmark et autres outils

TODO Ajouter un check accessibility avec axe
TODO Ajouter un check lighthouse
TODO Ajouter un test W3C validator (https://validator.w3.org/)

## Tests

TODO Tester d'ajouter des tests dans l'appli sans passer par un framework (https://twitter.com/ryanflorence/status/1162792430422200320?s=20)

## Onboarding, developper experience

TODO Ajouter un tutorial sous forme de fichiers `TUTORIAL-STEP-3-Sync_with_pouchdb.md` disposés à différents endroits dans l'arborescence de code (et liés entre eux par des liens dans les fichiers .md qui pointent vers le suivant)

## Documentation

TODO Documenter les différents choix techniques, s'inspirer des ADR (Architecture Decision Record) : https://engineering.atspotify.com/2020/04/14/when-should-i-write-an-architecture-decision-record/

## Autres expérimentations

TODO Ajouter une commande pour lancer l'appli via webopen
TODO Tester Turbolinks (ou autre techno dans le même style) pour ajouter un côté plus réactif ? (par exemple HTMX boost semble faire ca : https://htmx.org/docs/#boosting)
TODO Essayer d'implémenter un systeme d'authentification à base de certificat self signed ? type mTLS (voir https://drewdevault.com/2020/06/12/Can-we-talk-about-client-side-certs.html)
TODO Tester le plugin capacitor-tor (https://github.com/Start9Labs/capacitor-tor)
TODO Tester PouchDB over WebRTC (PeerPouch, pouch-replicate-webrtc)
TODO Tester une implémentation compatible PouchDB qui utiliserait Git comme base de données clé-valeur, une custom merge stratégy qui copierai celle de CouchDB et ajouterait une interface HTTP compatible CouchDB par dessus tout ca
TODO Tester la persistence fichier avec level-fsdown (https://github.com/voltraco/level-fsdown)
TODO Tester d'ajouter de la reactivité avec des techniques old school type COMET (https://en.wikipedia.org/wiki/Comet_(programming), https://github.com/kkuchta/css-only-chat/blob/master/README.md, ) ou des experimentations type coherence (https://github.com/dominictarr/coherence)
TODO Tester de créer un mini outil de BDD en se basant sur les views et les actions, éventuellement avec un rendu visuel inspiré de l'event modelling (https://eventmodeling.org/posts/what-is-event-modeling/)
TODO Ajouter un menu accessible via TAB destiné à l'accessibilité comme sur https://www.pole-emploi.fr/accueil/
TODO Tester de connecter les personnes entre elles via les réseaux mesh Yggdrasil (https://yggdrasil-network.github.io/) ou cjdns (https://github.com/cjdelisle/cjdns)
TODO Tester un système d'écriture de scénario sous forme d'enchainement vue - action - vue - action - ... qui exporte à chaque étape l'HTML correspondant, ce qui permettrait de s'en servir pour :

- faire des présentations sur le produit plus simplement
- s'assurer rapidement de la non regression visuelle
- faire du snapshoting
- faire une sorte de doc d'utilisation automatique
- passer les outils d'accessibilité et autre sur ces différentes pages
- ...

## Idées d'autres apps qui pourraient être compatibles avec cette approche

TODO Une appli pour scanner les livres que l'on a et les partager sur un catalogue partagé afin de se les échanger plus facilement
TODO Une appli type Anki pour mémoriser facilement des choses
TODO Une appli de vote par scrutin majoritaire permettant également la délégation (démocratie liquide)
TODO Des alternatives minimalistes aux outils de tous les jours (office, prise de note, etc.)
TODO Un gestionnaire de favoris
TODO Une présentation d'un catalogue de données à l'aide de cercles imbriquées, du genre https://labo.fnac.com/barometre-sav/ mais sans JS
TODO Une appli qui vient présenter les données présentes dans un .CSV (inspiration du barometre sav fnac darty : https://www.suricats-consulting.com/replay-conference-low-tech-durable-fnac-darty/4/)

## Une approche de conception, différentes histoires

TODO Une approche pour développer plus facilement et rapidement des nouvelles idées d'applis
TODO Une approche pour aller voir plus vite les utilisateur et les embarquer dans le developpement de l'appli
TODO Une approche pour ne pas reposer sur une elite de développeurs, seule capable de maitriser tous les rouages d'une technologie
TODO Une approche pour augmenter la durée de vie des applications, en se basant sur des technos matures et standard
TODO Une approche pour faire des applications plus accessibles (HTML semantique, peu de JS, classless)
TODO Une approche pour faire des applications plus sobres (offline-first)
TODO Une approche utilisables par tous (accessibilité, diversité des plateformes, pas de stockage obligatoire)
TODO Une approche pour faciliter la qualité logicielle (stack plus simple, outils de tests plus visuels si j'arrive à faire un truc à base d'event modeling)
TODO Une approche pour limiter l'obésité logicielle (limites assez fortes en terme de perfs et mémoire)
TODO Une approche pour rendre le développement d'application plus accessible aux non experts
TODO Une approche pour relocaliser le développement d'application plus proche des utilisateurs (accessible aux non experts, pas de stockage obligatoire, etc.)
TODO Une approche pour ...
