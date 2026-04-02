"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import BookDetailPanel from "@/components/book-details";
import type { Book } from "@/components/book-details";
import { BookStarRating } from "@/components/book-star-rating";

interface BookshelfClientProps {
  books: Book[];
}

function useBookshelfColumnCount(): number {
  const [cols, setCols] = useState(2);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w >= 1280) setCols(6);
      else if (w >= 1024) setCols(5);
      else if (w >= 768) setCols(4);
      else if (w >= 640) setCols(3);
      else setCols(2);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return cols;
}

export default function BookshelfClient({ books }: BookshelfClientProps) {
  const [recommendation, setRecommendation] = useState("");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const columnCount = useBookshelfColumnCount();

  const filteredBooks = books.filter((book) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      book.title.toLowerCase().includes(q) ||
      book.author?.toLowerCase().includes(q) ||
      book.genres.some((g) => g.toLowerCase().includes(q)) ||
      book.topics.some((t) => t.toLowerCase().includes(q))
    );
  });

  const isSearching = searchQuery.trim().length > 0;
  const placeholderCount =
    !isSearching &&
    filteredBooks.length > 0 &&
    filteredBooks.length % columnCount !== 0
      ? columnCount - (filteredBooks.length % columnCount)
      : 0;

  const handleRecommendationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recommendation.trim()) return;
    try {
      const formData = new FormData();
      formData.append("access_key", "54b29d50-73fc-44e7-865d-6b9e4ec244d1");
      formData.append("subject", `Book Recommendation: ${recommendation}`);
      formData.append(
        "message",
        `New book recommendation from website visitor:\n\nBook: ${recommendation}\n\nSubmitted on: ${new Date().toLocaleString()}`
      );
      formData.append("to", "anushka.punukollu@gmail.com");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert(`Thank you for recommending: "${recommendation}" — your recommendation has been sent!`);
        setRecommendation("");
      } else {
        throw new Error("Failed");
      }
    } catch (error) {
      console.error("Error sending recommendation:", error);
      setRecommendation("");
    }
  };

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setTimeout(() => setSelectedBook(null), 300);
  };

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const tiltX = (y - 0.5) * -22;
    const tiltY = (x - 0.5) * 22;
    card.style.transform = `perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.04, 1.04, 1.04)`;
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform =
      "perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  };

  return (
    <>
      <div className="mb-8">
        <div
          className="rounded-none p-4 sm:p-5 shadow-sm"
          style={{
            backgroundColor: "var(--color-light)",
            borderColor: "var(--color-secondary)",
            borderWidth: "1px",
            borderStyle: "solid",
            boxShadow: "0 8px 24px rgba(84, 55, 135, 0.08)",
          }}
        >
          <h3
            className="text-base font-bold mb-2"
            style={{
              fontFamily: "Satoshi-Bold, Satoshi-Variable, system-ui, sans-serif",
              color: "#2d2d2d",
            }}
          >
            📮 Book Recommendations
          </h3>
          <p
            className="text-xs mb-3 leading-relaxed"
            style={{ fontFamily: "Sora, system-ui, sans-serif", color: "#2d2d2d" }}
          >
            Have a book you think I&apos;d love? Drop it in the mailbox below!
          </p>
          <form onSubmit={handleRecommendationSubmit} className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={recommendation}
              onChange={(e) => setRecommendation(e.target.value)}
              placeholder="Book title and author…"
              className="w-full sm:flex-1 px-3 py-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 text-sm"
              style={{
                fontFamily: "Sora, system-ui, sans-serif",
                color: "#2d2d2d",
                "--tw-ring-color": "var(--color-accent)",
              } as React.CSSProperties}
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2.5 text-white rounded-none transition-colors text-sm font-medium"
              style={{
                backgroundColor: "var(--color-primary)",
                fontFamily: "Satoshi-Medium, Satoshi-Variable, system-ui, sans-serif",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--color-accent)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--color-primary)")
              }
            >
              Send
            </button>
          </form>
        </div>
      </div>

      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by title, author, genre, or topic…"
          className="w-full px-4 py-2 border border-gray-200 rounded-none focus:outline-none focus:ring-2 text-sm"
          style={{
            fontFamily: "Sora, system-ui, sans-serif",
            color: "#2d2d2d",
            "--tw-ring-color": "var(--color-accent)",
          } as React.CSSProperties}
        />
      </div>

      {filteredBooks.length === 0 ? (
        <div
          className="text-center py-16 text-sm"
          style={{ fontFamily: "Sora, system-ui, sans-serif", color: "#6b7280" }}
        >
          No books match your search.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-5 gap-y-8 mb-10">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              onClick={() => handleBookClick(book)}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="cursor-pointer group flex flex-col items-center"
              style={{
                transition: "transform 0.12s ease",
                transformStyle: "preserve-3d",
                willChange: "transform",
              }}
            >
              <div
                className="relative overflow-hidden rounded shadow-md mb-2 group-hover:shadow-xl transition-shadow w-full"
                style={{ aspectRatio: "2/3" }}
              >
                {book.imageSrc ? (
                  <Image
                    src={book.imageSrc}
                    alt={book.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1280px) 20vw, 16vw"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ backgroundColor: book.spineColor ?? "#2d2d2d" }}
                  >
                    <span
                      className="text-white text-xs text-center px-3 leading-snug"
                      style={{
                        fontFamily:
                          "Satoshi-Bold, Satoshi-Variable, system-ui, sans-serif",
                      }}
                    >
                      {book.title}
                    </span>
                  </div>
                )}
              </div>

              {book.author ? (
                <p
                  className="w-full text-center text-[0.65rem] leading-tight mb-1 px-1"
                  style={{
                    fontFamily: "Sora, system-ui, sans-serif",
                    color: "var(--color-muted)",
                  }}
                >
                  {book.author}
                </p>
              ) : null}
              <BookStarRating rating={book.rating} size="card" className="w-full justify-center mb-1" />
            </div>
          ))}
          {Array.from({ length: placeholderCount }).map((_, i) => (
            <div
              key={`shelf-placeholder-${i}`}
              className="pointer-events-none select-none flex flex-col"
              aria-hidden="true"
            >
              <div
                className="relative flex items-center justify-center rounded mb-2.5 border-2 border-dashed"
                style={{
                  aspectRatio: "2 / 3",
                  borderColor: "rgba(0, 0, 0, 0.08)",
                  backgroundColor: "rgba(0, 0, 0, 0.02)",
                }}
              >
                <span
                  className="text-center text-xs leading-snug px-3"
                  style={{
                    fontFamily: "Sora, system-ui, sans-serif",
                    color: "#a3a3a3",
                  }}
                >
                  More to come
                </span>
              </div>
              <div className="h-[18px]" aria-hidden />
            </div>
          ))}
        </div>
      )}

      <BookDetailPanel
        book={selectedBook}
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
      />
    </>
  );
}
