"use client";
import LibraryGallery from "@/components/dashboard/LibraryGallery";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

export default function BookmarksPage() {
  const [bookmarkBooks, setBookmarkBooks] = useState([])
  const { data: session } = authClient.useSession();
  const userId = session?.user.id;
  // console.log(user);
  // useEffect( async () => {
  //   const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookmarks/${userId}`)
  //   const results = await res.json()
  //   console.log(results)
  // }, []);
  useEffect(() => {
  const fetchBookmarks = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookmarks/${userId}`)
    const results = await res.json();
    setBookmarkBooks(results.data);
  };
  fetchBookmarks();
}, [userId]);
console.log(bookmarkBooks)
  return (
    <LibraryGallery
      title="Bookmarks"
      subtitle="Your saved stories, ready for the next quiet moment."
      bookmarkBooks={bookmarkBooks}
    />
  );
}
