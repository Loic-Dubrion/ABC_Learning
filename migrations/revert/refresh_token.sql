-- Revert abc_learning:refresh_token from pg

BEGIN;

ALTER TABLE "user"
DROP COLUMN refresh_token;

COMMIT;
