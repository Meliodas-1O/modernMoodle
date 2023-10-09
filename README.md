# modernMoodle

## Table of contents
- [modernMoodle](#modernmoodle)
  - [Table of contents](#table-of-contents)
  - [Dev - quick start](#dev---quick-start)
    - [Postgres database](#postgres-database)
    - [Install dependencies and build project](#install-dependencies-and-build-project)
    - [Run the project with hot-reload](#run-the-project-with-hot-reload)
    - [Shut down everything](#shut-down-everything)
    - [Available scripts](#available-scripts)
    - [How to write tests](#how-to-write-tests)
  - [Contributing & guidelines](#contributing-&-guidelines)


## Dev - quick start
### Postgres database
modernMoodle currently needs an up and running Postgres database.  
The easiest way to get started is to use docker :
```shell
docker run -p 5432:5432 --name modernmoodle-db-pg -e POSTGRES_PASSWORD=password -e POSTGRES_USER=root -ePOSTGRES_DB=modernmoodledb -d postgres
```
> If you change any of the settings, please make sure to update them in the .env file.
  
Once the database is running, apply the migration(s) :
```shell
npm run migrate
```
> You may need a bash environment to run this.

### Install dependencies and build project
First, install the dependencies:
```shell
npm i
```
  
Then, build the project:
```shell
npm run build
```

### Run the project with hot-reload
```shell
npm run dev
```
If you modify any file in the `src/` folder, the server will restart.  
  
If you need to update the database schema, you will have to shut down the server (`Ctrl+C`), run `npm run migrate` and then run again the server using the previous command.

### Shut down everything
To stop the server, just press `Ctrl+C`.
  
To stop and delete the database (running as a docker container):
```shell
docker stop modernmoodle-db-pg && docker modernmoodle-db-pg
```

### Available scripts
```shell
npm run build # build the project
npm run start # start the server (no hot-reload)
npm run dev # start the server (with hot-reload)
npm run migrate # apply migrations to the database
npm run unit-tests # run all unit tests
npm run integration-tests # run all integrations tests
```

### How to write tests
Please check [here](./documentation/contributing.md).

## Contributing & guidelines

If you want to contribute to the project, please see our [contributing guide](./documentation/contributing.md).