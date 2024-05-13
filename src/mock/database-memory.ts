import { randomUUID } from "node:crypto";
import type { IVideo } from "../interface";

export class DatabaseMemory {
  #videos = new Map<string, IVideo>();

  async list(search?: string) {
    return Array.from(this.#videos.entries())
      .map(([id, data]) => {
        return {
          id,
          ...data,
        };
      })
      .filter((video) => {
        if (search) {
          return video.title.includes(search);
        }
        return true;
      });
  }

  async create(video: IVideo) {
    const videoId = randomUUID();

    this.#videos.set(videoId, video);
  }

  async update(id: string, video: IVideo) {
    this.#videos.set(id, video);
  }

  async delete(id: string) {
    this.#videos.delete(id);
  }
}
