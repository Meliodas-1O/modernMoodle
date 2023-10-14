import express, { Express } from "express";
import topicRoutes from "./routes/topics.routes";
import chapterRoutes from "./routes/chapter.routes";
import exercisesRoutes from "./routes/exercise.routes";
import { config } from "./config/config";
import { Server } from "http";

// Basic express app configuration
export const app: Express = express();
const port: number = config.EXPRESS_CONFIG.port;

// Add middleware(s)
app.use(express.json());

// Add all routes
app.use("/topics", topicRoutes);
app.use("/chapters", chapterRoutes);
app.use("/exercises", exercisesRoutes);

// Run the server
const server: Server = app.listen(port, () => {
     console.log(`Server listening on port ${port}`);
});

export const closeServer = () => {
     server.close();
};
