"use server";

export const getBookmarkBooks = async ({userId}) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookmarks/${userId} `,
      {cache: 'no-store'}
     );
    const results = await res.json();
    if (results.success) {
      return results.data;
    } else {
      return {
        success: false,
        error: `Server responded with status ${res.status}: ${errorText}`,
      };
    }
  } catch (error) {
    return {
      success: false,
      error:
        error.message ||
        "Could not connect to backend. Make sure server is running.",
    };
  }
};
