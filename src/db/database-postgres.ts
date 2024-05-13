import { randomUUID } from "node:crypto";
import type { IVideo } from "../interface";
import { sql } from "./database";

export class DatabasePostgres {
  async list(search?: string) {
    let videos;
    if (search) {
      videos = await sql`select * from videos where title ilike ${'%'+search+'%'};`;
    } else {
      videos = await sql`select * from videos;`;
    }
    return videos;
  }

  async create(video: IVideo) {
    const videoId = randomUUID();
    const { title, description, duration } = video;

    await sql`
    INSERT INTO videos (id, title, description, duration) 
    VALUES (${videoId}, ${title}, ${description}, ${duration});`;
  }

  async update(id: string, video: IVideo) {
    const { title, description, duration } = video;

    await sql`
    UPDATE videos set title = ${title}, description = ${description}, duration = ${duration} WHERE id = ${id};`;
  }

  async delete(id: string) {
    await sql`DELETE FROM videos WHERE id = ${id};`
  }
}
