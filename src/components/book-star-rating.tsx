export type BookStarRatingSize = 'card' | 'panel';

const DIM: Record<BookStarRatingSize, number> = {
  card: 18,
  panel: 24,
};

interface BookStarRatingProps {
  rating: number;
  size?: BookStarRatingSize;
  className?: string;
}

export function BookStarRating({ rating, size = 'card', className = '' }: BookStarRatingProps) {
  const d = DIM[size];
  return (
    <div className={`flex items-center gap-0.5 ${className}`} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          width={d}
          height={d}
          viewBox="0 0 24 24"
          fill={i < rating ? '#d97706' : 'none'}
          stroke={i < rating ? '#b45309' : '#9ca3af'}
          strokeWidth={2}
          strokeLinejoin="round"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}
