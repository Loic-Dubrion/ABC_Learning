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
    INSERT INTO session (name, sequence_id, card_id, tool_id, comments, time, is_face_to_face, is_group_work, equipment)
    VALUES (
        data->>'name', 
        CAST(data->>'sequence_id' AS INTEGER),
        CAST(data->>'card_id' AS INTEGER),
        CAST(data->>'tool_id' AS INTEGER),
        data->>'comments',
        CAST(data->>'time' AS INTEGER),
        CAST(data->>'is_face_to_face' AS BOOLEAN),
        CAST(data->>'is_group_work' AS BOOLEAN),
        data->>'equipment'
    )
    RETURNING session.id, session.name;
END;
$$ LANGUAGE plpgsql;

-- Update session
CREATE OR REPLACE FUNCTION update_session(session_id INTEGER, json_data JSON)
RETURNS TABLE (id INTEGER, name TEXT, sequence_id INTEGER, card_id INTEGER, tool_id INTEGER, comments TEXT, "time" INTEGER, is_face_to_face BOOLEAN, is_group_work BOOLEAN, equipment TEXT) AS
$$
DECLARE 
    data JSONB := json_data::JSONB;
BEGIN
    RETURN QUERY
    UPDATE session
    SET
        name = COALESCE(data->>'name', session.name),
        sequence_id = COALESCE(CAST(data->>'sequence_id' AS INTEGER), session.sequence_id),
        card_id = COALESCE(CAST(data->>'card_id' AS INTEGER), session.card_id),
        tool_id = COALESCE(CAST(data->>'tool_id' AS INTEGER), session.tool_id),
        comments = COALESCE(data->>'comments', session.comments),
        "time" = COALESCE(CAST(data->>'time' AS INTEGER), session."time"),
        is_face_to_face = COALESCE(CAST(data->>'is_face_to_face' AS BOOLEAN), session.is_face_to_face),
        is_group_work = COALESCE(CAST(data->>'is_group_work' AS BOOLEAN), session.is_group_work),
        equipment = COALESCE(data->>'equipment', session.equipment)
    WHERE session.id = session_id
    RETURNING session.id, session.name, session.sequence_id, session.card_id, session.tool_id, session.comments, session."time", session.is_face_to_face, session.is_group_work, session.equipment;
END;
$$ LANGUAGE plpgsql;

COMMIT;
