-- Deploy abc_learning:f_crud_tool to pg

BEGIN;

-- Create Tool
CREATE OR REPLACE FUNCTION create_tool(json_data JSON)
RETURNS TABLE (id INTEGER, name TEXT) AS
$$
DECLARE 
    data JSONB := json_data::JSONB;
BEGIN
    RETURN QUERY
    INSERT INTO tool (name, level_id, tool_category_id)
    VALUES (
        data->>'name', 
        CAST(data->>'level_id' AS INTEGER),
        CAST(data->>'tool_category_id' AS INTEGER)
    )
    RETURNING tool.id, tool.name;
END;
$$ LANGUAGE plpgsql;

-- Update session
CREATE OR REPLACE FUNCTION update_tool(tool_id INTEGER, json_data JSON)
RETURNS TABLE (id INTEGER, name TEXT, level_id INTEGER, tool_category_id INTEGER) AS
$$
DECLARE 
    data JSONB := json_data::JSONB;
BEGIN
    RETURN QUERY
    UPDATE tool
    SET
        name = COALESCE(data->>'name', tool.name),
        level_id = COALESCE(CAST(data->>'sequence_id' AS INTEGER), tool.level_id),
        tool_category_id = COALESCE(CAST(data->>'tool_id' AS INTEGER), tool.tool_category_id)
    WHERE tool.id = tool_id
    RETURNING tool.id, tool.name, tool.level_id, tool.tool_category_id;
END;
$$ LANGUAGE plpgsql;

COMMIT;
