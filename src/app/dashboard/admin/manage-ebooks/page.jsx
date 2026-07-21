import AdminTableHeader from "@/components/dashboard/AdminTableHeader";
import { FaTrash } from "react-icons/fa6";

const ebooks = [
  ["The Silent Patient", "Alex Michaelides", "$14.99", "Published"],
  ["A House of Glass", "Noah Williams", "$12.50", "Draft"],
  ["Circe", "Madeline Miller", "$15.50", "Published"],
  ["Moonlit Roads", "Mia Johnson", "$9.99", "Unpublished"],
];

export default function ManageEbooksPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 pt-22 pb-12 sm:px-8 lg:px-12 lg:pt-12">
      <AdminTableHeader
        title="Manage all ebooks"
        subtitle="Review catalogue listings and control publication status."
      />
      <div className="mt-8 overflow-x-auto rounded-2xl border border-white/[0.07] bg-bg-card">
        <table className="w-full min-w-210 text-left">
          <thead className="border-b border-white/[0.07] text-[.65rem] tracking-[.15em] text-ink-faint uppercase">
            <tr>
              {["Title", "Writer", "Price", "Status", "Actions"].map((x) => (
                <th key={x} className="px-6 py-4">
                  {x}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ebooks.map(([title, writer, price, status]) => (
              <tr
                key={title}
                className="border-b border-white/[0.05] last:border-0"
              >
                <td className="px-6 py-5 font-serif text-lg font-semibold text-ink">
                  {title}
                </td>
                <td className="px-6 py-5 text-sm text-ink-muted">{writer}</td>
                <td className="px-6 py-5 text-sm font-semibold text-gold">
                  {price}
                </td>
                <td className="px-6 py-5">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs ${status === "Published" ? "bg-emerald-400/10 text-emerald-300" : "bg-amber-400/10 text-amber-200"}`}
                  >
                    {status}
                  </span>
                </td>
                <td className="flex gap-2 px-6 py-5">
                  <button className="rounded-lg border border-gold/25 bg-gold-dim px-3 py-2 text-xs font-medium text-gold hover:bg-gold/20">
                    {status === "Published" ? "Unpublish" : "Publish"}
                  </button>
                  <button
                    className="rounded-lg border border-red-400/20 bg-red-500/10 p-2 text-red-300 hover:bg-red-500/20"
                    aria-label={`Delete ${title}`}
                  >
                    <FaTrash className="h-3 w-3" />
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
