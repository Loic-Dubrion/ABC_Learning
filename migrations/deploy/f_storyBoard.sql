-- Deploy abc_learning:f_storyBoard to pg

BEGIN;

-- Recovers activities linked to a card
CREATE OR REPLACE FUNCTION get_activities(id_card INTEGER)
RETURNS JSON
LANGUAGE SQL
AS $$
    SELECT json_build_object(
        'card_id', c.id,
        'card_name', c.name,
        'tools', (
            SELECT json_agg(json_build_object(
                'tool_id', t.id,
                'tool_name', t.name,
                'activities', (
                    SELECT json_agg(json_build_object(
                        'activity_id', a.id,
                        'activity_name', a.name,
                        'level_id', l.id,
                        'level_name', l.name
                    ) ORDER BY a.id)
                    FROM activity a
                    JOIN level l ON a.level_id = l.id
                    WHERE t.id = a.tool_id
                )
            ) ORDER BY t.id)
            FROM tool t
            JOIN card_has_tool cht ON t.id = cht.tool_id AND c.id = cht.card_id
        )
    )
    FROM card c
    WHERE c.id = id_card;
$$;

COMMIT;
