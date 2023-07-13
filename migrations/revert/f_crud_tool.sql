-- Revert abc_learning:f_crud_tool from pg

BEGIN;

DROP FUNCTION IF EXISTS "create_tool";
DROP FUNCTION IF EXISTS "update_tool";
DROP FUNCTION IF EXISTS "create_card_has_tool";


COMMIT;
