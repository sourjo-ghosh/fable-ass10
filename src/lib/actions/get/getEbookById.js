"use server";

// Fetches a single ebook by its MongoDB _id
// Used by: all-ebooks/[id]/page.jsx  AND  edit-ebook/[slug]/page.jsx
export async function getEbookById(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/ebook/${id}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      const errorText = await res.text();
      return {
        success: false,
        error: `Server responded with status ${res.status}: ${errorText}`,
      };
    }

    const result = await res.json();

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error.message ||
        "Could not connect to backend. Make sure server is running.",
    };
  }
}
