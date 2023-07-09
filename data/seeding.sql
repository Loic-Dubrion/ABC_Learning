-- Seed script

BEGIN;

-- Insertion into 'establishment' table
INSERT INTO establishment (name)
VALUES ('Establishment 1'),
       ('Establishment 2');

-- Insertion into 'user' table
INSERT INTO "user" (username, email, password, establishment_id)
VALUES ('user1', 'user1@example.com', 'password1', 1),
       ('user2', 'user2@example.com', 'password2', 2);

-- Insertion into 'role' table
INSERT INTO role (name)
VALUES ('role1'),
       ('role2');

-- Insertion into 'authorisation' table
INSERT INTO authorisation (name)
VALUES ('authorisation1'),
       ('authorisation2');

-- Insertion into 'user_has_role' table
INSERT INTO user_has_role (user_id, role_id)
VALUES (1, 1),
       (2, 2);

-- Insertion into 'role_has_authorisation' table
INSERT INTO role_has_authorisation (role_id, authorisation_id)
VALUES (1, 1),
       (2, 2);

-- Insertion into 'sequence' table
INSERT INTO sequence (name, user_id)
VALUES ('sequence1', 1),
       ('sequence2', 2);

-- Insertion into 'level' table
INSERT INTO level (name)
VALUES ('level1'),
       ('level2');

-- Insertion into 'tool' table
INSERT INTO tool (name)
VALUES ('tool1'),
       ('tool2');

-- Insertion into 'activity' table
INSERT INTO activity (name, level_id, tool_id)
VALUES ('activity1', 1, 1),
       ('activity2', 2, 2);

-- Insertion into 'session' table
INSERT INTO session (sequence_id, activity_id, comments, time, is_presentiel, is_group_work, equipment)
VALUES (1, 1, 'Session 1', 60, true, false, 'Laptop'),
       (2, 2, 'Session 2', 120, false, true, 'Projector');

-- Insertion into 'card' table
INSERT INTO card (name, comments)
VALUES ('card1', 'Card 1'),
       ('card2', 'Card 2');

-- Insertion into 'card_has_tool' table
INSERT INTO card_has_tool (card_id, tool_id)
VALUES (1, 1),
       (2, 2);

COMMIT;
