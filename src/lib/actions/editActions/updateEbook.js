"use server";

export async function updateEbook(id, ebookData) {
  try {
    if (!id) {
      return {
        success: false,
        error: "Ebook ID is required.",
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
      return {
        success: false,
        error: `Server error (${res.status}): ${errorText || "Failed to update ebook."}`,
      };
    }

    const result = await res.json();
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Could not connect to backend server.",
    };
  }
}
