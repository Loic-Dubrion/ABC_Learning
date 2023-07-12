# Dictionnaire de données

establishment
    id: INT, PK. Identifiant de l'établissement.
    name: TEXT, NOT NULL, UNIQUE. Nom de l'établissement.
    created_at: TIMESTAMPTZ, NOT NULL, Valeur par défaut : maintenant(). Date de création de l'établissement.
    updated_at: TIMESTAMPTZ, peut être NULL. Date de mise à jour de l'établissement.

user
    id: INT, PK. Identifiant de l'utilisateur.
    username: TEXT, NOT NULL, UNIQUE. Nom d'utilisateur.
    email: TEXT (format email), NOT NULL, UNIQUE. Adresse email de l'utilisateur.
    password: TEXT, NOT NULL. Mot de passe de l'utilisateur.
    establishment_id: INT, FK "establishment", peut être NULL. Identifiant de l'établissement auquel l'utilisateur est associé.
    created_at: TIMESTAMPTZ, NOT NULL, Valeur par défaut : maintenant(). Date de création de l'utilisateur.
    updated_at: TIMESTAMPTZ, peut être NULL. Date de mise à jour de l'utilisateur.

role
    id: INT, PK. Identifiant du rôle.
    name: TEXT, NOT NULL, UNIQUE. Nom du rôle.
    created_at: TIMESTAMPTZ, NOT NULL, Valeur par défaut : maintenant(). Date de création du rôle.
    updated_at: TIMESTAMPTZ, peut être NULL. Date de mise à jour du rôle.

authorisation
    id: INT, PK. Identifiant de l'autorisation.
    name: TEXT, NOT NULL, UNIQUE. Nom de l'autorisation.
    created_at: TIMESTAMPTZ, NOT NULL, Valeur par défaut : maintenant(). Date de création de l'autorisation.
    updated_at: TIMESTAMPTZ, peut être NULL. Date de mise à jour de l'autorisation.

user_has_role
    id: INT, PK. Identifiant de la relation utilisateur-rôle.
    user_id: INT, FK "user", NOT NULL. Identifiant de l'utilisateur associé.
    role_id: INT, FK "role", NOT NULL. Identifiant du rôle associé.
    created_at: TIMESTAMPTZ, NOT NULL, Valeur par défaut : maintenant(). Date de création de la relation.
    updated_at: TIMESTAMPTZ, peut être NULL. Date de mise à jour de la relation.

role_has_authorisation
    id: INT, PK. Identifiant de la relation rôle-autorisation.
    role_id: INT, FK "role", NOT NULL. Identifiant du rôle associé.
    authorisation_id: INT, FK "authorisation", NOT NULL. Identifiant de l'autorisation associée.
    created_at: TIMESTAMPTZ, NOT NULL, Valeur par défaut : maintenant(). Date de création de la relation.
    updated_at: TIMESTAMPTZ, peut être NULL. Date de mise à jour de la relation.

sequence
    id: INT, PK. Identifiant de la séquence.
    name: TEXT, NOT NULL, UNIQUE. Nom de la séquence.
    user_id: INT, FK "user", NOT NULL. Identifiant de l'utilisateur qui a créé la séquence.
    created_at: TIMESTAMPTZ, NOT NULL, Valeur par défaut : maintenant(). Date de création de la séquence.
    updated_at: TIMESTAMPTZ, peut être NULL. Date de mise à jour de la séquence.

level
    id: INT, PK. Identifiant du niveau.
    name: TEXT, NOT NULL, UNIQUE. Nom du niveau.
    created_at: TIMESTAMPTZ, NOT NULL, Valeur par défaut : maintenant(). Date de création du niveau.
    updated_at: TIMESTAMPTZ, peut être NULL. Date de mise à jour du niveau.

tool_category
    id: INT, PK. Identifiant de la catégorie d'outil.
    name: TEXT, NOT NULL, UNIQUE. Nom de la catégorie d'outil.
    created_at: TIMESTAMPTZ, NOT NULL, Valeur par défaut : maintenant(). Date de création de la catégorie d'outil.
    updated_at: TIMESTAMPTZ, peut être NULL. Date de mise à jour de la catégorie d'outil.

tool
    id: INT, PK. Identifiant de l'outil.
    name: TEXT, NOT NULL, UNIQUE. Nom de l'outil.
    level_id: INT, FK "level", peut être NULL. Identifiant du niveau associé à l'outil.
    tool_category_id: INT, FK "tool_category", peut être NULL. Identifiant de la catégorie d'outil associée.
    created_at: TIMESTAMPTZ, NOT NULL, Valeur par défaut : maintenant(). Date de création de l'outil.
    updated_at: TIMESTAMPTZ, peut être NULL. Date de mise à jour de l'outil.

card
    id: INT, PK. Identifiant de la carte.
    name: TEXT, NOT NULL, UNIQUE. Nom de la carte.
    comments: TEXT, NOT NULL. Commentaires liés à la carte.
    created_at: TIMESTAMPTZ, NOT NULL, Valeur par défaut : maintenant(). Date de création de la carte.
    updated_at: TIMESTAMPTZ, peut être NULL. Date de mise à jour de la carte.

activity
    id: INT, PK. Identifiant de l'activité.
    name: ARRAY[TEXT], NOT NULL. activités.
    card_id: INT, FK "card", peut être NULL. Identifiant de la carte associée à l'activité.
    created_at: TIMESTAMPTZ, NOT NULL, Valeur par défaut : maintenant(). Date de création de l'activité.
    updated_at: TIMESTAMPTZ, peut être NULL. Date de mise à jour de l'activité.

session
    id: INT, PK. Identifiant de la session.
    name: TEXT, NOT NULL, UNIQUE. Nom de la session.
    sequence_id: INT, FK "sequence", CASCADE DELETE. Identifiant de la séquence associée à la session.
    card_id: INT, FK "card", peut être NULL. Identifiant de la carte associée à la session.
    tool_id: INT, FK "tool", peut être NULL. Identifiant de l'outil associé à la session.
    comments: TEXT, peut être NULL. Commentaires liés à la session.
    time: INT, peut être NULL. Durée de la session.
    is_face_to_face: BOOLEAN, peut être NULL. Indique si la session est en face à face.
    is_group_work: BOOLEAN, peut être NULL. Indique si la session est un travail de groupe.
    equipment: TEXT, peut être NULL. Équipement nécessaire pour la session.
    created_at: TIMESTAMPTZ, NOT NULL, Valeur par défaut : maintenant(). Date de création de la session.
    updated_at: TIMESTAMPTZ, peut être NULL. Date de mise à jour de la session.

tool_category_has_card
    tool_category_id: INT, FK "tool_category", CASCADE DELETE. Identifiant de la catégorie de l'outil.
    card_id: INT, FK "card", CASCADE DELETE. Identifiant de la carte. La combinaison des deux attributs forme la PK de cette table.

card_has_tool
    card_id: INT, FK "card", CASCADE DELETE. Identifiant de la carte.
    tool_id: INT, FK "tool", CASCADE DELETE. Identifiant de l'outil. La combinaison des deux attributs forme la PK de cette table.
