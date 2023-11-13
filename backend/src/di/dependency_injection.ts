import { ChaptersController } from "../controllers/chapters.controller";
import { ExercisesController } from "../controllers/exercises.controller";
import { HealthcheckController } from "../controllers/healthcheck.controller";
import { TopicsController } from "../controllers/topics.controller";
import { PostgresChapterDAO } from "../dao/impl/postgres/postgres_chapters.dao.impl";
import { PostgresExerciseDAO } from "../dao/impl/postgres/postgres_exercises.dao.impl";
import { PostgresTopicsDAO } from "../dao/impl/postgres/postgres_topics.dao.impl";
import { ChaptersService } from "../services/impl/chapters_service.impl";
import { ExercisesService } from "../services/impl/exercises_service.impl";
import { TopicsService } from "../services/impl/topics_service.impl";

// For now, we create objects "manually".
// TODO: use a specialized container

let topics_controller: TopicsController | null = null;
let chapters_controller: ChaptersController | null = null;
let exercises_controller: ExercisesController | null = null;
let healthcheck_controller: HealthcheckController | null = null;

export function createTopicsController(): TopicsController {
     if (topics_controller !== null) {
          return topics_controller;
     }

     // First, create a PostgresDAO
     const postgres_topics_dao = new PostgresTopicsDAO();

     // Then, create a TopicsService
     const topics_service = new TopicsService(postgres_topics_dao);

     // Finally, create the TopicsController
     topics_controller = new TopicsController(topics_service);
     return topics_controller;
}

export function createChaptersController(): ChaptersController {
     if (chapters_controller !== null) {
          return chapters_controller;
     }

     // First, create a PostgresDAO for chapters and topics
     const postgres_chapters_dao = new PostgresChapterDAO();
     const postgres_topics_dao = new PostgresTopicsDAO();

     // Then, create a ChaptersService and a TopicsService
     const chapters_service = new ChaptersService(postgres_chapters_dao);
     const topics_service = new TopicsService(postgres_topics_dao);

     // Finally, create the ChaptersController
     chapters_controller = new ChaptersController(
          chapters_service,
          topics_service
     );
     return chapters_controller;
}

export function createExercisesController(): ExercisesController {
     if (exercises_controller !== null) {
          return exercises_controller;
     }

     // First, create a PostgresDAO for exercises and chapters
     const postgres_exercises_dao = new PostgresExerciseDAO();
     const postgres_chapters_dao = new PostgresChapterDAO();

     // Then, create an ExercisesService and a ChaptersService
     const exercises_service = new ExercisesService(postgres_exercises_dao);
     const chapters_service = new ChaptersService(postgres_chapters_dao);

     // Finally, create the ExercisesController
     exercises_controller = new ExercisesController(
          exercises_service,
          chapters_service
     );
     return exercises_controller;
}

export function createHealthcheckController(): HealthcheckController {
     if (healthcheck_controller !== null) {
          return healthcheck_controller;
     }

     // Create the HealthCheckController
     healthcheck_controller = new HealthcheckController();
     return healthcheck_controller;
}
