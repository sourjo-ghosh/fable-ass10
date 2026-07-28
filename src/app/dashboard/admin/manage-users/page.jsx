"use client";

import { useState, useEffect } from "react";
import AdminTableHeader from "@/components/dashboard/AdminTableHeader";
import { AllUsers } from "@/lib/actions/getAllUsers";
import { BanUnbanUser } from "@/lib/actions/editActions/ban-unban";
import { ChangeUserRole } from "@/lib/actions/editActions/change-role";
import { authClient } from "@/lib/auth-client";
import {
  FaRotateRight,
  FaBan,
  FaCheck,
  FaTriangleExclamation,
  FaXmark,
} from "react-icons/fa6";
import toast from "react-hot-toast";

export default function ManageUsersPage() {
  const { data: session } = authClient.useSession();
  const adminId = session?.user?.id;

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ban/Unban confirmation modal state
  const [confirmBan, setConfirmBan] = useState(null); // { userId, name, isBanned }
  const [banning, setBanning] = useState(false);

  const fetchUsers = async () => {
    if (!adminId) return;
    setLoading(true);
    try {
      const res = await AllUsers({ userId: adminId });
      setUsers(res?.data || []);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      toast.error("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [adminId]);

  // ── Role Change Handler ──
  const handleRoleChange = async (userId, newRole) => {
    try {
      const result = await ChangeUserRole(userId, newRole, adminId);
      if (result?.success) {
        // Optimistically update the role in the list
        setUsers((prev) =>
          prev.map((u) =>
            (u._id || u.id) === userId ? { ...u, role: newRole } : u
          )
        );
        toast.success(result?.data?.message || "Role updated!");
      } else {
        toast.error(result?.error || "Failed to change role.");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  // ── Ban/Unban Handlers ──
  const handleBanClick = (userId, name, isBanned) => {
    setConfirmBan({ userId, name, isBanned });
  };

  const handleBanConfirm = async () => {
    if (!confirmBan?.userId) return;
    setBanning(true);
    try {
      const result = await BanUnbanUser(confirmBan.userId, adminId);
      if (result?.success) {
        // Optimistically toggle ban status in the list
        setUsers((prev) =>
          prev.map((u) =>
            (u._id || u.id) === confirmBan.userId
              ? { ...u, banned: !u.banned }
              : u
          )
        );
        toast.success(
          result?.data?.message ||
            `User ${confirmBan.isBanned ? "unbanned" : "banned"} successfully.`
        );
      } else {
        toast.error(result?.error || "Failed to update user status.");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setBanning(false);
      setConfirmBan(null);
    }
  };

  const handleBanCancel = () => {
    if (!banning) setConfirmBan(null);
  };

  return (
    <>
      <main className="mx-auto max-w-7xl px-5 pt-22 pb-12 sm:px-8 lg:px-12 lg:pt-12">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <AdminTableHeader
            title="Manage users"
            subtitle="Update account roles and manage access across Fable."
          />
          <div className="flex items-center gap-2">
            <button
              onClick={fetchUsers}
              disabled={loading}
              title="Refresh"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-bg-card px-3 py-2.5 text-xs font-medium text-ink-muted transition hover:text-gold hover:border-gold/30 disabled:opacity-50"
            >
              <FaRotateRight
                className={`h-3.5 w-3.5 ${loading ? "animate-spin text-gold" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="mt-8 overflow-x-auto rounded-2xl border border-white/[0.07] bg-bg-card">
          <table className="w-full min-w-[760px] text-left">
            <thead className="border-b border-white/[0.07] text-[0.65rem] tracking-[0.15em] text-ink-faint uppercase">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {loading ? (
                // Skeleton rows
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-5">
                      <div className="h-4 w-32 rounded-md bg-white/[0.06]" />
                    </td>
                    <td className="px-6 py-5">
                      <div className="h-4 w-44 rounded-md bg-white/[0.06]" />
                    </td>
                    <td className="px-6 py-5">
                      <div className="h-8 w-24 rounded-lg bg-white/[0.06]" />
                    </td>
                    <td className="px-6 py-5">
                      <div className="h-5 w-16 rounded-full bg-white/[0.06]" />
                    </td>
                    <td className="px-6 py-5">
                      <div className="h-7 w-16 rounded-lg bg-white/[0.06]" />
                    </td>
                  </tr>
                ))
              ) : users.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-16 text-center text-sm text-ink-muted"
                  >
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => {
                  const userId = user._id || user.id;
                  const name = user.name || "Unknown";
                  const email = user.email || "";
                  const role = user.role || "user";
                  const isBanned = user.banned || false;

                  return (
                    <tr
                      key={userId}
                      className="transition-colors hover:bg-white/[0.02]"
                    >
                      <td className="px-6 py-5 font-medium text-ink">
                        {name}
                      </td>
                      <td className="px-6 py-5 text-sm text-ink-muted">
                        {email}
                      </td>

                      {/* Role dropdown */}
                      <td className="px-6 py-5">
                        <select
                          value={role}
                          onChange={(e) =>
                            handleRoleChange(userId, e.target.value)
                          }
                          className="rounded-lg border border-white/[0.12] bg-bg-raised px-3 py-2 text-xs text-ink outline-none focus:border-gold/60 transition-colors"
                        >
                          <option value="user">User</option>
                          <option value="writer">Writer</option>
                        </select>
                      </td>

                      {/* Ban status badge */}
                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${
                            isBanned
                              ? "border-red-500/20 bg-red-400/10 text-red-300"
                              : "border-emerald-500/20 bg-emerald-400/10 text-emerald-300"
                          }`}
                        >
                          {isBanned ? "Banned" : "Active"}
                        </span>
                      </td>

                      {/* Ban/Unban button */}
                      <td className="px-6 py-5">
                        <button
                          onClick={() =>
                            handleBanClick(userId, name, isBanned)
                          }
                          type="button"
                          className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                            isBanned
                              ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20"
                              : "border-red-400/20 bg-red-500/10 text-red-300 hover:bg-red-500/20"
                          }`}
                        >
                          {isBanned ? (
                            <>
                              <FaCheck className="h-3 w-3" /> Unban
                            </>
                          ) : (
                            <>
                              <FaBan className="h-3 w-3" /> Ban
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* ── Ban/Unban Confirmation Modal ── */}
      {confirmBan && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          onClick={handleBanCancel}
        >
          <div
            className="relative w-full max-w-md rounded-3xl border border-white/10 bg-bg-card p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={handleBanCancel}
              disabled={banning}
              className="absolute top-4 right-4 rounded-full p-1.5 text-ink-muted hover:text-ink transition disabled:opacity-40"
            >
              <FaXmark className="h-4 w-4" />
            </button>

            {/* Icon */}
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-full border mx-auto mb-5 ${
                confirmBan.isBanned
                  ? "bg-emerald-500/10 border-emerald-500/20"
                  : "bg-red-500/10 border-red-500/20"
              }`}
            >
              {confirmBan.isBanned ? (
                <FaCheck className="h-6 w-6 text-emerald-400" />
              ) : (
                <FaTriangleExclamation className="h-6 w-6 text-red-400" />
              )}
            </div>

            {/* Text */}
            <h2 className="font-serif text-xl font-semibold text-ink text-center">
              {confirmBan.isBanned ? "Unban User?" : "Ban User?"}
            </h2>
            <p className="mt-2 text-sm text-ink-muted text-center leading-relaxed">
              Are you sure you want to {confirmBan.isBanned ? "unban" : "ban"}{" "}
              <strong className="text-ink">
                &quot;{confirmBan.name}&quot;
              </strong>
              ?{" "}
              {!confirmBan.isBanned && (
                <span className="text-red-400 font-semibold">
                  This user will lose access to Fable.
                </span>
              )}
            </p>

            {/* Actions */}
            <div className="mt-7 flex gap-3">
              <button
                onClick={handleBanCancel}
                disabled={banning}
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-ink-muted transition hover:bg-white/10 hover:text-ink disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleBanConfirm}
                disabled={banning}
                className={`flex-1 inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition disabled:cursor-wait disabled:opacity-60 ${
                  confirmBan.isBanned
                    ? "border-emerald-500/30 bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25"
                    : "border-red-500/30 bg-red-500/15 text-red-300 hover:bg-red-500/25 hover:text-red-200"
                }`}
              >
                {banning ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    {confirmBan.isBanned ? "Unbanning…" : "Banning…"}
                  </>
                ) : (
                  <>
                    {confirmBan.isBanned ? (
                      <FaCheck className="h-3.5 w-3.5" />
                    ) : (
                      <FaBan className="h-3.5 w-3.5" />
                    )}
                    {confirmBan.isBanned ? "Yes, Unban" : "Yes, Ban"}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
