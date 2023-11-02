import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
     return knex.schema
          .createTableIfNotExists("topics", (table) => {
               table.bigIncrements("id").primary();
               table.string("title", 255);
               table.string("description", 255);
          })
          .createTableIfNotExists("chapters", (table) => {
               table.bigIncrements("id").primary();
               table.bigInteger("topic_id")
                    .references("id")
                    .inTable("topics")
                    .onDelete("CASCADE") // delete chapter if topic is deleted
                    .onUpdate("CASCADE"); // update chapter if topic is updated
               table.string("title", 255);
               table.string("description", 255);
          })
          .createTableIfNotExists("exercises", (table) => {
               table.bigIncrements("id").primary();
               table.bigInteger("chapter_id")
                    .references("id")
                    .inTable("chapters")
                    .onDelete("CASCADE") // delete exercise if chapter is deleted
                    .onUpdate("CASCADE"); // update exercisse if chapter is updated
               table.string("statement", 255);
               table.string("solution", 255);
               table.integer("difficulty_level");
          });
}

export async function down(knex: Knex): Promise<void> {
     return knex.schema
          .dropTableIfExists("exercises")
          .dropTableIfExists("chapters")
          .dropTableIfExists("topics");
}
