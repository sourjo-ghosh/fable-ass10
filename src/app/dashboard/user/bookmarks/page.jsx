import LibraryGallery from "@/components/dashboard/LibraryGallery";

export default function BookmarksPage() {
  return (
    <LibraryGallery
      title="Bookmarks"
      subtitle="Your saved stories, ready for the next quiet moment."
      bookmarked
    />
  );
}
