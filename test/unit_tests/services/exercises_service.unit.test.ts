import { IExerciseDAO } from "../../../src/dao/exercise_dao";
import { IExercise } from "../../../src/models/exercise";
import { ExercisesService } from "../../../src/services/impl/exercises_service.impl";

describe("Exercises service", () => {
     // System Under Test
     let sut: ExercisesService;
     let dao: IExerciseDAO;

     beforeEach(() => {
          // Create a mock for the DAO
          dao = {
               getAll: jest.fn(),
               getById: jest.fn(),
               create: jest.fn(),
               delete: jest.fn(),
               update: jest.fn(),
          };

          // Create a new SUT
          sut = new ExercisesService(dao);
     });

     test("Constructor", () => {
          // Given
          // When
          sut = new ExercisesService(dao);

          // Then
          expect(sut.dao).toBe(dao);
     });

     test("Create exercise", async () => {
          // Given
          const exerciseId = 12;
          const newExercise: IExercise = {
               chapter_id: 1,
               statement: "1+1=?",
               solution: "2",
               difficulty_level: 42,
          };
          dao.create = jest.fn().mockResolvedValue(exerciseId);

          // When
          const actualExerciseId = await sut.createExercise(newExercise);

          // Then
          expect(actualExerciseId).toBe(exerciseId);
     });

     test("Delete exercise", async () => {
          // Given
          const exerciseId = 7;

          // When
          await sut.deleteExercise(exerciseId);

          // Then
          expect(dao.delete).toBeCalledTimes(1);
          expect(dao.delete).toHaveBeenCalledWith(exerciseId);
     });

     test("Get all exercises", async () => {
          // Given
          const chapters: IExercise[] = [
               {
                    chapter_id: 1,
                    statement: "1+1=?",
                    solution: "2",
                    difficulty_level: 42,
               },
               {
                    chapter_id: 2,
                    statement: "1+3=?",
                    solution: "4",
                    difficulty_level: 9,
               },
          ];
          dao.getAll = jest.fn().mockResolvedValue(chapters);

          // When
          const actual = await sut.getAll();

          // Then
          expect(actual.length).toBe(2);
     });

     test("Get by id", async () => {
          // Given
          const id = 17;
          dao.getById = jest.fn().mockResolvedValue({
               id: id,
               chapter_id: 1,
               statement: "1+1=?",
               solution: "2",
               difficulty_level: 42,
          });

          // When
          const exercise = await sut.getById(id);

          // Then
          expect(exercise?.id).toBeDefined();
          expect(exercise?.id).toBe(id);
          expect(dao.getById).toBeCalledTimes(1);
          expect(dao.getById).toBeCalledWith(id);
     });

     test("Delete exercise", async () => {
          // Given
          const id = 24;

          // When
          await sut.deleteExercise(id);

          // Then
          expect(dao.delete).toBeCalledTimes(1);
          expect(dao.delete).toBeCalledWith(id);
     });

     test("Update exercisse", async () => {
          // Given
          const id = 1;
          const newExercise = {
               chapter_id: 1,
               statement: "1+1=?",
               solution: "2",
               difficulty_level: 42,
          };

          // When
          await sut.updateExercise(id, newExercise);

          // Then
          expect(dao.update).toBeCalledTimes(1);
          expect(dao.update).toBeCalledWith(id, newExercise);
     });
});
