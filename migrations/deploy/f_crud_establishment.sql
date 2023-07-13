-- Deploy abc_learning:f_crud_establishment to pg

BEGIN;

-- Create Sequence
CREATE OR REPLACE FUNCTION create_establishment(json_data JSON)
RETURNS TABLE (id INTEGER, name TEXT) AS
$$
DECLARE 
    data JSONB := json_data::JSONB;
BEGIN
    RETURN QUERY
    INSERT INTO establishment (name)
    VALUES (
        data->>'name'
        )
    RETURNING establishment.id, establishment.name;
END;
$$ LANGUAGE plpgsql;

-- Update establishment
CREATE OR REPLACE FUNCTION update_establishment(establishment_id INTEGER, json_data JSON)
RETURNS TABLE (id INTEGER, name TEXT) AS
$$
DECLARE 
    data JSONB := json_data::JSONB;
BEGIN
    RETURN QUERY
    UPDATE establishment
    SET
        name = data->>'name'
    WHERE establishment.id = establishment_id
    RETURNING establishment.id, establishment.name;
END;
$$ LANGUAGE plpgsql;

COMMIT;
