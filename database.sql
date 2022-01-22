CREATE TABLE "todos"(
	"id" SERIAL PRIMARY KEY NOT NULL,
	"summary" varchar(250) NOT NULL,
	"isComplete" boolean default false
);

