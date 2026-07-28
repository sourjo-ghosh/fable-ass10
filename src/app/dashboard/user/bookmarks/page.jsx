import LibraryGallery from "@/components/dashboard/LibraryGallery";
import { getBookmarkBooks } from "@/lib/actions/getBookmarks";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function BookmarksPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user.id;
  const data = await getBookmarkBooks(userId);
  return (
    <LibraryGallery
      title="Bookmarks"
      subtitle="Your saved stories, ready for the next quiet moment."
      bookmarkBooks={data}
    />
  );
}
