# Url Shortener

A service to shorten url with [React.js](https://reactjs.org/), [Express](https://expressjs.com/) and [PostgresQL](https://www.postgresql.org/).

Input a url and the service will gernate a shorten url which includes a redirecting page with open graph metadata from the original one.

![Screenshot](https://i.imgur.com/UwsFx07.png)

## Get started

### Develop

1. Run `yarn` to install packages.
2. `vim server/.env` to setup database config, checkout the example: [.env.example](https://github.com/emma2334/url-shortener/raw/master/server/.env.example)<br>
   **❗️Important: You need to connect to a vaild PostgresQL database if you try to run server from local**
3. Run `yarn start`

```
yarn start          # Run both client and server script below
yarn start:client   # Run client at port 3000
yarn start:server   # Run server at port 3001
```

### Build

```
yarn build          # Build both client and server
yarn build:client   # Build only client
yarn build:server   # Build only server
```

## Structure

```
.
├── server/
│   ├── features/  # logic
│   ├── views/  # html templates
│   ├── .env.example  # example for .env
│   ├── index.ts  # app entry point
│   ├── model.ts  # db models
│   └── status.ts  # response state code
├── client/
│   ├── public/  # static files
│   ├── src/  # Next.js source code
│   │   ├── components/   # presentational cpmponents
│   │   ├── pages/  # page components
│   │   └── utils/  # tools
│   ├── App.tsx
│   └── index.tsx
├── .eslintrc.json  # eslint config
├── .lintstagedrc.json  # lintstage config
```

## Deploy to Heroku

### Through [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

```bash
heroku login
heroku create $APP_NAME # create new app
heroku addons:create heroku-postgresql:hobby-dev # create database
git push heroku master

heroku logs --tail # To track the log
heroku open # Open in browser
```

### Through GitHub

1. Visit your Heroku app page
2. Install `Heroku Postgres` to your add-ones
3. Go "Deploy" to setup GitHub connect
4. Deploy

## License

This project is [MIT licensed](./LICENSE).
