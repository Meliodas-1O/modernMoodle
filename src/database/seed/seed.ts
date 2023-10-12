import { Knex } from "knex";

export async function seed(db: Knex): Promise<void> {
     // Deletes ALL existing entries
     await db("topics").del();

     // Create topic math
     const mathTopicId = await db("topics")
          .insert({
               title: "math",
               description: "goat",
          })
          .returning("topic_id");

     // Add chapter 1 to math topic
     const mathChapter1Id = await db("chapters")
          .insert({
               topic_id: mathTopicId[0].topic_id,
               title: "chapter 1",
               description: "calculus",
          })
          .returning("chapter_id");

     // Add exercise 1 to math chapter 1
     await db("exercises").insert({
          chapter_id: mathChapter1Id[0].chapter_id,
          statement: "1 + 2 = ?",
          solution: "1 + 2 = 3",
          difficulty_level: 1,
     });
}
