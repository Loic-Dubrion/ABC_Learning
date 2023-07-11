-- Revert abc_learning:f_crud_session from pg

BEGIN;

DROP FUNCTION IF EXISTS "create_session";

COMMIT;
