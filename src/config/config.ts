import dotenv from 'dotenv'

// Read .env file
dotenv.config()

// Express configuration
const EXPRESS_PORT: number = parseInt(process.env.EXPRESS_APP_PORT || '4500')

// Postgres configuration
const PG_HOST: string = process.env.PG_HOST || "localhost"
const PG_PORT: number = parseInt(process.env.PG_PORT || "3306")
const PG_USER: string = process.env.PG_USER || "root"
const PG_PASSWORD: string = process.env.PG_PASSWORD || "password"
const PG_DB: string = process.env.PG_DB || "modernmoodledb"

const config = {
    PG_CONFIG: {
        host: PG_HOST,
        port: PG_PORT,
        user: PG_USER,
        password: PG_PASSWORD,
        database: PG_DB,
    },
    EXPRESS_CONFIG: {
        port: EXPRESS_PORT,
    }
}

export default config;