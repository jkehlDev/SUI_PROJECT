-- DROP EXISTING TABLE
DROP TABLE IF EXISTS "roleAppRules";
DROP TABLE IF EXISTS "roleUsersRules";

DROP TABLE IF EXISTS "apps";
DROP TABLE IF EXISTS "roles";


DROP TABLE IF EXISTS "users";


-- CREATE FRESH TABLE
CREATE TABLE IF NOT EXISTS "apps" (
  "app_id" SERIAL PRIMARY KEY,
  "app_name" TEXT NOT NULL,
  "app_description" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "roles" (
  "role_id" SERIAL PRIMARY KEY,
  "role_name" TEXT NOT NULL,
  "role_description" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "roleAppRules" (
  "rule_id" SERIAL PRIMARY KEY,
  "rule_roleId" INTEGER NOT NULL,
  "rule_appId" INTEGER NOT NULL,
  FOREIGN KEY("rule_roleId") REFERENCES "roles"("role_id"),
  FOREIGN KEY("rule_appId") REFERENCES "apps"("app_id")
);

CREATE TABLE IF NOT EXISTS "users" (
  "user_id" SERIAL PRIMARY KEY,
  "user_name" TEXT NOT NULL,
  "user_lastName" TEXT NOT NULL,
  "user_firstName" TEXT NOT NULL,
  "user_mail" TEXT NOT NULL,
  "user_password" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "roleUsersRules" (
  "rule_id" SERIAL PRIMARY KEY,
  "rule_roleId" INTEGER NOT NULL,
  "rule_userId" INTEGER NOT NULL,
  FOREIGN KEY("rule_roleId") REFERENCES "roles"("role_id"),
  FOREIGN KEY("rule_userId") REFERENCES "users"("user_id")
);

-- POPULATE FRESH TABLE

INSERT INTO "apps"("app_id","app_name","app_description") VALUES
(1,'kamban','Kamban free online application');

INSERT INTO "roles"("role_id","role_name","role_description") VALUES
(1,'visitor', 'None logged on user'),
(2,'user', 'Logged on user');

INSERT INTO "roleAppRules"("rule_roleId","rule_appId") VALUES
(2,1);

