import { ChaptersController } from "../controllers/chapters_controller";
import { ExercisesController } from "../controllers/exercises_controller";
import { TopicsController } from "../controllers/topics_controller";
import { PostgresChapterDAO } from "../dao/impl/postgres/postgres_chapters_dao";
import { PostgresExerciseDAO } from "../dao/impl/postgres/postgres_exercises_dao";
import { PostgresTopicsDAO } from "../dao/impl/postgres/postgres_topics_dao";
import { ChaptersService } from "../services/impl/chapters_service.impl";
import { ExercisesService } from "../services/impl/exercises_service.impl";
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
     const chapters_service = new ChaptersService(postgres_chapters_dao);

     // Finally, create the ChaptersController
     const chapters_controller = new ChaptersController(chapters_service);
     return chapters_controller;
}

export function createExercisesController(): ExercisesController {
     // First, create a PostgresDAO
     const postgres_exercises_dao = new PostgresExerciseDAO();

     // Then, create an ExercisesService
     const exercises_service = new ExercisesService(postgres_exercises_dao);

     // Finally, create the ExercisesController
     const exercises_controller = new ExercisesController(exercises_service);
     return exercises_controller;
}
