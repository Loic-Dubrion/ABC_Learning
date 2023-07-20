-- Revert abc_learning:f_rbac from pg

BEGIN;

DROP FUNCTION IF EXISTS get_user_roles_and_permissions;

COMMIT;
