import { setup, teardown } from "./setup"
import request from "supertest";
import { Application } from "express";

describe ("Main integration tests suite", () => {

    jest.setTimeout(60 * 1000);

    beforeAll(async () => {
        await setup();
    })

    afterAll(async () => {
        await teardown();
    })

    it("Test1", () => {
        console.log("before request");
        expect(true).toBe(true);
        console.log("after request");
    })

})
