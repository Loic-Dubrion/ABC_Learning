-- Revert abc_learning:f_storyBoard from pg

BEGIN;

DROP FUNCTION IF EXISTS "get_activities";

COMMIT;
