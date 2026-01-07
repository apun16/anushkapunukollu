'use client';

import React, { useState } from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import BookDetailPanel, { type Book } from "../../components/book-details";

const sampleBooks: Book[] = [
  {
    id: 1,
    title: "Sea of Poppies",
    author: "Amitav Ghosh",
    genres: ["Fiction"],
    topics: ["Colonialism", "History", "Migration"],
    rating: 4,
    lastRead: "2026-01-03",
    tldr: "Set during the British colonial period in India, Sea of Poppies follows a group of strangers whose lives intersect on a ship transporting labourers. It explores how empires, the opium trade, and class impacted ordinary people during that time.",
    annotations: "1st book of 2026!\nFavourite quote: The government to you is what God is to agnostics - only to be invoked when your own well being is at stake.",
    imageSrc: "/books/SeaofPoppies.jpg",
    pages: 528, 
  },
  {
    id: 2,
    title: "As Long as the Lemon Trees Grow",
    author: "Zoulfa Katouh",
    genres: ["Fiction"],
    topics: ["War", "Hope", "Resilience", "Grief"],
    rating: 5,
    lastRead: "2025-12-27",
    tldr: "Set during the Syrian civil war about 18 year old Salama balancing hope, guilt and surival while working in a hospital filled with violence.",
    annotations: "Incredibly well written and it shows how in the midst of brutal revolutions love and resistance are still possible. For Salama this includes tiny acts like buying wilted lemons and soon lemons become a sign of resilience and rebellion.",
    imageSrc: "/books/AsLongastheLemonTreesGrow.jpg",
    pages: 420, 
  },
  {
    id: 3,
    title: "Paradox of Choice",
    author: "Barry Schwartz",
    genres: ["Non-Fiction"],
    topics: ["Self-Help", "Happiness"],
    rating: 4,
    lastRead: "2025-12-22",
    tldr: "A look at how having too many options can actually make us less happy and more stressed (even if outcomes are good).",
    annotations: "This book is a decent read for anyone who feels overwhelmed by the sheer number of options in life.",
    imageSrc: "/books/ParadoxofChoice.jpg",
    pages: 304, 
  },
  {
    id: 4,
    title: "The Count of Monte Cristo",
    author: "Alexandre Dumas",
    genres: ["Fiction", "Classic"],
    topics: ["Growth", "Revenge"],
    rating: 5,
    lastRead: "2025-12-19",
    tldr: "A Edmond Dantès is wrongfully imprisoned, escapes, becomes immensely wealthy, and meticulously enacts revenge on those who betrayed him. In the process, he begins questioning whether revenge brings peace.",
    annotations: "Called a classic for good reason :). Although long, the book is very fleshed out and clearly shows the moral tension as Dantès wrestles with his desire for revenge. This book was a great way to show how revenge is a slow poison that ultimately hurts the avenger more than anyone else.",
    imageSrc: "/books/TheCountofMonteCristo.jpg",
    pages: 1200, 
  },
  {
    id: 5,
    title: "Existentialism is a Humanism",
    author: "Jean-Paul Sartre",
    genres: ["Philosophy"],
    topics: ["Freedom", "Meaning"],
    rating: 4,
    lastRead: "2025-11-14",
    tldr: "Sartre argues that humans aren't born with a predetermined or grandoise purpose. Instead, we create our own sense of meaning through our choices and are fully responsible for them.",
    annotations: "Existence precedes essence - Jean-Paul Sartre\nA pretty readable intro to existentialism. Nice to read a clarified deifiniton of existentialism beyond the usual pessimistic caricature of it.",
    imageSrc: "/books/ExistentialismisaHumanism.jpg",
    pages: 128, 
  },
  {
    id: 6,
    title: "Crying in H Mart",
    author: "Michelle Zauner",
    genres: ["Autobiography", "Non-Fiction"],
    topics: ["Growth", "Grief"],
    rating: 5,
    lastRead: "2025-11-05",
    tldr: "Crying in H Mart is a true story about Michelle Zauner losing her mom to cancer and how deeply she misses her. She remembers her mom through cooking Korean food, visiting the grocery store H Mart, and practicing family traditions. The book explores love, grief, family, and figuring out who you are when someone you love is gone.",
    annotations: "I read this after a friend in english class said one of my narrative essays reminded him of Zauner's writing. Wow this book was incredible especially when I think about my grandmother and how when I'm away from her it is the traditions she would do with me that I miss the most.",
    imageSrc: "/books/CryinginHMart.jpg",
    pages: 256, 
  },
  {
    id: 7,
    title: "Apple in China: The Capture of the World's Greatest Company",
    author: "Patrick McGee",
    genres: ["Non-Fiction", "Business",],
    topics: ["Politics", "Technology"],
    rating: 4,
    lastRead: "2025-08-13",
    tldr: "An interesting read into how Apple turned China into a manufacturing powerhouse and how this overdependence exposed Apple to Beijing's geopolitical demands.",
    annotations: "A cautionary tale of how even the one of the most successful companies in history can fall victim to overconfidence and geopolitical risk. Apple's desire to dominate the Chinese market led them to make compromises that ultimately increased their competition and threatened their global standing.",
    imageSrc: "/books/AppleinChina.jpg",
    pages: 448,
  },
  {
    id: 8,
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    genres: ["Non-Fiction", "Business", "Psychology"],
    topics: ["Bias", "Decision Making"],
    rating: 4,
    lastRead: "2025-07-29",
    tldr: `Our brain has two ways of thinking: 

Fast Thinking: quick, automatic, and instinctive. It's like when you immediately know the answer to 2 + 2 or instinctively react to a scary dog. It helps us act fast but can sometimes lead to mistakes. 

Slow Thinking: deliberate, careful, and logical. It's what you use when solving a tricky math problem, planning a big decision, or calculating risks in poker. 

Kahneman explains that we often rely too much on fast thinking, which can create biases and bad decisions. By using slow thinking, we can make smarter choices and better judge probability, risk, and value.`,
    annotations: "Helps with understanding how to think about poker or trading. Since we often use fast thinking we tend to be overconfident and take risky descions. By choosing to think slowly you can make smarter choices. First heard about this at WiSE @ jane street where someone told me it would help me play figgie better :)",
    imageSrc: "/books/ThinkingFastAndSlow.jpg",
    pages: 512,
  },
  {
    id: 9,
    title: "Empire of AI",
    author: "Karen Hao",
    genres: ["Technology"],
    topics: ["AI", "Power", "Ethics"],
    rating: 5,
    lastRead: "2025-06-30",
    tldr: "Investigative look into how modern AI systems are build, who benefits, and how power/exploitation are embedded in the AI ecosystem.",
    annotations: "Sharp, critical, and disturbing at times. Articulates the cost of AI on indiviuduals and societies. An interesting perspective to read admist all the new advancements in the field.",
    imageSrc: "/books/EmpireofAI.jpg",
    pages: 496, 
  },
  {
    id: 10,
    title: "Less",
    author: "Andrew Sean Greer",
    genres: ["Fiction"],
    topics: ["Identity", "Humour"],
    rating: 3,
    lastRead: "2025-5-23",
    tldr: "A Pulitzer-winning novel about a middle-aged novelist who travels the world to avoid his failed relationships and career. It depicts his process of accepting himself.",
    annotations: "Less is quite a self absorbed guy at the begining but as the story went he did begin to grow. It wasn't too funny or comedic but the writing was strong. A good fun read but nothing more.",
    imageSrc: "/books/Less.jpg",
    pages: 272, 
  },
  {
    id: 11,
    title: "The Myth of Sisyphus",
    author: "Albert Camus",
    genres: ["Philosophy"],
    topics: ["Growth", "Culture", "Grief"],
    rating: 4,
    lastRead: "2024-12-14",
    tldr: "Camus argues that life is inherently meaningless, but instead of despairing, we should embrace this absurdity and find our own meaning through our actions and choices. He uses the myth of Sisyphus, who is condemned to roll a boulder up a hill only for it to roll back down, as a metaphor for human existence. Camus suggests that we can find happiness in the struggle itself, even if the ultimate goal is unattainable.",
    annotations: "My favourite philosophy writers are Camus and Sartre so I was excited to read this. I enjoyed his framing that continuising to exist is a rebellion against the absurdity of life. Some days when I feel like I'm going through the motions of life I think about Sisyphus happily pushing his boulder up the hill.",
    imageSrc: "/books/TheMythofSisyphus.jpg",
    pages: 123, 
  },
  {
    id: 12,
    title: "A Thousand Splendid Suns",
    author: "Khaled Hosseini",
    genres: ["Fiction"],
    topics: ["War", "Womenhood"],
    rating: 5,
    lastRead: "2023-10-24",
    tldr: "Mariam and Laila are two Afghan women from different generations whose lives become intertwined amidst the backdrop of war-torn Afghanistan. They survive abuse from their own families, beatings from their husband, Soviet bombs, Taliban bans, and endless loss yet they still stay resilient and find friendship in each other.",
    annotations: "Cried a lot by the end. It was a devastating look into the impact of war, systemic oppression, and generational trauma. However, the story should not be reduced into the suffering of those women but instead how their personal agency outlasts patriarchy and authoritarian rule.",
    imageSrc: "/books/AThousandSplendidSuns.jpg",
    pages: 256, 
  },
  {
    id: 13,
    title: "The Secret",
    author: "Rhonda Byrne",
    genres: ["Non-Fiction"],
    topics: ["Self-Help"],
    rating: 2,
    lastRead: "2021-02-05",
    tldr: "The book states that thinking positively can bring positive experiences into a person's life through the law of attraction.",
    annotations: "Some motivational value, but overconfident claims about the law of attraction and manifestation. Not much scientific backing which made it hard to take seriously.",
    imageSrc: "/books/TheSecret.jpg",
    pages: 216, 
  },
  {
    id: 14,
    title: "Percy Jackson & the Olympians: The Full Series",
    author: "Rick Riordan",
    genres: ["Fiction"],
    topics: ["Greek Mythology", "Adventure"],
    rating: 5,
    lastRead: "2025",
    tldr: "My favourite book series of all time and probably the only reason I developed an interest in mythology (including learning about South Asian, African, and Greek/Roman Mythology).",
    annotations: "Read a 1000+ times in the past 10 years. Really anything Rick Riordan writes, regardless of my age, I will read. His books are always full of heart and made me excited to learn more about mythology in general!",
    imageSrc: "/books/PercyJackson.jpg",
    pages: 2000, 
  },
];

