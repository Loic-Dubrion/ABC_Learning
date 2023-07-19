-- Revert abc_learning:f_crud_user from pg

BEGIN;

DROP FUNCTION IF EXISTS "create_user";
DROP FUNCTION IF EXISTS "update_user";

COMMIT;
