import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import BookshelfClient from "@/app/bookshelf/bookshelf-client";
import { supabase, type BookRow } from "@/lib/supabase";
import type { Book } from "@/components/book-details";

export const revalidate = 3600; 

function rowToBook(row: BookRow): Book {
  return {
    id: row.id,
    title: row.title,
    author: row.author ?? undefined,
    genres: row.genres ?? [],
    topics: row.topics ?? [],
    rating: row.rating,
    lastRead: row.last_read,
    tldr: row.tldr,
    annotations: row.annotations,
    imageSrc: row.image_src ?? undefined,
    pages: row.pages ?? undefined,
    spineColor: row.spine_color ?? undefined,
  };
}

export default async function BookshelfPage() {
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .order("last_read", { ascending: false });

  if (error) {
    console.error("Supabase fetch error:", error.message);
  }

  const books: Book[] = (data ?? []).map(rowToBook);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-background, #ffffff)" }}
    >
      <main className="max-w-5xl mx-auto px-6 py-8">
        <Navbar currentPage="bookshelf" />

        <div className="mb-8">
          <h1
            className="text-3xl font-bold mb-2 leading-tight"
            style={{
              fontFamily:
                "Satoshi-Bold, Satoshi-Variable, system-ui, sans-serif",
              color: "var(--color-dark)",
            }}
          >
            bookshelf
          </h1>
          <p
            className="text-sm text-gray-700 leading-relaxed w-full mb-3"
            style={{ fontFamily: "Sora, system-ui, sans-serif" }}
          >
            For a long time I&apos;ve been keeping a ledger of every book/article
            I&apos;ve owned & read along with a short reflection on it. I think this
            quote best describes why I love to read:
          </p>

          <blockquote
            className="border-l-4 pl-5 py-3 bg-gray-50 rounded-r-lg italic text-sm leading-relaxed"
            style={{
              fontFamily: "Sora, system-ui, sans-serif",
              borderColor: "var(--color-primary)",
            }}
          >
            &quot;To read is to fly: it is to soar to a point of vantage which gives
            a view over wide terrains of history, human variety, ideas, shared
            experience and the fruits of many inquiries.&quot; — A.C. Grayling
          </blockquote>
        </div>

        <BookshelfClient books={books} />

        <div className="w-full mb-4">
          <hr style={{ borderColor: "var(--color-border)" }} />
        </div>

        <Footer />
      </main>
    </div>
  );
}