export default function Bookshelf() {
  const [recommendation, setRecommendation] = useState("");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

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

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setTimeout(() => setSelectedBook(null), 300);
  };

  const renderStars = (rating: number) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  const getTagColor = (tag: string) => {
    const colorMap: Record<string, { bg: string; text: string; border: string }> = {
      'Fiction': { bg: 'var(--color-secondary)', text: 'white', border: 'var(--color-secondary)' },
      'Non-Fiction': { bg: 'var(--color-light)', text: 'var(--color-primary)', border: 'var(--color-secondary)' },
      'History': { bg: 'var(--color-accent)', text: 'var(--color-primary)', border: 'var(--color-accent)' },
      'War': { bg: 'var(--color-accent)', text: 'var(--color-primary)', border: 'var(--color-accent)' },
      'Business': { bg: 'var(--color-secondary)', text: 'white', border: 'var(--color-secondary)' },
      'Self-Help': { bg: 'var(--color-primary)', text: 'white', border: 'var(--color-primary)' },
      'Psychology': { bg: 'var(--color-dark)', text: 'white', border: 'var(--color-dark)' },
      'Anthropology': { bg: 'var(--color-accent)', text: 'var(--color-primary)', border: 'var(--color-accent)' },
      'Entrepreneurship': { bg: 'var(--color-primary)', text: 'white', border: 'var(--color-primary)' },
      'Cognitive Science': { bg: 'var(--color-secondary)', text: 'white', border: 'var(--color-secondary)' },
      'Autobiography': { bg: 'var(--color-accent)', text: 'var(--color-primary)', border: 'var(--color-accent)' },

      'Human Evolution': { bg: 'var(--color-light)', text: 'var(--color-primary)', border: 'var(--color-secondary)' },
      'Society': { bg: 'var(--color-accent)', text: 'var(--color-primary)', border: 'var(--color-accent)' },
      'Culture': { bg: 'var(--color-secondary)', text: 'white', border: 'var(--color-secondary)' },
      'Startups': { bg: 'var(--color-primary)', text: 'white', border: 'var(--color-primary)' },
      'Innovation': { bg: 'var(--color-dark)', text: 'white', border: 'var(--color-dark)' },
      'Product Development': { bg: 'var(--color-secondary)', text: 'white', border: 'var(--color-secondary)' },
      'Decision Making': { bg: 'var(--color-accent)', text: 'var(--color-primary)', border: 'var(--color-accent)' },
      'Growth': { bg: 'var(--color-primary)', text: 'white', border: 'var(--color-primary)' },
      'Bias': { bg: 'var(--color-dark)', text: 'white', border: 'var(--color-dark)' },
      'Rationality': { bg: 'var(--color-dark)', text: 'white', border: 'var(--color-dark)' },
      'Sociology': { bg: 'var(--color-accent)', text: 'var(--color-primary)', border: 'var(--color-accent)' },
      'Behavioral Economics': { bg: 'var(--color-secondary)', text: 'white', border: 'var(--color-secondary)' }
    };
    
    const defaultStyle = { bg: 'var(--color-light)', text: 'var(--color-primary)', border: 'var(--color-secondary)' };
    return colorMap[tag] || defaultStyle;
  };

  return (
    <div className="min-h-screen geometric-pattern" style={{ backgroundColor: 'var(--color-background, #ffffff)' }}>
      <main className="max-w-3xl mx-auto px-6 py-8">
        <Navbar currentPage="bookshelf" />
        
        <div className="mb-8">
          <h1 className="text-5xl font-light mb-4 leading-tight" style={{ fontFamily: 'Satoshi-Light, Satoshi-Variable, system-ui, sans-serif' }}>
            <span className="text-[var(--color-dark)] font-bold">bookshelf</span>
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mb-4" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
            For a long time I&apos;ve been keeping a ledger of every book/article I&apos;ve owned & read along with a short reflection on it. I think this quote best describes why I love to read:
          </p>
          
          <blockquote className="border-l-4 pl-6 py-4 bg-gray-50 rounded-r-lg italic text-base leading-relaxed" style={{ fontFamily: 'Sora, system-ui, sans-serif', borderColor: 'var(--color-primary)' }}>
            &quot;To read is to fly: it is to soar to a point of vantage which gives a view over wide terrains of history, human variety, ideas, shared experience and the fruits of many inquiries.&quot; - A.C. Grayling
          </blockquote>
        </div>

        <div className="mb-8">
          <div className="rounded-none p-6" style={{ backgroundColor: 'var(--color-light)', borderColor: 'var(--color-secondary)', borderWidth: '1px', borderStyle: 'solid' }}>
            <h3 className="text-lg font-bold mb-3" style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable, system-ui, sans-serif', color: '#2d2d2d' }}>
              📮 Book Recommendations
            </h3>
            <p className="text-sm mb-4" style={{ fontFamily: 'Sora, system-ui, sans-serif', color: '#2d2d2d' }}>
              Have a book you think I&apos;d love? Drop it in the mailbox below!
            </p>
            <form onSubmit={handleRecommendationSubmit} className="flex gap-2">
              <input
                type="text"
                value={recommendation}
                onChange={(e) => setRecommendation(e.target.value)}
                placeholder="Book title and author..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 placeholder:text-[\#2d2d2d]"
                style={{ 
                  fontFamily: 'Sora, system-ui, sans-serif',
                  color: '#2d2d2d',
                  '--tw-ring-color': 'var(--color-accent)'
                } as React.CSSProperties}
              />
              <button
                type="submit"
                className="px-4 py-2 text-white rounded-none transition-colors"
                style={{ 
                  backgroundColor: 'var(--color-primary)',
                  fontFamily: 'Satoshi-Medium, Satoshi-Variable, system-ui, sans-serif' 
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-accent)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary)'}
              >
                Send
              </button>
            </form>
          </div>
        </div>

        <div className="mb-8">
          <div className="border border-gray-200 overflow-hidden" style={{ backgroundColor: 'var(--color-background-light, #ffffff)' }}>
            <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200 font-bold text-sm" style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable, system-ui, sans-serif' }}>
              <div className="col-span-4">Title</div>
              <div className="col-span-3">Genre</div>
              <div className="col-span-3">Topics</div>
              <div className="col-span-2">Rating</div>
            </div>
            
            {sampleBooks.map((book) => (
              <div
                key={book.id}
                onClick={() => handleBookClick(book)}
                className="grid grid-cols-12 gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors items-start cursor-pointer"
              >
                <div className="col-span-4 font-medium" style={{ fontFamily: 'Satoshi-Medium, Satoshi-Variable, system-ui, sans-serif' }}>
                  {book.title}
                </div>
                <div className="col-span-3 text-sm flex flex-wrap gap-1" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  {book.genres.map((genre, index) => {
                    const tagStyle = getTagColor(genre);
                    return (
                      <span 
                        key={index} 
                        className="px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap border"
                        style={{
                          backgroundColor: tagStyle.bg,
                          color: tagStyle.text,
                          borderColor: 'var(--color-secondary)'
                        } as React.CSSProperties}
                      >
                        {genre}
                      </span>
                    );
                  })}
                </div>
                <div className="col-span-3 text-sm flex flex-wrap gap-1" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  {book.topics.map((topic, index) => {
                    const tagStyle = getTagColor(topic);
                    return (
                      <span 
                        key={index} 
                        className="px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap border"
                        style={{
                          backgroundColor: tagStyle.bg,
                          color: tagStyle.text,
                          borderColor: 'var(--color-secondary)'
                        } as React.CSSProperties}
                      >
                        {topic}
                      </span>
                    );
                  })}
                </div>
                <div className="col-span-2 text-yellow-500 flex items-center" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  {renderStars(book.rating)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full mb-4">
          <hr style={{ borderColor: 'var(--color-border)' }} />
        </div>

        <Footer />
      </main>

      <BookDetailPanel
        book={selectedBook}
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
        getTagColor={getTagColor}
        renderStars={renderStars}
      />
    </div>
  );
}