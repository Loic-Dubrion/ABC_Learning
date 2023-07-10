-- Seed script

BEGIN;

-- Insertion into 'establishment' table
INSERT INTO establishment (name)
  VALUES 
  ('AgroSup Dijon'),
  ('CFA Piday');

-- Insertion into 'user' table
INSERT INTO "user" (username, email, password, establishment_id)
  VALUES 
  ('Beth Rave', 'b.rave@example.com', 'password1', 1),
  ('Yves Ande', 'y.ande@example.com', 'password2', 1),
  ('Ray Fort', 'r.fort@example.com', 'password3', 1),
  ('Arti Cho', 'a.cho@example.com', 'password3', 2);

-- Insertion into 'role' table
INSERT INTO role (name)
  VALUES
  ('user'),
  ('admin'),
  ('super_admin');

-- Insertion into 'authorisation' table
INSERT INTO authorisation (name)
  VALUES
  ('create_lesson'),
  ('crud_activity'),
  ('crud_establishment');

-- Insertion into 'user_has_role' table
INSERT INTO user_has_role (user_id, role_id)
  VALUES 
  (1, 1),
  (2, 1),
  (3, 2),
  (4, 3);

-- Insertion into 'role_has_authorisation' table
INSERT INTO role_has_authorisation (role_id, authorisation_id)
  VALUES
  (1, 1),
  (2, 2),
  (3, 3);

-- Insertion into 'sequence' table
INSERT INTO sequence (name, user_id)
  VALUES 
  ('Défrisser du persil', 1),    
  ('Gonflage de choux à la crème', 2);

-- Insertion into 'level' table
INSERT INTO level (name)
  VALUES 
  ('noob'),
  ('légendaire');

-- Insertion into 'tool' table
INSERT INTO tool (name)
  VALUES 
  ('Resource Moodle'),
  ('Activity Moodle'),
  ('Activity External'),
  ('H5P');

-- Insertion into 'activity' table
INSERT INTO activity (name, level_id, tool_id)
  VALUES
  ('Lesson', 1, 1),
  ('Glossary', 1, 1),
  ('Quizz', 2, 1),
  ('Chat', 1, 2),
  ('Activity', 2, 2),
  ('Blackboard Collaborate', 1, 3),
  ('PeerTube', 1, 3),
  ('YouTube', 2, 3);

-- Insertion into 'session' table
INSERT INTO session (sequence_id, activity_id, comments, time, is_face_to_face, is_group_work, equipment)
VALUES (1, 1, 'Session 1', 60, false, false, 'Laptop'),
       (2, 2, 'Session 2', 120, false, true, 'Projector');

-- Insertion into 'card' table
INSERT INTO card (name, comments)
  VALUES 
  ('Acquisition', 'Learning through acquisition is what learners are doing when they are listening to a lecture or podcast, reading from books or websites, and watching demos or videos 
'),
  ('Investigation', 'Learning through investigation guides the learner to explore, compare and critique the texts, documents and resources that reflect the concepts and ideas being taught 
'),
  ('Discussion', 'Learning through discussion requires the learner to articulate their ideas and questions, and to challenge and respond to the ideas and questions from the teacher, 
and/or from their peers 
'),
  ('Practice', 'Learning through practice enables the learner to adapt their actions to the task goal, and use the feedback to improve their next action. Feedback may come from self-reflection, from peers, from the teacher, or from the activity itself, if it shows them how to improve the result of their action in relation to the goal
'),
  ('Collaboration', 'Learning through collaboration embraces mainly discussion, practice, and production. Building on investigations and acquisition it is about taking part in the process of knowledge building itself
'),
  ('Production', 'Learning through production is the way the teacher motivates the learner to consolidate what they have learned by articulating their current conceptual understanding and how they used it in practice
');

-- Insertion into 'card_has_tool' table
INSERT INTO card_has_tool (card_id, tool_id)
  VALUES 
  (1, 1),
  (2, 1),
  (2, 2),
  (2, 3),
  (3, 1),
  (3, 3),
  (3, 4),
  (4, 1),
  (4, 2),
  (5, 1),
  (5, 2),
  (6, 1),
  (6, 3);

COMMIT;
