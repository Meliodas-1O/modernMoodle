import { ITopicDAO } from "../../../src/dao/topic_dao";
import { ITopic } from "../../../src/models/topic";
import { TopicsService } from "../../../src/services/impl/topics_service.impl";

describe("Topics service", () => {
     // System Under Test
     let sut: TopicsService;
     let dao: ITopicDAO;

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
          sut = new TopicsService(dao);
     });

     test("Constructor", () => {
          // Given
          // When
          sut = new TopicsService(dao);

          // Then
          expect(sut.dao).toBe(dao);
     });

     test("Create topic", async () => {
          // Given
          const topicId = 12;
          const newTopic: ITopic = {
               title: "sample topic",
               description: "it is what it is",
          };
          dao.create = jest.fn().mockResolvedValue(topicId);

          // When
          const actualTopicId = await sut.createTopic(newTopic);

          // Then
          expect(actualTopicId).toBe(topicId);
     });

     test("Delete topic", async () => {
          // Given
          const topicId = 7;

          // When
          await sut.deleteTopic(topicId);

          // Then
          expect(dao.delete).toBeCalledTimes(1);
          expect(dao.delete).toHaveBeenCalledWith(topicId);
     });

     test("Get all topics", async () => {
          // Given
          const topics: ITopic[] = [
               {
                    id: 1,
                    title: "article 1",
                    description: "description 1",
               },
               {
                    id: 2,
                    title: "article 2",
                    description: "description 2",
               },
               {
                    id: 3,
                    title: "article 3",
                    description: "description 3",
               },
          ];
          dao.getAll = jest.fn().mockResolvedValue(topics);

          // When
          const actual = await sut.getAll();

          // Then
          expect(actual.length).toBe(3);
     });

     test("Get by id", async () => {
          // Given
          const id = 17;
          dao.getById = jest
               .fn()
               .mockResolvedValue({
                    id: id,
                    title: "article",
                    description: "",
               });

          // When
          const topic = await sut.getById(id);

          // Then
          expect(topic?.id).not.toBeUndefined();
          expect(topic?.id).toBe(id);
          expect(dao.getById).toBeCalledTimes(1);
          expect(dao.getById).toBeCalledWith(id);
     });

     test("Delete topic", async () => {
          // Given
          const id = 24;

          // When
          await sut.deleteTopic(id);

          // Then
          expect(dao.delete).toBeCalledTimes(1);
          expect(dao.delete).toBeCalledWith(id);
     });

     test("Update topic", async () => {
          // Given
          const id = 1;
          const newTopic = {
               title: "new topic title",
               description: "new topic description",
          };

          // When
          await sut.updateTopic(id, newTopic);

          // Then
          expect(dao.update).toBeCalledTimes(1);
          expect(dao.update).toBeCalledWith(id, newTopic);
     });
});
