import { ITopicDAO } from "../../../src/dao/topic_dao";
import { ITopic } from "../../../src/models/topic";
import { TopicsService } from "../../../src/services/topics_service";

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
        }

        // Create a new SUT
        sut = new TopicsService(dao);
    })

    test("Create topic", async () => {
        // Given
        const topicId = 12;
        const newTopic: ITopic = {
            title: "sample topic",
            description: "it is what it is"
        };
        dao.create = jest.fn().mockResolvedValue(topicId);

        // When
        const actualTopicId = await sut.createTopic(newTopic);

        // Then
        expect(actualTopicId).toBe(topicId);
    })
})