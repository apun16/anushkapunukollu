'use client';

import React, { useState } from "react";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";

interface Book {
  id: number;
  title: string;
  genres: string[];
  topics: string[];
  rating: number;
  lastRead: string;
  tldr: string;
  annotations: string;
}

const sampleBooks: Book[] = [
  {
    id: 1,
    title: "Sapiens",
    genres: ["History", "Anthropology"],
    topics: ["Human Evolution", "Society", "Culture"],
    rating: 5,
    lastRead: "2024-01-15",
    tldr: " see the world through cognitive, agricultural, and scientific revolutions.",
    annotations: " ",
  }
];

export default function Bookshelf() {
  const [recommendation, setRecommendation] = useState("");

  const handleRecommendationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (recommendation.trim()) {
      try {
        const formData = new FormData();
        formData.append('access_key', '54b29d50-73fc-44e7-865d-6b9e4ec244d1');
        formData.append('subject', `Book Recommendation: ${recommendation}`);
        formData.append('message', `New book recommendation from website visitor:\n\nBook: ${recommendation}\n\nSubmitted on: ${new Date().toLocaleString()}`);
        formData.append('to', 'anushka.punukollu@gmail.com');
        
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          alert(`Thank you for recommending: "${recommendation}" - Your recommendation has been sent!`);
          setRecommendation("");
        } else {
          throw new Error('Failed to send email');
        }
      } catch (error) {
        console.error('Error sending recommendation:', error);
        setRecommendation("");
      }
    }
  };

  const renderStars = (rating: number) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  const getTagColor = (tag: string) => {
    const colors = {
      // Genres
      'Non-fiction': 'bg-[#D4E0F0] text-[#543787] border border-[#7CB8C0]',
      'History': 'bg-[#FEB737] text-[#543787] border border-[#FEB737]',
      'Business': 'bg-[#7CB8C0] text-white border border-[#7CB8C0]',
      'Self-help': 'bg-[#543787] text-white border border-[#543787]',
      'Psychology': 'bg-[#00674F] text-white border border-[#00674F]',
      'Anthropology': 'bg-[#FEB737] text-[#543787] border border-[#FEB737]',
      'Entrepreneurship': 'bg-[#543787] text-white border border-[#543787]',
      'Cognitive Science': 'bg-[#7CB8C0] text-white border border-[#7CB8C0]',
      
      // Topics
      'Human Evolution': 'bg-[#D4E0F0] text-[#543787] border border-[#7CB8C0]',
      'Society': 'bg-[#FEB737] text-[#543787] border border-[#FEB737]',
      'Culture': 'bg-[#7CB8C0] text-white border border-[#7CB8C0]',
      'Startups': 'bg-[#543787] text-white border border-[#543787]',
      'Innovation': 'bg-[#00674F] text-white border border-[#00674F]',
      'Product Development': 'bg-[#7CB8C0] text-white border border-[#7CB8C0]',
      'Decision Making': 'bg-[#FEB737] text-[#543787] border border-[#FEB737]',
      'Bias': 'bg-[#543787] text-white border border-[#543787]',
      'Rationality': 'bg-[#00674F] text-white border border-[#00674F]',
      'Sociology': 'bg-[#FEB737] text-[#543787] border border-[#FEB737]',
      'Cognitive Biases': 'bg-[#543787] text-white border border-[#543787]',
      'Behavioral Economics': 'bg-[#7CB8C0] text-white border border-[#7CB8C0]'
    };
    
    return colors[tag as keyof typeof colors] || 'bg-[#D4E0F0] text-[#543787] border border-[#7CB8C0]';
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-3xl mx-auto px-6 py-8">
        <Navbar currentPage="bookshelf" />
        
        <div className="mb-8">
          <h1 className="text-5xl font-light mb-4 leading-tight" style={{ fontFamily: 'Satoshi-Light, Satoshi-Variable, system-ui, sans-serif' }}>
            <span className="text-[#00674F] font-bold">bookshelf</span>
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mb-4" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
            For a long time I&apos;ve been keeping a ledger of every book I&apos;ve owned & read along with a short reflection on it. I think this quote best describes why I love to read:
          </p>
          
          <blockquote className="border-l-4 border-[#543787] pl-6 py-4 bg-gray-50 rounded-r-lg italic text-base leading-relaxed" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
            &quot;To read is to fly: it is to soar to a point of vantage which gives a view over wide terrains of history, human variety, ideas, shared experience and the fruits of many inquiries.&quot; - A.C. Grayling
          </blockquote>
        </div>

        <div className="mb-8">
          <div className="bg-[#D4E0F0] border border-[#7CB8C0] rounded-none p-6">
            <h3 className="text-lg font-bold mb-3" style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable, system-ui, sans-serif' }}>
              📮 Book Recommendations
            </h3>
            <p className="text-sm text-gray-600 mb-4" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
              Have a book you think I&apos;d love? Drop it in the mailbox below!
            </p>
            <form onSubmit={handleRecommendationSubmit} className="flex gap-2">
              <input
                type="text"
                value={recommendation}
                onChange={(e) => setRecommendation(e.target.value)}
                placeholder="Book title and author..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-[#FEB737]"
                style={{ fontFamily: 'Sora, system-ui, sans-serif' }}
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#543787] text-white rounded-none hover:bg-[#FEB737] transition-colors"
                style={{ fontFamily: 'Satoshi-Medium, Satoshi-Variable, system-ui, sans-serif' }}
              >
                Send
              </button>
            </form>
          </div>
        </div>

        <div className="mb-8">
          <div className="bg-white border border-gray-200 overflow-hidden">
            <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200 font-bold text-sm" style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable, system-ui, sans-serif' }}>
              <div className="col-span-4">Title</div>
              <div className="col-span-3">Genre</div>
              <div className="col-span-3">Topics</div>
              <div className="col-span-2">Rating</div>
            </div>
            
            {sampleBooks.map((book) => (
              <div
                key={book.id}
                className="grid grid-cols-12 gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors items-start"
              >
                <div className="col-span-4 font-medium" style={{ fontFamily: 'Satoshi-Medium, Satoshi-Variable, system-ui, sans-serif' }}>
                  {book.title}
                </div>
                <div className="col-span-3 text-sm flex flex-wrap gap-1" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  {book.genres.map((genre, index) => (
                    <span key={index} className={`px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap ${getTagColor(genre)}`}>
                      {genre}
                    </span>
                  ))}
                </div>
                <div className="col-span-3 text-sm flex flex-wrap gap-1" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  {book.topics.map((topic, index) => (
                    <span key={index} className={`px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap ${getTagColor(topic)}`}>
                      {topic}
                    </span>
                  ))}
                </div>
                <div className="col-span-2 text-yellow-500 flex items-center" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  {renderStars(book.rating)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full mb-8">
          <hr className="border-gray-300" />
        </div>

        <Footer />
      </main>
    </div>
  );
}