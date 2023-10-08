# modernMoodle

modernMoodle

# Dev

Start a Postgres database locally using Docker:
```shell
docker run -p 5432:5432 --name some-postgres -e POSTGRES_PASSWORD=password -e POSTGRES_USER=root -ePOSTGRES_DB=modernmoodledb -d postgres
```
  
Run the nodeJS server in dev mode
```shell
npm run dev
```