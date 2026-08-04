import AdminTableHeader from "@/components/dashboard/AdminTableHeader";
import { getAllTransactions } from "@/lib/actions/admin/getAllTransections";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const transactions = [
  ["TRX-84291", "Purchase", "ava@fable.com", "$14.99", "Jul 22, 2026"],
  ["TRX-84290", "Publishing fee", "noah@fable.com", "$24.00", "Jul 21, 2026"],
  ["TRX-84289", "Purchase", "mia@fable.com", "$15.50", "Jul 20, 2026"],
  ["TRX-84288", "Purchase", "liam@fable.com", "$9.99", "Jul 19, 2026"],
];

export default async function TransactionsPage() {
   const session = await auth.api.getSession({
      headers: await headers(),
    });
    const userId = session?.user?.id;
    const allTransactions = await getAllTransactions({ userId });
    const data = allTransactions?.data || [];
    console.log("All transactions data:", data);
  return (
    <main className="mx-auto max-w-7xl px-5 pt-22 pb-12 sm:px-8 lg:px-12 lg:pt-12">
      <AdminTableHeader
        title="All transactions"
        subtitle="A complete record of purchases and publishing payments."
      />
      <div className="mt-8 overflow-x-auto rounded-2xl border border-white/[0.07] bg-bg-card">
        <table className="w-full min-w-210 text-left">
          <thead className="border-b border-white/[0.07] text-[.65rem] tracking-[.15em] text-ink-faint uppercase">
            <tr>
              {[
                "Transaction ID",
                "Type",
                "User / writer",
                "Amount",
                "Date",
              ].map((x) => (
                <th key={x} className="px-6 py-4">
                  {x}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item.id}
                className="border-b border-white/[0.05] last:border-0"
              >
                <td className="px-6 py-5 font-mono text-xs text-gold">{item.id}</td>
                <td className="px-6 py-5">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs ${item.type === "ebook_purchase" ? "bg-emerald-400/10 text-emerald-300" : "bg-sky-400/10 text-sky-300"}`}
                  >
                    {item.type === "ebook_purchase" ? "Purchase" : "Writer fee"}
                  </span>
                </td>
                <td className="px-6 py-5 text-sm text-ink-muted">{item.email}</td>
                <td className="px-6 py-5 text-sm font-semibold text-ink">
                  {item.amount}
                </td>
                <td className="px-6 py-5 text-sm text-ink-muted">
                  {new Date(item.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
