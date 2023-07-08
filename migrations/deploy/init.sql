-- Deploy abc_learning:init to pg

BEGIN;

CREATE DOMAIN email AS TEXT
CHECK (
  VALUE ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
);

CREATE TABLE "establishment" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT UNIQUE NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "user" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "username" TEXT UNIQUE NOT NULL,
    "email" email UNIQUE NOT NULL,
    "password" TEXT NOT NULL,
    "establishment_id" INTEGER REFERENCES "establishment"("id") ON DELETE SET NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "role" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT UNIQUE NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "authorisation" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT UNIQUE NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "user_has_role" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "user_id" INTEGER REFERENCES "user"("id") ON DELETE CASCADE,
    "role_id" INTEGER REFERENCES "role"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "role_has_authorisation" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "role_id" INTEGER REFERENCES "role"("id") ON DELETE CASCADE,
    "authorisation_id" INTEGER REFERENCES "authorisation"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "sequence" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT UNIQUE NOT NULL,
    "user_id" INTEGER REFERENCES "user"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "level" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT UNIQUE NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "tool" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT UNIQUE NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "activity" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT UNIQUE NOT NULL,
    "level_id" INTEGER REFERENCES "level"("id") ON DELETE CASCADE,
    "tool_id" INTEGER REFERENCES "tool"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "session" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "sequence_id" INTEGER REFERENCES "sequence"("id") ON DELETE CASCADE,
    "activity_id" INTEGER REFERENCES "activity"("id") ON DELETE CASCADE,
    "comments" TEXT,
    "time" INTEGER,
    "is_presentiel" BOOLEAN,
    "is_group_work" BOOLEAN,
    "equipment" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "card" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT UNIQUE NOT NULL,
    "comments" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "card_has_tool" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "card_id" INTEGER REFERENCES "card"("id") ON DELETE CASCADE,
    "tool_id" INTEGER REFERENCES "tool"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

COMMIT;
