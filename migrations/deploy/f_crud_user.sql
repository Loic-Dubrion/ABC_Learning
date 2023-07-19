-- Deploy abc_learning:f_crud_user to pg

BEGIN;

-- Create User
CREATE OR REPLACE FUNCTION create_user(json_data JSON)
RETURNS TABLE (id INTEGER, username TEXT) AS
$$
DECLARE 
    data JSONB := json_data::JSONB;
BEGIN
    RETURN QUERY
    INSERT INTO "user" (username, email, password, establishment_id)
    VALUES (
        data->>'username',
        data->>'email',
        data->>'password',
        CAST(data->>'establishment_id' AS INTEGER)
    )
    RETURNING "user".id, "user".username;
END;
$$ LANGUAGE plpgsql;

-- Update user
CREATE OR REPLACE FUNCTION update_user(user_id INTEGER, json_data JSON)
RETURNS TABLE (id INTEGER, username TEXT) AS
$$
DECLARE 
    data JSONB := json_data::JSONB;
BEGIN
    RETURN QUERY
    UPDATE "user"
    SET
        username = COALESCE(data->>'username', "user".username),
        email = COALESCE(data->>'email', "user".email),
        password = COALESCE(data->>'password', "user".password),
        establishment_id = COALESCE(CAST(data->>'establishment_id' AS INTEGER), "user".establishment_id)
    WHERE "user".id = user_id
    RETURNING "user".id, "user".username;
END;
$$ LANGUAGE plpgsql;

COMMIT;
