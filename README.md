# modernMoodle

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


## Contributing