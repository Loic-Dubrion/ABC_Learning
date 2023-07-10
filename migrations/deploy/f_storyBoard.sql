-- Deploy abc_learning:f_storyBoard to pg

BEGIN;

CREATE OR REPLACE FUNCTION get_activities(id_card INTEGER)
RETURNS JSON
LANGUAGE SQL
AS $$
    SELECT json_agg(json_build_object(
        'card_id', c.id,
        'card_name', c.name,
        'tools', (
            SELECT json_agg(json_build_object(
                'tool_id', t.id,
                'tool_name', t.name,
                'activities', (
                    SELECT json_agg(json_build_object(
                        'activity_id', a.id,
                        'activity_name', a.name
                    ) ORDER BY a.id)
                    FROM activity a
                    JOIN activity_has_card ahc ON a.id = ahc.activity_id AND c.id = ahc.card_id
                    WHERE t.id = a.tool_id
                )
            ) ORDER BY t.id)
            FROM tool t
            JOIN card_has_tool cht ON t.id = cht.tool_id AND c.id = cht.card_id
        )
    ))
    FROM card c
    WHERE c.id = id_card;
$$;


COMMIT;
