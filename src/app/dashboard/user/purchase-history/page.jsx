import Link from "next/link";
import { FaArrowLeft, FaCheck, FaReceipt } from "react-icons/fa6";

const purchases = [
  ["The Silent Patient", "Alex Michaelides", "$14.99", "Jul 18, 2026"],
  ["The Midnight Library", "Matt Haig", "$12.99", "Jul 11, 2026"],
  ["Circe", "Madeline Miller", "$15.50", "Jun 28, 2026"],
  [
    "Tomorrow, and Tomorrow, and Tomorrow",
    "Gabrielle Zevin",
    "$16.99",
    "Jun 16, 2026",
  ],
];

export default function PurchaseHistoryPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 pt-22 pb-12 sm:px-8 lg:px-12 lg:pt-12">
      <Link
        href="/dashboard/user"
        className="inline-flex items-center gap-2 text-sm text-ink-muted no-underline hover:text-gold"
      >
        <FaArrowLeft className="h-3 w-3" /> Profile
      </Link>
      <div className="mt-8">
        <p className="text-xs font-bold tracking-[0.18em] text-gold uppercase">
          Account
        </p>
        <h1 className="mt-2 font-serif text-4xl font-semibold text-ink">
          Purchase history
        </h1>
        <p className="mt-2 text-sm text-ink-muted">
          A record of every story you have added to your shelf.
        </p>
      </div>
      <div className="mt-8 overflow-x-auto rounded-2xl border border-white/[0.07] bg-bg-card">
        <table className="w-full min-w-170 text-left">
          <thead className="border-b border-white/[0.07] text-[0.65rem] tracking-[0.15em] text-ink-faint uppercase">
            <tr>
              {["Ebook", "Writer", "Price", "Purchase date", "Status"].map(
                (item) => (
                  <th key={item} className="px-6 py-4 font-bold">
                    {item}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {purchases.map(([title, author, price, date]) => (
              <tr
                key={title}
                className="border-b border-white/[0.05] last:border-0"
              >
                <td className="px-6 py-5 font-serif text-lg font-semibold text-ink">
                  {title}
                </td>
                <td className="px-6 py-5 text-sm text-ink-muted">{author}</td>
                <td className="px-6 py-5 text-sm font-semibold text-gold">
                  {price}
                </td>
                <td className="px-6 py-5 text-sm text-ink-muted">{date}</td>
                <td className="px-6 py-5">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs font-medium text-emerald-300">
                    <FaCheck className="h-2.5 w-2.5" /> Complete
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-5 flex items-center gap-2 text-xs text-ink-faint">
        <FaReceipt className="text-gold" /> Showing 4 purchases
      </div>
    </main>
  );
}
