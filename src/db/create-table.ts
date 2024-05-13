import { sql } from "./database";

sql`DROP TABLE IF EXISTS videos;`.then(() => console.log('Tabela deletada'));

sql`
CREATE TABLE videos (
    id TEXT PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    duration INTEGER
);
`.then(() => console.log('Tabela criada'));
