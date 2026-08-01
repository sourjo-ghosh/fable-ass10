import { getPurchasedHistory } from "@/lib/actions/user/getPurchasedHistory";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { FaArrowLeft, FaCheck, FaReceipt } from "react-icons/fa6";

export default async function PurchaseHistoryPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user?.id;
  const purchasedHistoryData = await getPurchasedHistory({ userId });
  const data = purchasedHistoryData || [];

  return (
    <main className="mx-auto max-w-6xl px-5 pt-22 pb-12 sm:px-8 lg:px-12 lg:pt-12">
      <Link
        href="/dashboard/user"
        className="inline-flex items-center gap-2 text-sm text-ink-muted no-underline hover:text-gold"
      >
        <FaArrowLeft className="h-3 w-3" /> Overview
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
            {data.map((item) => (
              <tr
                key={item.title}
                className="border-b border-white/[0.05] last:border-0"
              >
                <td className="px-6 py-5 font-serif text-lg font-semibold text-ink">
                  {item.title}
                </td>
                <td className="px-6 py-5 text-sm text-ink-muted">
                  {item.author}
                </td>
                <td className="px-6 py-5 text-sm font-semibold text-gold">
                  {item.price}
                </td>
                <td className="px-6 py-5 text-sm text-ink-muted">
                  {/* {item.date} */}
                  {new Date(item.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
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
        <FaReceipt className="text-gold" /> Showing {data.length} purchases
      </div>
    </main>
  );
}
