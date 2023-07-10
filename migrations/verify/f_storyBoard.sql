-- Verify abc_learning:f_storyBoard on pg

BEGIN;

SELECT * FROM 
    "get_activities"(1)
WHERE false;
ROLLBACK;
