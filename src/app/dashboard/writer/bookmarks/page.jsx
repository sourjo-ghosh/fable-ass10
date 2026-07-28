import LibraryGallery from "@/components/dashboard/LibraryGallery";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getBookmarkBooks } from "@/lib/actions/getBookmarks";

export default async function WriterBookmarksPage()  {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user?.id;
  const data = await getBookmarkBooks({userId});
  console.log(data, userId)
  console.log(data.length, "data form writer/bookmarks ")

  return (
    <LibraryGallery
      title="Bookmarks"
      subtitle="Your saved stories, ready for the next quiet moment."
      bookmarkBooks={data}
    />
  );
}
