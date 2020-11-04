BEGIN;

-- DROP EXISTING TABLE
DROP TABLE IF EXISTS "users" CASCADE;
-- DROP TABLE IF EXISTS "nodes" CASCADE;
-- DROP TABLE IF EXISTS "nodeLinks" CASCADE;
-- DROP TABLE IF EXISTS "sensors" CASCADE;
-- DROP TABLE IF EXISTS "sensorLinks" CASCADE;

-- CREATE FRESH TABLE
CREATE TABLE IF NOT EXISTS "users" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "password" TEXT NOT NULL,
  "isAdmin" BOOLEAN NOT NULL DEFAULT FALSE,
  CONSTRAINT "user" UNIQUE("name")
);

-- -- CREATE FRESH TABLE
-- CREATE TABLE IF NOT EXISTS "nodes" (
--   "id" SERIAL PRIMARY KEY  
-- );

-- -- CREATE FRESH TABLE
-- CREATE TABLE IF NOT EXISTS "nodeLinks" (
--   "id" SERIAL PRIMARY KEY,
--   "nodesFromId" INTEGER NOT NULL REFERENCES "nodes" ("id"),
--   "NodeId" INTEGER NOT NULL REFERENCES "nodes" ("id")
-- );

-- -- CREATE FRESH TABLE
-- CREATE TABLE IF NOT EXISTS "sensors" (
--   "id" SERIAL PRIMARY KEY,
--   "value" TEXT NOT NULL
-- );

-- -- CREATE FRESH TABLE
-- CREATE TABLE IF NOT EXISTS "sensorLinks" (
--   "id" SERIAL PRIMARY KEY,
--   "sensorsId" INTEGER NOT NULL REFERENCES "sensors" ("id"),
--   "nodeId" INTEGER NOT NULL REFERENCES "nodes" ("id")
-- );

COMMIT;
