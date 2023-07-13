-- Deploy abc_learning:f_crud_sequence to pg

BEGIN;

-- Read One sequence
CREATE OR REPLACE FUNCTION get_sequence_detail(id_query INT)
RETURNS TABLE (
  sequence_id INT,
  sequence_name TEXT,
  sessions JSON
) AS $$
BEGIN
  RETURN QUERY
  SELECT seq.id AS sequence_id, seq.name AS sequence_name, (
    SELECT json_agg(json_build_object(
      'session_id', ses.id,
      'session_name', ses.name,
      'card_name', c.name,
      'tool_name', t.name,
      'comments', ses.comments,
      'time', ses.time,
      'is_face_to_face', ses.is_face_to_face,
      'is_group_work', ses.is_group_work,
      'equipment', ses.equipment,
      'level_name', l.name
    ) ORDER BY ses.id)
    FROM session ses
    JOIN card c ON ses.card_id = c.id
    JOIN tool t ON ses.tool_id = t.id
    JOIN level l ON t.level_id = l.id
    WHERE ses.sequence_id = seq.id
  ) AS sessions
  FROM sequence seq
  WHERE seq.id = id_query;
END;
$$ LANGUAGE plpgsql;

-- Create Sequence
CREATE OR REPLACE FUNCTION create_sequence(json_data JSON)
RETURNS TABLE (id INTEGER, name TEXT) AS
$$
DECLARE 
    data JSONB := json_data::JSONB;
BEGIN
    RETURN QUERY
    INSERT INTO sequence (name)
    VALUES (
        data->>'name'
        )
    RETURNING sequence.id, sequence.name;
END;
$$ LANGUAGE plpgsql;

-- Update sequence
CREATE OR REPLACE FUNCTION update_sequence(sequence_id INTEGER, json_data JSON)
RETURNS TABLE (id INTEGER, name TEXT) AS
$$
DECLARE 
    data JSONB := json_data::JSONB;
BEGIN
    RETURN QUERY
    UPDATE sequence
    SET
        name = data->>'name'
    WHERE sequence.id = sequence_id
    RETURNING sequence.id, sequence.name;
END;
$$ LANGUAGE plpgsql;

COMMIT;
