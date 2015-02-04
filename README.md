# Pathlete

Issues: [![Stories in Ready](https://badge.waffle.io/MildHawk/Pathlete.png?label=ready&title=Ready)](https://waffle.io/MildHawk/Pathlete) 
Build Status: [![Build Status](https://travis-ci.org/MildHawk/Pathlete.svg?branch=master)](https://travis-ci.org/MildHawk/Pathlete)
Code Coverage (Master): [![Coverage Status](https://coveralls.io/repos/MildHawk/Pathlete/badge.svg?branch=master)](https://coveralls.io/r/MildHawk/Pathlete?branch=master)

Pathlete is a fun data visualization tool that will show trends in your movement and motivate you to achieve large goals through small steps. It will show you how far you've traveled across different distances to give you new perspectives of your progress. 

## Team

  - __Product Owner__: Karim Kyler
  - __Scrum Master__: Samin Sepasi
  - __Development Team Members__: Matt Polland, Jake Obron

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Overview](#overview)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

1. Clone Repo
2. [Install Dependencies](#installing-dependencies)
3. Rename `example.env` to `.env`
4. Sign up for a [fitbit dev account](https://dev.fitbit.com) to obtain consumer key & consumer secret
5. Update .env with consumer key and secret from your created fitbit dev account
6. The repo currently uses our own Firebase link as the db. To create your own db, simply change the link in utils/db.js as you see fit to point to your own Firebase or other db. 
7. To run locally: From root directory, run `node bin/www`
8. To run tests, run `npm test` from root directory


## Requirements

- Node 0.10.x
- ExpressJS 4.0
- AngularJS
- Firebase
- Mocha
- Chai
- Passport-Fitbit
  - [Passport-Fitbit](https://github.com/jaredhanson/passport-fitbit) is a library that abstracts the oAuth process for the [Fitbit API](https://wiki.fitbit.com/display/API/Fitbit+API). 
- Fitbit-Node
  - [Fitbit-Node](https://www.npmjs.com/package/fitbit-node) is an npm module that abstracts the data fetching process for the [Fitbit Resource Access API](https://wiki.fitbit.com/display/API/Fitbit+Resource+Access+API). 

## Development

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
bower install
```

### Overview
1. Fitbit Data Access
  - utils/fitbit.js contains the logic for the oAuth process via the Fitbit API. It utilizes the Passport-Fitbit library to log in with the user's Fitbit account, and the `getStats` function fetches the user's activity data from the Fitbit Resource Access API using the Fitbit-Node module. The `dbHelper.addUserStats` function utilizes the utils/dbHelpers.js file to add the user's basic profile info to our db. 
2. Progress & Achievement Pages
  - The logic for the Achievements & Progress pages resides in the various `public/controllers` JS files. These controllers fetch a user's activity info using the factory in `public/scripts/services.js`. The factory makes various GET requests depending on the info required, and the GET request routes are handled by the routes/index.js file. 
  - For example, a user's info is fetched starting from the factory's GET request, which routes to `routes/index.js`, and `routes/index.js` uses the `getUserStats` function from `utils/dbHelpers.js` to fetch the user's info from the db. 

### Roadmap

View the project roadmap [here](https://github.com/BronzeFlamingos/Pathlete/issues)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
