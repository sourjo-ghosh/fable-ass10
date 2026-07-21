import EbookForm from "@/components/dashboard/EbookForm";
import WriterPageHeader from "@/components/dashboard/WriterPageHeader";

export default function AddEbookPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 pt-22 pb-12 sm:px-8 lg:px-12 lg:pt-12">
      <WriterPageHeader
        title="Add an ebook"
        subtitle="Create a new listing and upload its cover."
      />
      <EbookForm />
    </main>
  );
}
