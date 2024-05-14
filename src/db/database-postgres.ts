import { randomUUID } from "node:crypto";
import type { IVideo } from "../interface";
import { sql } from "./database";
export class DatabasePostgres {
  async list(search?: string) {
    let videos;

    if (search) {
      videos = await sql`select * from videos where title ilike ${
        "%" + search + "%"
      };`;
    } else {
      videos = await sql`select * from videos;`;
    }
    return videos;
  }

  async create(video: IVideo) {
    const videoId = randomUUID();

    await sql`INSERT INTO videos ${sql({ id: videoId, ...video })};`;
  }

  async update(id: string, video: IVideo) {
    await sql`UPDATE videos set ${sql(video)} WHERE id = ${id};`;
  }

  async delete(id: string) {
    await sql`DELETE FROM videos WHERE id = ${id};`;
  }
}
