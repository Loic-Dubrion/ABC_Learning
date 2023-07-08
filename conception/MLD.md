# MLD DATABASE ABC_Learning

Pour mémoire :

- Si depuis une table on a un N en cardinalité => FK dans l'autre table
- Si depuis une table on n'a pas de N en cardinalité => Pas de FK
- Si on N des 2 côtés => Table de liason avec 2 FK

## TABLES

**user**
| Column | Type | |
| :--- | :--- | :--- |
| id | INTEGER | Primary Key |
| username | TEXT | UNIQUE |
| email | TEXT | UNIQUE |
| password | TEXT | |
| establishment_id | INTEGER | Foreign Key - establishment.id |

**role**
| Column | Type | |
| :--- | :--- | :--- |
| id | INTEGER | Primary Key |
| name | TEXT | UNIQUE |

**authorisation**
| Column | Type | |
| :--- | :--- | :--- |
| id | INTEGER | Primary Key |
| name | TEXT | UNIQUE |

**user_has_role**
| Column | Type | |
| :--- | :--- | :--- |
| id | INTEGER | Primary Key |
| user_id | INTEGER | Foreign Key - user.id |
| role_id | INTEGER | Foreign Key - role.id |

**role_has_authorisation**
| Column | Type | |
| :--- | :--- | :--- |
| id | INTEGER | Primary Key |
| role_id | INTEGER | Foreign Key - role.id |
| authorisation_id | INTEGER | Foreign Key - authorisation.id |

**establishment**
| Column | Type | |
| :--- | :--- | :--- |
| id | INTEGER | Primary Key |
| name | TEXT | UNIQUE |

**sequence**
| Column | Type | |
| :--- | :--- | :--- |
| id | INTEGER | Primary Key |
| name | TEXT | UNIQUE |
| user_id | INTEGER | Foreign Key - user.id |

**session**
| Column | Type | |
| :--- | :--- | :--- |
| id | INTEGER | Primary Key |
| sequence_id | INTEGER | Foreign Key - sequence.id |
| activity_id | INTEGER | Foreign Key - activity.id |
| comments | TEXT | |
| time | INTEGER | |
| is_presentiel | BOOLEAN | |
| is_group_work | BOOLEAN | |
| equipment | TEXT | |

**activity**
| Column | Type | |
| :--- | :--- | :--- |
| id | INTEGER | Primary Key |
| name | TEXT | UNIQUE |
| level_id | INTEGER | Foreign Key - level.id |
| tool_id | INTEGER | Foreign Key - tool.id |

**level**
| Column | Type | |
| :--- | :--- | :--- |
| id | INTEGER | Primary Key |
| name | TEXT | UNIQUE |

**tool**
| Column | Type | |
| :--- | :--- | :--- |
| id | INTEGER | Primary Key |
| name | TEXT | UNIQUE |

**card**
| Column | Type | |
| :--- | :--- | :--- |
| id | INTEGER | Primary Key |
| name | TEXT | UNIQUE |
| comments | TEXT | |

**card_has_tool**
| Column | Type | |
| :--- | :--- | :--- |
| id | INTEGER | Primary Key |
| card_id | INTEGER | Foreign Key - card.id |
| tool_id | INTEGER | Foreign Key - tool.id |
