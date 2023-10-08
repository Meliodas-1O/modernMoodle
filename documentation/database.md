# Schema

- Topic table  
    - topic_id (primary key)
    - title
    - description

- Chapter table  
    - chapter_id (primary key)
    - topic_id (foreign key referencing the `Topic table`)
    - title
    - description

- Exercise table  
    - exercise_id (primary key)
    - chapter_id (foreign key referencing the `Chapter table`)
    - statement
    - solution
    - difficulty level