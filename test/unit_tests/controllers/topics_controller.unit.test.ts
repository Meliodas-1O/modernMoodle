import { TopicsController } from "../../../src/controllers/topics_controller";
import { ITopicsService } from "../../../src/services/topics_service";
import httpMocks from "node-mocks-http";
import { ITopic } from "../../../src/models/topic";
import { TopicErrorMessages } from "../../../src/utils/helpers";

describe("Topics controller", () => {
     // System Under Test
     let sut: TopicsController;
     let service: ITopicsService;

     /* eslint-disable  @typescript-eslint/no-explicit-any */
     let request: httpMocks.MockRequest<any>;

     /* eslint-disable  @typescript-eslint/no-explicit-any */
     let response: httpMocks.MockResponse<any>;

     beforeEach(() => {
          // Create mock for the service
          service = {
               getAll: jest.fn(),
               getById: jest.fn(),
               createTopic: jest.fn(),
               deleteTopic: jest.fn(),
               updateTopic: jest.fn(),
          };

          // Create a new SUT
          sut = new TopicsController(service);
          request = httpMocks.createRequest();
          response = httpMocks.createResponse();
     });

     test("Constructor", () => {
          // Given
          // When
          sut = new TopicsController(service);

          // Then
          expect(sut.service).toBeDefined();
          expect(sut.service).toBe(service);
     });

     test("Get all topics (OK)", async () => {
          // Given
          const topics = [
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
          service.getAll = jest.fn().mockResolvedValue(topics);

          // When
          await sut.getAllTopics(request, response);

          // Then
          expect(response.statusCode).toBe(200);
          const data: ITopic[] = response._getData();
          expect(data).toBe(topics);
     });

     test("Get all topics (Internal error)", async () => {
          // Given
          service.getAll = jest.fn().mockResolvedValue(null);

          // When
          await sut.getAllTopics(request, response);

          // Then
          expect(response.statusCode).toBe(500);
          expect(response._getData()).toBeDefined();
          expect(response._getData().message).toBe(
               TopicErrorMessages.RETRIEVAL_ERROR
          );
          expect(response._getData().status).toBe(500);
     });

     test("Get topic by ID (OK)", async () => {
          // Given
          const topicId = 1;
          const topic = {
               id: topicId,
               title: "Test Topic",
               description: "Test Description",
          };
          service.getById = jest.fn().mockResolvedValue(topic);

          // When
          request.params.id = topicId;
          await sut.getTopicById(request, response);

          // Then
          expect(response.statusCode).toBe(200);
          const data: ITopic = response._getData();
          expect(data).toBe(topic);
     });

     test("Get topic by ID (Not Found)", async () => {
          // Given
          const topicId = 1;
          service.getById = jest.fn().mockResolvedValue(null);

          // When
          request.params.id = topicId;
          await sut.getTopicById(request, response);

          // Then
          expect(response.statusCode).toBe(404);
          expect(response._getData()).toBeDefined();
          expect(response._getData().message).toBe(
               TopicErrorMessages.NO_TOPIC_BY_ID
          );
          expect(response._getData().status).toBe(404);
     });

     test("Create topic (OK)", async () => {
          // Given
          const newTopic: ITopic = {
               title: "New Topic",
               description: "New Description",
          };
          const createdTopicId = 1;
          service.createTopic = jest.fn().mockResolvedValue(createdTopicId);

          // When
          request.body = newTopic;
          await sut.createTopic(request, response);

          // Then
          console.log(response);
          expect(response.statusCode).toBe(200);
          //expect(response._getData()).toBe(createdTopicId);
     });

     test("Create topic (Bad Request - Empty Request Body)", async () => {
          // Given
          request.body = {};

          // When
          await sut.createTopic(request, response);

          // Then
          expect(response.statusCode).toBe(400);
          expect(response._getData()).toBeDefined();
          expect(response._getData().message).toBe(
               TopicErrorMessages.EMPTY_REQUEST_BODY
          );
          expect(response._getData().status).toBe(400);
     });

     test("Create topic (Forbidden - Invalid Field)", async () => {
          // Given
          const newTopic = {
               title: "New Topic",
               invalidField: "Invalid Value",
          };

          // When
          request.body = newTopic;
          await sut.createTopic(request, response);

          // Then
          expect(response.statusCode).toBe(403);
          expect(response._getData()).toBeDefined();
          expect(response._getData().message).toContain(
               TopicErrorMessages.INVALID_FIELD
          );
          expect(response._getData().status).toBe(403);
     });

     test("Delete topic (OK)", async () => {
          // Given
          const topicId = 1;

          // When
          request.params.id = topicId;
          await sut.deleteTopic(request, response);

          // Then
          expect(response.statusCode).toBe(200);
          expect(response._getData()).toEqual("");
     });

     test("Update topic (OK)", async () => {
          // Given
          const topicId = 1;
          const updatedTopic: ITopic = {
               title: "Updated Topic",
               description: "Updated Description",
          };
          const returnedTopic = { ...updatedTopic, id: topicId };
          service.updateTopic = jest.fn().mockResolvedValue(returnedTopic);

          // When
          request.params.id = topicId;
          request.body = updatedTopic;
          await sut.updateTopic(request, response);

          // Then
          expect(response.statusCode).toBe(200);
          expect(response._getData()).toBe(returnedTopic);
     });

     test("Update topic (Not Found)", async () => {
          // Given
          const topicId = 1;
          const updatedTopic = {
               title: "new title",
               description: "new description",
          };
          service.updateTopic = jest.fn().mockResolvedValue(null);

          // When
          request.params.id = topicId;
          request.body = updatedTopic;
          await sut.updateTopic(request, response);

          // Then
          expect(response.statusCode).toBe(404);
          expect(response._getData()).toBeDefined();
          expect(response._getData().message).toBe(
               TopicErrorMessages.UPDATE_ERROR
          );
          expect(response._getData().status).toBe(404);
     });
});
