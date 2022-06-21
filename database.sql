
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

-- DATABASE IS CALLED code_buddy

CREATE DATABASE "code_buddy";

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (80) NOT NULL,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
    "recent_topic_completed" int NOT NULL
);

CREATE TABLE "results" (
	"user_id" int NOT NULL,
	"elements_results" int NOT NULL,
	"images_results" int NOT NULL,
	"links_results" int NOT NULL,
	"lists_results" int NOT NULL,
	"styles_results" int NOT NULL,
	"buttons_results" int NOT NULL,
	"tables_results" int NOT NULL,
	"forms_results" int NOT NULL,
	"final_results" int NOT NULL
);

ALTER TABLE "results" ADD CONSTRAINT "results_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");


