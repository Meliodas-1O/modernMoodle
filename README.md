# modernMoodle

modernMoodle

## Quick start

Start a Postgres database locally using Docker:
```shell
docker run -p 5432:5432 --name some-postgres -e POSTGRES_PASSWORD=password -e POSTGRES_USER=root -ePOSTGRES_DB=modernmoodledb -d postgres
```
  
Install  all npm packages:
```shell
npm i
```
  
Trigger the database migration (choose one):
```shell
npm run migrate # on Windows
npm run migrate-macos # on macOS, UNIX...
```
  
Build the project for the first time:
```shell
npm run build
```
  
Run the nodeJS server in dev mode:
```shell
npm run dev
```

## Check the database

To see what's in the database, first connect to the Docker container:
```shell
docker exec -ti some-postgres /bin/bash
```
  
Then, execute the psql command to go inside the database:
```shell
psql -d modernmoodledb
```
  
You can then query any table you want !
