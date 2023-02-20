## Requirements

You may want to have docker in your machin to get the database and nginx easy to run this application. If you have it you can use:

```bash
$ docker-compose -f ./docker-compose.yaml up -d --build
```

This will generate a mysql database and nginx instance to expose the application in port 80.

You also should to have the node.js in your environment, I suggest the version 18.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# watch mode
$ npm run start:dev
```

## Test

Since this application is tiny, I have focused more in the e2e tests to not be repetitive mocking services and repositories in every module. So you can find more unit tests in the events module.

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```
