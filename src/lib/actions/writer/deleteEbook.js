"use server";

export async function DeleteEbook(id) {
  try {
    if (!id) {
      return {
        success: false,
        error: "Ebook ID is required to delete.",
      };
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/delete-ebook/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Backend server returned error:", res.status, errorText);
      return {
        success: false,
        error: `Server responded with status ${res.status}: ${errorText || "Failed to delete ebook."}`,
      };
    }

    const result = await res.json();

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("deleteEbook action error:", error);
    return {
      success: false,
      error:
        error.message ||
        "Could not connect to backend server. Make sure your server on port 8000 is running.",
    };
  }
}
