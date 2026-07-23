"use server";

import { MongoClient } from "mongodb";

export async function addEbook(ebookData) {
  try {
    const { title, content, price, genre, coverImage } = ebookData;

    if (!title || !content || price === undefined || !genre) {
      throw new Error("Missing required fields: title, content, price, and genre are required.");
    }

    if (!process.env.MONGODB_URI) {
      return {
        success: true,
        message: "Ebook added (mock mode)",
        data: ebookData,
      };
    }

    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db(process.env.MONGODB_USERNAME || "fable");

    const result = await db.collection("ebooks").insertOne({
      title,
      content,
      price: Number(price),
      genre,
      coverImage: coverImage || "",
      createdAt: new Date(),
    });

    await client.close();

    return {
      success: true,
      id: result.insertedId.toString(),
      data: ebookData,
    };
  } catch (error) {
    console.error("addEbook error:", error);
    throw new Error(error.message || "Failed to add ebook.");
  }
}
