-- Revert abc_learning:f_crud_session from pg

BEGIN;

DROP FUNCTION IF EXISTS "create_session";
DROP FUNCTION IF EXISTS "update_session";

COMMIT;
