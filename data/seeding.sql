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
  ('crud_tool'),
  ('crud_activity'),
  ('crud_establishment');

-- Insertion into 'user_has_role' table
INSERT INTO user_has_role (user_id, role_id)
  VALUES 
  (1, 1),
  (1, 2),
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
  ('Novice'),
  ('Expert');

-- Insertion into 'tool' table
INSERT INTO tool_category (name)
  VALUES 
  ('Ressources Moodle'),
  ('Activités Moodle'),
  ('H5P'),
  ('Activités externes à intégrer dans votre cours');

-- Insertion into 'activity' table
INSERT INTO tool (name, tool_category_id, level_id)
  VALUES
  ('Zone de texte et média',1, 1),
  ('Fichier', 1, 1),
  ('Dossier', 1, 1),
  ('URL', 1, 1),
  ('Glossaire', 2, 1),
  ('Course Presentation', 3, 1),
  ('Dialog Cards', 3, 1),
  ('Image Slider', 3, 1),
  ('Autre H5P', 3, 1),
  ('PeerTube, PodEduc', 4, 1),
  ('Youtube', 4, 1),
  ('Classe virtuelle (BBB, VIA)', 4, 1),
  ('Autre', 4, 1),
  ('Galerie d''image',1, 1),
  ('Devoir', 2, 1),
  ('Partage', 2, 1),
  ('Tableau', 2, 1),
  ('Outil ENT', 4, 1),
  ('Digimindmap', 4, 1),
  ('Digiboard', 4, 1),
  ('Commentaire', 1, 1),
  ('Forum', 2, 1),
  ('Chat', 2, 1),
  ('Sticky notes', 2, 1),
  ('Nuage de mots', 2, 1),
  ('Digistorm', 4, 1),
  ('Feedback', 2, 1),
  ('Sondage', 2, 1),
  ('Cornell Notes', 3, 1),
  ('Jeu', 1, 1),
  ('Paquetage Scorm', 1, 1),
  ('Test(formatif)', 1, 1),
  ('Question Set', 3, 1),
  ('Interactive Video', 3, 1),
  ('Flashcards', 3, 1),
  ('Exerciseur en ligne', 4, 1),
  ('Simulateur', 4, 1),
  ('Page', 1, 2),
  ('Livre', 1, 2),
  ('Base de données', 2, 2),
  ('Leçon', 2, 2),
  ('Géogébra', 2, 2),
  ('Audio Recorder', 3, 2),
  ('Image Hotspots', 3, 2),
  ('Timeliner', 3, 2),
  ('Virtual tour', 3, 2),
  ('Annotation PDF', 4, 2),
  ('Wiki', 2, 2),
  ('Atelier', 2, 2),
  ('Bureautique collaborative', 4, 2),
  ('Twitter user feed', 3, 2),
  ('Crossword', 3, 2),
  ('Arithmetic Quizz', 3, 2),
  ('Dictation', 3, 2),
  ('Find the hotspot', 3, 2),
  ('Sort the paragraphs', 3, 2),
  ('Questionnaire', 2, 2),
  ('Documentation tool', 3, 2);

