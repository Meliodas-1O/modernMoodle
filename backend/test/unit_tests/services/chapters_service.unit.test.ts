import { IChapterDAO } from "../../../src/dao/chapter.dao.interface";
import { IChapter } from "../../../src/models/chapter";
import { ChaptersService } from "../../../src/services/impl/chapters_service.impl";

describe("Chapters service", () => {
     // System Under Test
     let sut: ChaptersService;
     let dao: IChapterDAO;

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
          sut = new ChaptersService(dao);
     });

     test("Constructor", () => {
          // Given
          // When
          sut = new ChaptersService(dao);

          // Then
          expect(sut.dao).toBe(dao);
     });

     test("Create chapter", async () => {
          // Given
          const chapterId = 12;
          const newChapter: IChapter = {
               topic_id: 1,
               title: "sample topic",
               description: "it is what it is",
          };
          dao.create = jest.fn().mockResolvedValue(chapterId);

          // When
          const actualChapterId = await sut.createChapter(newChapter);

          // Then
          expect(actualChapterId).toBe(chapterId);
     });

     test("Delete chapter", async () => {
          // Given
          const chapterId = 7;

          // When
          await sut.deleteChapter(chapterId);

          // Then
          expect(dao.delete).toBeCalledTimes(1);
          expect(dao.delete).toHaveBeenCalledWith(chapterId);
     });

     test("Get all chapters", async () => {
          // Given
          const chapters: IChapter[] = [
               {
                    topic_id: 1,
                    id: 1,
                    title: "chapter 1",
                    description: "description 1",
               },
               {
                    topic_id: 1,
                    id: 2,
                    title: "chapter 2",
                    description: "description 2",
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
               topic_id: 1,
               title: "chapter",
               description: "",
          });

          // When
          const chapter = await sut.getById(id);

          // Then
          expect(chapter?.id).not.toBeUndefined();
          expect(chapter?.id).toBe(id);
          expect(dao.getById).toBeCalledTimes(1);
          expect(dao.getById).toBeCalledWith(id);
     });

     test("Delete chapter", async () => {
          // Given
          const id = 24;

          // When
          await sut.deleteChapter(id);

          // Then
          expect(dao.delete).toBeCalledTimes(1);
          expect(dao.delete).toBeCalledWith(id);
     });

     test("Update chapter", async () => {
          // Given
          const id = 1;
          const newChapter = {
               topic_id: 14,
               title: "new chapter title",
               description: "new chapter description",
          };

          // When
          await sut.updateChapter(id, newChapter);

          // Then
          expect(dao.update).toBeCalledTimes(1);
          expect(dao.update).toBeCalledWith(id, newChapter);
     });
});
