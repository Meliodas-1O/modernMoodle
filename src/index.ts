import express, { Express } from "express";
import { addRoutes as addChaptersRoutes } from "./routes/chapter";
import topicRoutes from "./routes/topics";
import { addRoutes as addExercisesRoutes } from "./routes/exercise";
import { config } from "./config/config";
import { Server } from "http";

// Basic express app configuration
export const app: Express = express();
const port: number = config.EXPRESS_CONFIG.port;

// Add middleware(s)
app.use(express.json());

app.use("/topics", topicRoutes);
// Add all routes
addChaptersRoutes();
addExercisesRoutes();

// Run the server
const server: Server = app.listen(port, () => {
     console.log(`Server listening on port ${port}`);
});

export const closeServer = () => {
     server.close();
};
