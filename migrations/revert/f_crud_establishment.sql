-- Revert abc_learning:f_crud_establishment from pg

BEGIN;

DROP FUNCTION IF EXISTS "create_establishment";
DROP FUNCTION IF EXISTS "update_establishment";
COMMIT;