-- Insertion into 'card' table
INSERT INTO card (name, comments, activities, color)
  VALUES 
  ('Acquisition', 'Learning through acquisition is what learners are doing when they are listening to a lecture or podcast, reading from books or websites, and watching demos or videos', ARRAY['Ecouter l''enseignant, suivre des cours, des conférences', 'Consulter des documents, articles', 'Lire des ressources numériques, multimédia, des sites web'], '#16b1a2'),
  ('Collaboration', 'Learning through collaboration embraces mainly discussion, practice, and production. Building on investigations and acquisition it is about taking part in the process of knowledge building itself', ARRAY['Projets en petits groupes, suivre des cours, des conférences', 'Construction / élaboration d''une production commune', 'Discussion autour des productions de tiers'], '#f39200'),
  ('Discussion', 'Learning through discussion requires the learner to articulate their ideas and questions, and to challenge and respond to the ideas and questions from the teacher and/or from their peers', ARRAY['Communication', 'Groupes de discussion synchrones et asynchrones', 'Remue-méninges, nuages de mots'], '#1d71b8'),
  ('Investigation', 'Learning through investigation guides the learner to explore, compare and critique the texts, documents and resources that reflect the concepts and ideas being taught', ARRAY['Comparaison de textes', 'Recherche et évaluation d''informations et d''idées', 'Observations lors d''un TP ou sur le terrain'], '#be1622'),
  ('Practice', 'Learning through practice enables the learner to adapt their actions to the task goal, and use the feedback to improve their next action.', ARRAY['Faire des exercices, des tests formatifs', 'Laboratoires', 'Etude de cas'], '#662483'),
  ('Production', 'Learning through production is the way the teacher motivates the learner to consolidate what they have learned by articulating their current conceptual understanding and how they used it in practice', ARRAY['Bilans, commentaires, compte-rendu', 'Rapports, mémoires', 'Prestations (performance)'], '#3aaa35');

-- Insertion into 'session' table
INSERT INTO session (name, sequence_id, card_id, tool_id, comments, time, is_face_to_face, is_group_work, equipment)
  VALUES 
  ('Session 1', 1, 1, 1, 'Comment', 60, false, false, 'Laptop'),
  ('Session 2', 1, 2, 14, 'Comment', 30, false, false, 'Laptop'),
  ('Session 3', 1, 3, 9, 'Comment', 90, false, false, 'Laptop'),
  ('Session 4', 1, 4, 47, 'Comment', 30, false, false, 'Laptop'),
  ('Session 5', 2, 1, 38, 'Comment', 60, false, false, 'Laptop'),
  ('Session 6', 2, 2, 40, 'Comment', 120, false, true, 'Projector');

-- Insertion into 'activity_has_card' table
INSERT INTO card_has_tool (tool_id, card_id)
  VALUES
  (1, 1),
  (2, 1),
  (3, 1),
  (4, 1),
  (38, 1),
  (39, 1),
  (5, 1),
  (40, 1),
  (41, 1),
  (42, 1),
  (6, 1),
  (7, 1),
  (8, 1),
  (9, 1),
  (45, 1),
  (46, 1),
  (10, 1),
  (11, 1),
  (12, 1),
  (13, 1),
  (14, 2),
  (5, 2),
  (15, 2),
  (16, 2),
  (17, 2),
  (40, 2),
  (48, 2),
  (49, 2),
  (18, 2),
  (50, 2),
  (13, 2),
  (21, 3),
  (22, 3),
  (23, 3),
  (24, 3),
  (25, 3),
  (51, 3),
  (9, 3),
  (12, 3),
  (10, 3),
  (13, 3),
  (2, 4),
  (3, 4),
  (4, 4),
  (27, 4),
  (28, 4),
  (41, 4),
  (57, 4),
  (29, 4),
  (9, 4),
  (10, 4),
  (11, 4),
  (47, 4),
  (13, 4),
  (30, 5),
  (31, 5),
  (32, 5),
  (41, 5),
  (42, 5),
  (33, 5),
  (6, 5),
  (34, 5),
  (35, 5),
  (52, 5),
  (53, 5),
  (54, 5),
  (55, 5),
  (56, 5),
  (9, 5),
  (36, 5),
  (26, 5),
  (13, 5),
  (15, 6),
  (40, 6),
  (42, 6),
  (9, 6),
  (12, 6),
  (19, 6),
  (13, 6);

-- Insertion into 'session' table
INSERT INTO tool_category_has_card (tool_category_id, card_id)
  VALUES 
  (1, 1),
  (1, 2),
  (1, 3),
  (1, 4),
  (2, 1),
  (2, 2),
  (2, 3),
  (2, 4),
  (2, 5),
  (2, 6),
  (3, 1),
  (3, 3),
  (3, 4),
  (3, 5),
  (3, 6),
  (4, 1),
  (4, 2),
  (4, 3),
  (4, 4),
  (4, 5),
  (4, 6);


COMMIT;
