"use server";

export async function getAllTransactions({ userId }) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/all-transactions/${userId}`,
      {cache: 'no-store'}
    );
    const result = await res.json();
    if (!result.success) {
      return {
        massage: "Something went wrong",
      };
    }
    return {
      data: result.data,
    };
  } catch (error) {
    console.error("Administration Actions error", error);
    return {
      success: false,
      error:
        error.message ||
        "Could not connect to backend server. Make sure your server on port 8000 is running.",
    };
  }
}
