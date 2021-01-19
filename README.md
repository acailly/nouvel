# zDemocracy-lowtech

This is a simple RSS feed reader

This is also an example for a simpler and opinionated way of building apps

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

## Getting started

```bash
git clone https://github.com/acailly/zDemocracy-lowtech.git
cd zDemocracy-lowtech
npm install
npm start
```

## Run the PWA

```bash
npm run browser:build
npm run browser:serve
```

## Run the desktop app

```bash
npm run electron:serve
```

## Run the android app

```bash
npm run capacitor:build

# The android IDE opens,
# you build the app on your emulator or device
```

## Documentation (in French)

- `documentation/MAKING_OF.txt`: Dev diary of the app, plus some TODOs for the future
- `documentation/MODULES.txt`: List of the modules
