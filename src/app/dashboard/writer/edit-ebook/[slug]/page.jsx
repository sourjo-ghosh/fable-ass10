import EbookForm from "@/components/dashboard/EbookForm";
import WriterPageHeader from "@/components/dashboard/WriterPageHeader";

const existingBook = {
  title: "A House of Glass",
  price: "12.50",
  genre: "Mystery",
  cover: "/cover-1.jpg",
  content: "A draft excerpt of A House of Glass…",
};
export default function EditEbookPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 pt-22 pb-12 sm:px-8 lg:px-12 lg:pt-12">
      <WriterPageHeader
        title="Edit ebook"
        subtitle="Update your story, price, genre, and cover image."
      />
      <EbookForm initialBook={existingBook} submitLabel="Save changes" />
    </main>
  );
}
