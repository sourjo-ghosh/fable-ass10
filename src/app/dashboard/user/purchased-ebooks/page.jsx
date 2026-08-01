import LibraryGallery from "@/components/dashboard/LibraryGallery";
import { getPurchasedBooks } from "@/lib/actions/user/getPurchasedBooks";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function PurchasedEbooksPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user?.id;
  const purchasedBooks = await getPurchasedBooks({ userId });
  const data = purchasedBooks || [];
  return (
    <LibraryGallery
      title="Purchased ebooks"
      subtitle="Every book you own, kept together on one shelf."
      data={data}
    />
  );
}
