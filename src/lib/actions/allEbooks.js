"use server";

export async function AllEbook() {
  try {

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/all-ebook`);
    if (!res.ok) {
      const errorText = await res.text();
      console.error("something went wrong");
      return {
        success: false,
        error: `Server responded with status ${res.status}: ${errorText}`,
      };
    }

    const result = await res.json();

    return {
      data: result.data,
    };
  } catch (error) {
    console.error("allEbooks action error:", error);
    return {
      success: false,
      error: error.message || "Could not connect to backend server. Make sure your server on port 8000 is running.",
    };
  }
}

