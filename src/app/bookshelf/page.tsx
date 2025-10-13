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
      'Non-fiction': 'bg-slate-100 text-slate-700 border border-slate-200',
      'History': 'bg-emerald-100 text-emerald-800 border border-emerald-200',
      'Business': 'bg-amber-100 text-amber-800 border border-amber-200',
      'Self-help': 'bg-violet-100 text-violet-800 border border-violet-200',
      'Psychology': 'bg-rose-100 text-rose-800 border border-rose-200',
      'Anthropology': 'bg-orange-100 text-orange-800 border border-orange-200',
      'Entrepreneurship': 'bg-purple-100 text-purple-800 border border-purple-200',
      'Cognitive Science': 'bg-indigo-100 text-indigo-800 border border-indigo-200',
      
      // Topics
      'Human Evolution': 'bg-slate-100 text-slate-700 border border-slate-200',
      'Society': 'bg-emerald-100 text-emerald-800 border border-emerald-200',
      'Culture': 'bg-amber-100 text-amber-800 border border-amber-200',
      'Startups': 'bg-violet-100 text-violet-800 border border-violet-200',
      'Innovation': 'bg-rose-100 text-rose-800 border border-rose-200',
      'Product Development': 'bg-indigo-100 text-indigo-800 border border-indigo-200',
      'Decision Making': 'bg-yellow-100 text-yellow-800 border border-yellow-200',
      'Bias': 'bg-red-100 text-red-800 border border-red-200',
      'Rationality': 'bg-cyan-100 text-cyan-800 border border-cyan-200',
      'Sociology': 'bg-emerald-100 text-emerald-800 border border-emerald-200',
      'Cognitive Biases': 'bg-red-100 text-red-800 border border-red-200',
      'Behavioral Economics': 'bg-cyan-100 text-cyan-800 border border-cyan-200'
    };
    
    return colors[tag as keyof typeof colors] || 'bg-gray-100 text-gray-700 border border-gray-200';
  };

  return (
    <div className="font-sans min-h-screen p-6 pb-12 sm:p-12">
      <Navbar currentPage="bookshelf" />
      
      <main className="flex flex-col gap-6 items-center sm:items-start max-w-4xl w-full mx-auto">
        <div className="w-full">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight" style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable, system-ui, sans-serif' }}>
            collection of writings
          </h1>
        </div>

        <div className="w-full">
          <p className="text-base leading-relaxed mb-6" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
            For a long time I&apos;ve been keeping a ledger of every book I&apos;ve owned & read along with a short reflection on it. I think this quote best describes why I love to read:
          </p>
          
          <blockquote className="border-l-4 border-gray-300 pl-6 py-4 bg-gray-50 rounded-r-lg italic text-base leading-relaxed" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
            &quot;To read is to fly: it is to soar to a point of vantage which gives a view over wide terrains of history, human variety, ideas, shared experience and the fruits of many inquiries.&quot; - A.C. Grayling
          </blockquote>
        </div>

        <div className="w-full">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-bold mb-3" style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable, system-ui, sans-serif' }}>
              📮 Book Recommendations
            </h3>
            <p className="text-sm text-gray-600 mb-4" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
              Have a book you think I&apos;d love? Drop it in the mailbox below!
            </p>
            <form onSubmit={handleRecommendationSubmit} className="flex gap-2">
              <input
                type="text"
                value={recommendation}
                onChange={(e) => setRecommendation(e.target.value)}
                placeholder="Book title and author..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                style={{ fontFamily: 'Satoshi-Medium, Satoshi-Variable, system-ui, sans-serif' }}
              >
                Send
              </button>
            </form>
          </div>
        </div>

        <div className="w-full">
          <hr className="border-gray-300" />
        </div>

          <div className="w-full">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
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
                   <div className="col-span-3 text-sm flex flex-wrap gap-1" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                     {book.genres.map((genre, index) => (
                       <span key={index} className={`px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap ${getTagColor(genre)}`}>
                         {genre}
                       </span>
                     ))}
                   </div>
                   <div className="col-span-3 text-sm flex flex-wrap gap-1" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                     {book.topics.map((topic, index) => (
                       <span key={index} className={`px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap ${getTagColor(topic)}`}>
                         {topic}
                       </span>
                     ))}
                   </div>
                  <div className="col-span-2 text-yellow-500 flex items-center" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                    {renderStars(book.rating)}
                  </div>
                </div>
              ))}
            </div>
          </div>

        <div className="w-full">
          <hr className="border-gray-300" />
        </div>

         <Footer />
       </main>

    </div>
  );
}