import { db } from ".";
import { images } from "./schema";
import { v4 as uuidv4 } from "uuid";
import { Buffer } from "buffer";
import { eq } from "drizzle-orm";
import { sql } from 'drizzle-orm';

export const saveImage = async (
  fileData: {
    buffer: number[];
    type: string;
    name: string;
  } | null
) => {
  if (!fileData) return null;

  const buffer = Buffer.from(fileData.buffer);
  const imageId = uuidv4();

  try {
    await db.insert(images).values({
      id: imageId,
      data: buffer,
      type: fileData.type,
      size: buffer.length,
    });
  } catch (error) {
    console.error("Error saving image:", error);
    return null;
  }

  return imageId;
};

export const getImage = async (imageId: string) => {
  try {
    const result = await db.select().from(images).where(eq(images.id, imageId));
    return result[0]?.data;
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
};