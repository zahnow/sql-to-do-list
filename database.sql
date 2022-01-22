CREATE TABLE "todos"(
	"id" SERIAL PRIMARY KEY NOT NULL,
	"summary" varchar(250) NOT NULL,
	"is_complete" boolean default false
);

