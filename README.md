# Adonis API application

This is the boilerplate for creating an API server in AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds

## Setup

Use the adonis command to install the blueprint

```bash
adonis new yardstick --api-only
```

or manually clone the repo and then run `npm install`.


### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```


### To Run the Project
To run this project, copy repository and run command

```js
npm install
```

then,
```js
adonis serve --dev
```

### Dependencies
AdonisJS (A NodeJS framework) powered Backend with MySQL as primary Database

### Authentication
The Application is using a JWT token based authentication system.

### Test
All the APIs are well tested using Postman native application.


### Routes
The app consists of Routes,
1. localhost:3333/register
2. localhost:3333/login
3. localhost:3333/deposit
4. localhost:3333/withdraw
