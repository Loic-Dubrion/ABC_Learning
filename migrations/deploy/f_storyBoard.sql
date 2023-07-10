-- Deploy abc_learning:f_storyBoard to pg

BEGIN;

CREATE OR REPLACE FUNCTION get_activities(id_card INTEGER)
RETURNS JSON
LANGUAGE SQL
AS $$
    SELECT json_object_agg(
        c.name,
        (
            SELECT json_object_agg(
                t.name,
                (
                    SELECT json_agg(a.name ORDER BY a.name)
                    FROM activity a
                    JOIN activity_has_card ahc ON ahc.activity_id = a.id
                    WHERE ahc.card_id = c.id AND cht.tool_id = t.id
                )
                ORDER BY t.id
            )
            FROM tool t
            JOIN card_has_tool cht ON cht.tool_id = t.id
            WHERE cht.card_id = c.id
        )
    )
    FROM card c
    WHERE c.id = id_card
    GROUP BY c.id
    ORDER BY c.id;
$$;

COMMIT;
