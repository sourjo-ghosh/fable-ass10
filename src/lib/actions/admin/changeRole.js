"use server";

// Change user role (user / writer)
// Backend should: find user by userId, update role field
// Endpoint: PATCH /api/change-role/:adminId
// Body: { userId, role }
export async function ChangeUserRole(userId, role, adminId) {
  try {
    if (!userId) {
      return {
        success: false,
        error: "User ID is required.",
      };
    }

    if (!role) {
      return {
        success: false,
        error: "Role is required.",
      };
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/change-role/${adminId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, role }),
        cache: "no-store",
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      return {
        success: false,
        error: `Server error (${res.status}): ${errorText || "Failed to change user role."}`,
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
