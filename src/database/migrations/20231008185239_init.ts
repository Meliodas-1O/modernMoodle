import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable ("topics",  (table) => {
            table.bigIncrements ("topic_id").primary;
            table.string ("title", 255);
            table.string ("description", 255);
        })
        .createTable ("chapters", (table) => {
            table.bigIncrements ("chapter_id").primary;
            table
                .bigInteger ("topic_id")
                .references ("topic_id")
                .inTable ("topics")
                .onDelete ("CASCADE")    // delete chapter if topic is deleted
                .onUpdate ("CASCADE");   // update chapter if topic is updated
            table.string ("title", 255);
            table.string ("description", 255);
        })
        .createTable ("exercises", (table) => {
            table.bigIncrements ("exercise_id").primary;
            table
                .bigInteger ("chapter_id")
                .references ("chapter_id")
                .inTable ("chapters")
                .onDelete ("CASCADE")
                .onUpdate ("CASCADE");
            table.string ("statement", 255);
            table.string ("solution", 255);
            table.integer ("difficulty_level");
        });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTableIfExists ("exercises")
        .dropTableIfExists ("chapters")
        .dropTableIfExists ("topics");
}

