# Url Shortener

A service to shorten url with [React.js](https://reactjs.org/), [Express](https://expressjs.com/) and [PostgresQL](https://www.postgresql.org/).

Input a url and the service will gernate a shorten url which includes a redirecting page with open graph metadata from the original one.

![Screenshot](https://i.imgur.com/UwsFx07.png)

## Get started

### Develop

1. Run `yarn` to install packages.
2. Setup database config, checkout the example: [.env.example](https://github.com/emma2334/url-shortener/raw/master/server/.env.example)
3. Run `yarn start`

```
yarn start          # Run both client and server
yarn start:client   # Run client at port 3000
yarn start:server   # Run server at port 3001
```

### Build

```
yarn build          # Build both client and server
yarn build:client   # Build only client
yarn build:server   # Build only server
```

## Deploy to Heroku ❌

The project isn't ready to be deployed to Heroku. This section is for note only.

### Deploy through [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

```bash
heroku login
heroku create --buildpack mars/create-react-app
heroku config:set JS_RUNTIME_TARGET_BUNDLE="/app/server/dist/**.js"

heroku logs --tail # To track the log
heroku open # Open in browser
```

## License

This project is [MIT licensed](./LICENSE).
