import { app } from "../../../src";
import { setup, teardown } from "../utils/setup";
import request from "supertest";

describe("Healthcheck integration tests suite", () => {
    jest.setTimeout(60 * 1000);

    beforeAll(async () => {
        await setup();
    })

    afterAll(async () => {
        await teardown();
    })

    test("1 - Get health", async () => {
        // Given
        // When
        const response = await request(app).get("/healthcheck");

        // Then
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(
            {message: "All good mate"}
        );
    })
})