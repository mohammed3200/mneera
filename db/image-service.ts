import { db } from ".";
import { images } from "./schema";
import { v4 as uuidv4 } from "uuid";
import { Buffer } from "buffer";

export const saveImage = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const imageId = uuidv4();
  
  await db.insert(images).values({
    id: imageId,
    data: buffer,
    type: file.type,
    size: file.size
  });

  return imageId;
};

export const getImage = async (imageId: string) => {
  const result = await db.select().from(images).where(eq(images.id, imageId));
  return result[0]?.data;
};