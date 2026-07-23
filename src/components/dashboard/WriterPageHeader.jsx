import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

export default function WriterPageHeader({ title, subtitle, back = true }) {
  return (
    <>
      {back && (
        <Link
          href="/dashboard/writer"
          className="inline-flex items-center gap-2 text-sm text-ink-muted no-underline hover:text-gold"
        >
          <FaArrowLeft className="h-3 w-3" /> Writer dashboard
        </Link>
      )}
      <p
        className={`${back ? "mt-8" : ""} text-xs font-bold tracking-[0.18em] text-gold uppercase`}
      >
        Writer studio
      </p>
      <h1 className="mt-2 font-serif text-4xl font-semibold text-ink">
        {title}
      </h1>
      <p className="mt-2 text-sm text-ink-muted">{subtitle}</p>
    </>
  );
}
