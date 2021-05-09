# Nouvèl (beta version)

This is a simple news reader (RSS, twitter, etc.)

This is also an example for a simpler and opinionated way of building apps

(And it means "Nouvelles" in Gallo, which means "News" in French)

## Why?

I wanted an app that is simple to use, simple to understand, simple to develop, simple to maintain

## But why?

To spend less time developping the app, and spend more time with the user

## And how ?

/!\ Disclaimer: this is not a silver bullet, simplicity is achived by limiting possibilities

Here are the current choices that have been done:

- the app is a Node/express.js app so you only have to know HTML, CSS and JS to make it
- there is a classless CSS framework so you don't have to do much (any?) styling
- there is not much (any?) JS client side so the road to accessibility is shorter
- data is stored locally with PouchDB so it can work offline or when network is unpredictable
- data is synced with other peers or with CouchDB/Cloudant/Couchbase remotes, there is not much (any?) logic on the remote side

Nothing is set, things will probably change

## Getting Started: use the PWA

Go to https://acailly.github.io/nouvel/

## Easily create your remote

You can follow instructions on [easy-pouchdb-server](https://github.com/acailly/easy-pouchdb-server) repository to get your remote up and running on Glitch in 5 minutes and at no cost (with limitations, obviously)

## Get the code

```bash
git clone https://github.com/acailly/nouvel.git
cd nouvel
npm install
```

You can then run the app in many different ways :

### Run the local server

```bash
npm start
```

### Run the PWA

```bash
npm run pwa:build
npm run pwa:serve
```

### Run the desktop app

```bash
npm run electron:serve
```

### Run the android app

```bash
npm run capacitor:build

# The android IDE opens,
# you build the app on your emulator or device
```

## Documentation (in French)

- `documentation/MAKING_OF.txt`: Dev diary of the app, plus some TODOs for the future
- `documentation/MODULES.txt`: List of the modules
