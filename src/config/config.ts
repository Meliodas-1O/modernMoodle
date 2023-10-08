import dotenv from 'dotenv'

// Read .env file
dotenv.config()

// Express configuration
export const EXPRESS_PORT = parseInt(process.env.EXPRESS_APP_PORT || '4500')
export const PG_HOST = process.env.PG_HOST || "localhost"
export const PG_PORT = parseInt(process.env.PG_PORT || "5432")
export const PG_USER = process.env.PG_USER || "root"
export const PG_PASSWORD = process.env.PG_PASSWORD || "password"
export const PG_DB = process.env.PG_DB || "modernmoodledb"
