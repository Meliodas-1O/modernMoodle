import { Knex } from "knex";

export async function seed(db: Knex): Promise<void> {
    // Deletes ALL existing entries
    await db("topics").del();

    // Create topics
    await db("topics").insert([
        {
            title: "maths",
            description: "goat",
        },
        {
            title: "data structure & algorithms",
            description: "super",
        }
    ]);
}