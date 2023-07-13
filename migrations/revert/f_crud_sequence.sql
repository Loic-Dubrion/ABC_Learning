-- Revert abc_learning:f_crud_sequence from pg

BEGIN;

DROP FUNCTION IF EXISTS "get_sequence_detail";
DROP FUNCTION IF EXISTS "create_sequence";
DROP FUNCTION IF EXISTS "update_sequence";

COMMIT;
