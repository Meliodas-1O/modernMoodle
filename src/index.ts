import express, { Express } from "express";
import { addRoutes as addTopicsRoutes } from "./routes/topics";
import { addRoutes as addChaptersRoutes } from "./routes/chapter";
import { addRoutes as addExercisesRoutes } from "./routes/exercise";
import { config } from "./config/config";
import { Server } from "http";

// Basic express app configuration
export const app: Express = express();
const port: number = config.EXPRESS_CONFIG.port;

// Add middleware(s)
app.use(express.json());

// Add all routes
addTopicsRoutes();
addChaptersRoutes();
addExercisesRoutes();

// Run the server
const server: Server = app.listen(port, () => {
     console.log(`Server listening on port ${port}`);
});

export const closeServer = () => {
     server.close();
 };