import AdminTableHeader from "@/components/dashboard/AdminTableHeader";
import { FaTrash } from "react-icons/fa6";

const users = [
  ["Ava Mitchell", "ava@fable.com", "user"],
  ["Noah Williams", "noah@fable.com", "writer"],
  ["Mia Johnson", "mia@fable.com", "user"],
  ["Liam Carter", "liam@fable.com", "admin"],
];

export default function ManageUsersPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 pt-22 pb-12 sm:px-8 lg:px-12 lg:pt-12">
      <AdminTableHeader
        title="Manage users"
        subtitle="Update account roles and manage access across Fable."
      />
      <div className="mt-8 overflow-x-auto rounded-2xl border border-white/[0.07] bg-bg-card">
        <table className="w-full min-w-190 text-left">
          <thead className="border-b border-white/[0.07] text-[.65rem] tracking-[.15em] text-ink-faint uppercase">
            <tr>
              {["Name", "Email", "Role", "Actions"].map((x) => (
                <th key={x} className="px-6 py-4">
                  {x}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map(([name, email, role]) => (
              <tr
                key={email}
                className="border-b border-white/[0.05] last:border-0"
              >
                <td className="px-6 py-5 font-medium text-ink">{name}</td>
                <td className="px-6 py-5 text-sm text-ink-muted">{email}</td>
                <td className="px-6 py-5">
                  <select
                    defaultValue={role}
                    className="rounded-lg border border-white/[.12] bg-bg-raised px-3 py-2 text-xs text-ink outline-none"
                  >
                    <option value="user">User</option>
                    <option value="writer">Writer</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="px-6 py-5">
                  <button className="inline-flex items-center gap-2 rounded-lg border border-red-400/20 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-300 hover:bg-red-500/20">
                    <FaTrash className="h-3 w-3" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
