-- Verify abc_learning:init on pg

BEGIN;

-- Check if domain exists
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'email') THEN
    RAISE EXCEPTION 'Domain email does not exist';
  END IF;
END $$;

-- Try to select from each table. If the table does not exist, this will raise an error.
SELECT * FROM 
    "establishment", 
    "user", 
    "role", 
    "authorisation", 
    "user_has_role",
    "role_has_authorisation", 
    "sequence",
    "level",
    "tool_category",
    "tool",
    "activity",
    "session",
    "card",
    "card_has_tool"
    "tool_category_has_card" 
WHERE false;

ROLLBACK;
