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

    test("Constructor", () => {
        // Given
        // When
        sut = new TopicsService(dao);

        // Then
        expect(sut.dao).toBe(dao);
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

    test("Delete topic", async () => {
        // Given
        const topicId = 7;

        // When
        await sut.deleteTopic(topicId);

        // Then
        expect(dao.delete).toBeCalledTimes(1);
        expect(dao.delete).toHaveBeenCalledWith(topicId);

    })

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
            }
        ]
        dao.getAll = jest.fn().mockResolvedValue(topics);

        // When
        const actual = await sut.getAll();

        // Then
        expect(actual.length).toBe(3);
    })
})