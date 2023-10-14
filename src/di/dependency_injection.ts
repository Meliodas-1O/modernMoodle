import { ChaptersController } from "../controllers/chapters_controller";
import { TopicsController } from "../controllers/topics_controller";
import { PostgresChapterDAO } from "../dao/impl/postgres/postgres_chapters_dao";
import { PostgresTopicsDAO } from "../dao/impl/postgres/postgres_topics_dao";
import { ChapterService } from "../services/chapters_service";
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

export function createChaptersController(): ChaptersController {
     // First, create a PostgresDAO
     const postgres_chapters_dao = new PostgresChapterDAO();

     // Then, create a ChaptersService
     const chapters_service = new ChapterService(postgres_chapters_dao);

     // Finally, create the ChaptersController
     const chapters_controller = new ChaptersController(chapters_service);
     return chapters_controller;
}
