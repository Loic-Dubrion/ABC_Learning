-- Deploy abc_learning:f_crud_session to pg

BEGIN;

-- Create Session
CREATE OR REPLACE FUNCTION create_session(json_data JSON)
RETURNS TABLE (id INTEGER, name TEXT) AS
$$
DECLARE 
    data JSONB := json_data::JSONB;
BEGIN
    RETURN QUERY
    INSERT INTO session (name, sequence_id, card_id, activity_id, comments, time, is_face_to_face, is_group_work, equipment)
    VALUES (
        data->>'name', 
        CAST(data->>'sequence_id' AS INTEGER),
        CAST(data->>'card_id' AS INTEGER),
        CAST(data->>'activity_id' AS INTEGER),
        data->>'comments',
        CAST(data->>'time' AS INTEGER),
        CAST(data->>'is_face_to_face' AS BOOLEAN),
        CAST(data->>'is_group_work' AS BOOLEAN),
        data->>'equipment'
    )
    RETURNING session.id, session.name;
END;
$$ LANGUAGE plpgsql;



COMMIT;
