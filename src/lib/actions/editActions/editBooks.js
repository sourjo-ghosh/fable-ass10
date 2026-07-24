"use server";

export async function EditEbook(id, ebookData) {
  try {
    const { coverImage, title, content, price, genre } = ebookData;

    if (!id) {
      return {
        success: false,
        error: "Ebook ID is required to update.",
      };
    }

    if (!title || !content || price === undefined || !genre) {
      return {
        success: false,
        error: "Missing required fields: title, content, price, and genre are required.",
      };
    }

    if (!coverImage) {
      return {
        success: false,
        error: "Missing required fields: Cover photo is required.",
      };
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/edit-ebook/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ebookData),
        cache: "no-store",
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Backend server returned error:", res.status, errorText);
      return {
        success: false,
        error: `Server responded with status ${res.status}: ${errorText || "Failed to update ebook."}`,
      };
    }

    const result = await res.json();

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("editEbook action error:", error);
    return {
      success: false,
      error:
        error.message ||
        "Could not connect to backend server. Make sure your server on port 8000 is running.",
    };
  }
}
