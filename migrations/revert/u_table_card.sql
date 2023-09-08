-- Revert abc_learning:u_table_card from pg

BEGIN;

ALTER TABLE card
DROP CONSTRAINT chk_color_format;

COMMIT;
