# modernMoodle

modernMoodle

## Quick start

Start a Postgres database locally using Docker:
```shell
docker run -p 5432:5432 --name some-postgres -e POSTGRES_PASSWORD=password -e POSTGRES_USER=root -ePOSTGRES_DB=modernmoodledb -d postgres
```
  
Install  all packages:
```shell
npm i
```
  
Build the project:
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
