-- Deploy abc_learning:u_table_card to pg

BEGIN;

ALTER TABLE card
ADD CONSTRAINT chk_color_format CHECK (color ~* '^#([A-Fa-f0-9]{6})$');

COMMIT;
