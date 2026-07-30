"use server";

// Ban or Unban a user — toggles ban status
// Backend should: find user by userId, toggle banned field
// Endpoint: PATCH /api/ban-user/:adminId
// Body: { userId }
export async function BanUnbanUser(userId, adminId) {
  try {
    if (!userId) {
      return {
        success: false,
        error: "User ID is required.",
      };
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/ban-user/${adminId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
        cache: "no-store",
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      return {
        success: false,
        error: `Server error (${res.status}): ${errorText || "Failed to update user ban status."}`,
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
