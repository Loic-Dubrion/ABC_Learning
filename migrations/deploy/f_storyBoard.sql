-- Deploy abc_learning:f_storyBoard to pg

BEGIN;

-- Recovers activities and tools linked to a card
CREATE OR REPLACE FUNCTION get_activities(id_card INTEGER)
RETURNS JSON
LANGUAGE SQL
AS $$
    SELECT json_build_object(
        'card_id', c.id,
        'card_name', c.name,
        'activities', (
            SELECT json_agg(json_build_object(
                'activity_id', a.id,
                'activity_name', a.name,
                'tool_category', (
                    SELECT json_agg(json_build_object(
                        'tool_category_id', tc.id,
                        'tool_category_name', tc.name,
                        'tools', (
                            SELECT json_agg(json_build_object(
                                'tool_id', t.id,
                                'tool_name', t.name,
                                'level_id', l.id,
                                'level_name', l.name
                            ) ORDER BY t.id)
                            FROM tool t
                            JOIN card_has_tool cht ON t.id = cht.tool_id
                            JOIN level l ON t.level_id = l.id
                            WHERE tc.id = t.tool_category_id
                            AND cht.card_id = a.card_id
                        )
                    ) ORDER BY tc.id)
                    FROM tool_category tc
                    JOIN tool_category_has_card chtc ON tc.id = chtc.tool_category_id
                    WHERE chtc.card_id = a.card_id
                )
            ) ORDER BY a.id)
            FROM activity a
            WHERE a.card_id = c.id
        )
    )
    FROM card c
    WHERE c.id = id_card;
$$;

COMMIT;
