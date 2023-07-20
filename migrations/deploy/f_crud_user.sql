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

-- Read user
CREATE OR REPLACE FUNCTION get_user_info(id_user INT)
RETURNS json AS $$
DECLARE
    result json;
BEGIN
    SELECT 
        json_build_object(
            'user_id', u.id,
            'username', u.username,
            'email', u.email,
            'establishment', e.name,
            'roles', json_agg(
                json_build_object(
                    'role_name', r.name,
                    'authorisations', a.name
                )
            )
        ) INTO result
    FROM 
        "user" u
    LEFT JOIN
        user_has_role uhr ON u.id = uhr.user_id
    LEFT JOIN
        role r ON uhr.role_id = r.id
    LEFT JOIN
        role_has_authorisation rha ON r.id = rha.role_id
    LEFT JOIN
        authorisation a ON rha.authorisation_id = a.id
    LEFT JOIN 
    	establishment e ON u.establishment_id = e.id
    WHERE
        u.id = id_user
    GROUP BY
        u.id, e.name;
    
    RETURN result;
END; $$
LANGUAGE 'plpgsql';

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
