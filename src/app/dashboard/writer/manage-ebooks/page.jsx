import Link from "next/link";
import WriterPageHeader from "@/components/dashboard/WriterPageHeader";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa6";
import { AllEbook } from "@/lib/actions/getActions/allEbooks";

const res = await  AllEbook();
const ebooks = [
  ["A House of Glass", "$12.50", "Published"],
  ["The Paper Garden", "$9.99", "Unpublished"],
  ["A Map of Stars", "$14.00", "Published"],
];

console.log(res?.data?.result)
console.log(res)
console.log(ebooks)
export default function WriterEbooksPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 pt-22 pb-12 sm:px-8 lg:px-12 lg:pt-12">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <WriterPageHeader
          title="Manage ebooks"
          subtitle="Create, edit, publish, and manage your catalogue."
          back={false}
        />
        <Link
          href="/dashboard/writer/add-ebook"
          className="btn-gold shrink-0 px-5 py-3 text-xs no-underline"
        >
          <FaPlus /> Add ebook
        </Link>
      </div>
      <div className="mt-8 overflow-x-auto rounded-2xl border border-white/[0.07] bg-bg-card">
        <table className="w-full min-w-190 text-left">
          <thead className="border-b border-white/[.07] text-[.65rem] tracking-[.15em] text-ink-faint uppercase">
            <tr>
              {["Title", "Price", "Status", "Actions"].map((x) => (
                <th key={x} className="px-6 py-4">
                  {x}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ebooks.map(([title, price, status]) => (
              <tr
                key={title}
                className="border-b border-white/[.05] last:border-0"
              >
                <td className="px-6 py-5 font-serif text-lg font-semibold text-ink">
                  {title}
                </td>
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
                  <Link
                    href="/dashboard/writer/edit-ebook/a-house-of-glass"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/[.12] px-3 py-2 text-xs text-ink no-underline hover:border-gold/40"
                  >
                    <FaPen className="h-3 w-3" /> Edit
                  </Link>
                  <button className="rounded-lg border border-gold/25 bg-gold-dim px-3 py-2 text-xs text-gold">
                    {status === "Published" ? "Unpublish" : "Publish"}
                  </button>
                  <button
                    aria-label={`Delete ${title}`}
                    className="rounded-lg border border-red-400/20 bg-red-500/10 p-2 text-red-300"
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
