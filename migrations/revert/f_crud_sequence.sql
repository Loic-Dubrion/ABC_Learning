-- Revert abc_learning:f_crud_sequence from pg

BEGIN;

DROP FUNCTION IF EXISTS "get_sequence_detail";

COMMIT;
