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
});
