# zDemocracy-lowtech

## Publicly available address

https://zdemocracy.serverless.social/

... only if someone has started the application somewhere 

## Why?

I wanted an app that is simple to use, simple to understand, simple to maintain

Here are the current choices that have been done:

- no authentication
- no JS
- only a classless CSS framework, no custom CSS
- old school server side rendered app with old school express.js
- no Database, everything is stored in files
- no fixed hosting, use tunelling to expose local machine hosting
- simple backup with git running in background 

Nothing is set, things will probably change

## Documentation (in French)

- `documentation/MAKING_OF.txt`: Dev diary of the app, plus some TODOs for the future
- `documentation/CHOICES.txt`: Justifications for the technical choices 


## Run locally

### Get the example data

Clone the following repository: https://github.com/acailly/zDemocracy-lowtech-data.git

### Configure data path

Edit configuration.js and make `rootDataFolder` point to you data folder

### Start the application

```
npm install
```

```
npm run start
```

### Generate executable files (optional)

```
npm run exe:build
```






