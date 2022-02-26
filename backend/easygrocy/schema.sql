DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS squad;
DROP TABLE IF EXISTS item;
DROP TABLE IF EXISTS itemuser;
DROP TABLE IF EXISTS squaduser;

CREATE TABLE user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL
);

CREATE TABLE squad (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

CREATE TABLE item (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price INTEGER,
    quantity INTEGER,
    expiration TIMESTAMP,
    purchased INTEGER,
    link TEXT,

    squad_id INTEGER NOT NULL,
    FOREIGN KEY (squad_id) REFERENCES squad (id)
);

CREATE TABLE itemuser (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    item_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (id),
    FOREIGN KEY (item_id) REFERENCES item (id)
);

CREATE TABLE squaduser (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    squad_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (id),
    FOREIGN KEY (squad_id) REFERENCES squad (id)
);
