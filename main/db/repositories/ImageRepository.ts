import { db } from "@/main/db";
import { images } from "@/main/db/schema";
import { eq } from "drizzle-orm";
import type { Image } from "@/main/db/schema-types";
import { Buffer } from "buffer";

export class ImageRepository {
  async create(fileData: {
    buffer: number[];
    type: string;
    name: string;
  }): Promise<string> {
    const buffer = Buffer.from(fileData.buffer);
    const imageId = crypto.randomUUID();

    await db.insert(images).values({
      id: imageId,
      data: buffer,
      type: fileData.type,
      size: buffer.length,
    });

    return imageId;
  }

  async getById(id: string): Promise<Image | undefined> {
    const result = await db.select().from(images).where(eq(images.id, id));
    if (result[0]) {
      // Convert buffer to base64 string
      return {
        ...result[0],
        data: Buffer.from(result[0].data as string).toString("base64"), // Convert properly
      };
    }
    return undefined;
  }
}
