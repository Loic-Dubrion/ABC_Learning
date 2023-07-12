-- Revert abc_learning:init from pg

BEGIN;

DROP TABLE IF EXISTS "card_has_tool";
DROP TABLE IF EXISTS "tool_category_has_card";
DROP TABLE IF EXISTS "session";
DROP TABLE IF EXISTS "activity";
DROP TABLE IF EXISTS "tool";
DROP TABLE IF EXISTS "tool_category";
DROP TABLE IF EXISTS "level";
DROP TABLE IF EXISTS "sequence";
DROP TABLE IF EXISTS "card";
DROP TABLE IF EXISTS "role_has_authorisation";
DROP TABLE IF EXISTS "user_has_role";
DROP TABLE IF EXISTS "authorisation";
DROP TABLE IF EXISTS "role";
DROP TABLE IF EXISTS "user";
DROP TABLE IF EXISTS "establishment";

DROP DOMAIN IF EXISTS email;

COMMIT;
