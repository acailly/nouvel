# Pourquoi ces choix ?

## L'objectif

Proposer une application simple à utiliser, simple à comprendre, simple à maintenir

## La justification des choix

### Node JS

On fait une application web, le minimum à connaitre sera HTML, CSS et JS

Node JS évite d'avoir à apprendre un autre langage et propose un ecosystème viable

### Express JS

C'est le plus connu, le plus établi.

Les tutoriels de débutant sont quasi tous sur ce framework.

### EJS

En cherchant rapidement des solutions de templating matures, j'ai trouvé EJS et Pug

EJS ressemble plus à HTML

### Tacit CSS

Le fait d'utiliser un framework CSS classless ne nécessite pas d'apprendre de nouveaux concepts
propres à ce framework

J'ai choisi Tacit CSS parce que je le trouvais joli

### Base de données fichier

Devrait suffire pour une charge réduite

Est lisible par un humain

Est modifiable par un humain

Est indépendant d'un outil particulier autre qu'un filesystem et un éditeur de texte

Est facilement versionnable avec un gestionnaire de source comme gestionnaire

### Backup Git

Est exécutable indépendament de l'application

Est consultable indépendament de l'application

Permet potentiellement plusieurs usages 

- local avec synchro vers un master
- local only
- distant only avec Backup
- autre ?

### Nexe

En cherchant un outil pour générer un executable à partir d'un projet Node JS, je suis tombé sur pkg et nexe

J'ai pris nexe parce que l'exe généré arrive a lire des données dans un dossier externe sans aucune 
configuration supplémentaire






