import { TopicsController } from "../controllers/topics_controller";
import { PostgresTopicsDAO } from "../dao/impl/postgres/postgres_topics_dao";
import { TopicsService } from "../services/impl/topics_service.impl";

// For now, we create objects "manually".
// TODO: use a specialized container

export function createTopicsController(): TopicsController {
    // First, create a PostgresDAO
    const postgres_topics_dao = new PostgresTopicsDAO();

    // Then, create a TopicsService
    const topics_service = new TopicsService(postgres_topics_dao);

    // Finally, create the TopicsController
    const topics_controller = new TopicsController(topics_service);
    return topics_controller;
}