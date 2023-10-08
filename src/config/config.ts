import dotenv from 'dotenv'

// Read .env file
dotenv.config()

// Export configuration
export const EXPRESS_PORT = parseInt(process.env.EXPRESS_APP_PORT || '4500')