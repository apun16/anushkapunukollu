export interface TagStyle {
  bg: string;
  text: string;
  border: string;
}

const defaultStyle: TagStyle = {
  bg: 'var(--color-light)',
  text: 'var(--color-primary)',
  border: 'var(--color-secondary)',
};

const colorMap: Record<string, TagStyle> = {
  Fiction: { bg: 'var(--color-secondary)', text: 'white', border: 'var(--color-secondary)' },
  'Non-Fiction': {
    bg: 'var(--color-light)',
    text: 'var(--color-primary)',
    border: 'var(--color-secondary)',
  },
  Essay: { bg: 'var(--color-accent)', text: 'var(--color-primary)', border: 'var(--color-accent)' },
  History: { bg: 'var(--color-accent)', text: 'var(--color-primary)', border: 'var(--color-accent)' },
  War: { bg: 'var(--color-accent)', text: 'var(--color-primary)', border: 'var(--color-accent)' },
  Business: { bg: 'var(--color-secondary)', text: 'white', border: 'var(--color-secondary)' },
  'Self-Help': { bg: 'var(--color-primary)', text: 'white', border: 'var(--color-primary)' },
  Psychology: { bg: 'var(--color-dark)', text: 'white', border: 'var(--color-dark)' },
  Classic: { bg: 'var(--color-dark)', text: 'white', border: 'var(--color-dark)' },
  Technology: { bg: 'var(--color-primary)', text: 'white', border: 'var(--color-primary)' },
  Autobiography: {
    bg: 'var(--color-accent)',
    text: 'var(--color-primary)',
    border: 'var(--color-accent)',
  },
  Philosophy: { bg: 'var(--color-dark)', text: 'white', border: 'var(--color-dark)' },
  Mathematics: { bg: 'var(--color-light)', text: 'var(--color-primary)', border: 'var(--color-secondary)' },
  Education: { bg: 'var(--color-secondary)', text: 'white', border: 'var(--color-secondary)' },
  Politics: { bg: 'var(--color-primary)', text: 'white', border: 'var(--color-primary)' },
  Colonialism: { bg: 'var(--color-secondary)', text: 'white', border: 'var(--color-secondary)' },
  Migration: { bg: 'var(--color-light)', text: 'var(--color-primary)', border: 'var(--color-secondary)' },
  Hope: { bg: 'var(--color-accent)', text: 'var(--color-primary)', border: 'var(--color-accent)' },
  Resilience: { bg: 'var(--color-secondary)', text: 'white', border: 'var(--color-secondary)' },
  Grief: { bg: 'var(--color-light)', text: 'var(--color-primary)', border: 'var(--color-secondary)' },
  Happiness: { bg: 'var(--color-accent)', text: 'var(--color-primary)', border: 'var(--color-accent)' },
  Growth: { bg: 'var(--color-primary)', text: 'white', border: 'var(--color-primary)' },
  Revenge: { bg: 'var(--color-dark)', text: 'white', border: 'var(--color-dark)' },
  Freedom: { bg: 'var(--color-light)', text: 'var(--color-primary)', border: 'var(--color-secondary)' },
  Meaning: { bg: 'var(--color-accent)', text: 'var(--color-primary)', border: 'var(--color-accent)' },
  Identity: { bg: 'var(--color-secondary)', text: 'white', border: 'var(--color-secondary)' },
  Humour: { bg: 'var(--color-accent)', text: 'var(--color-primary)', border: 'var(--color-accent)' },
  AI: { bg: 'var(--color-dark)', text: 'white', border: 'var(--color-dark)' },
  Power: { bg: 'var(--color-primary)', text: 'white', border: 'var(--color-primary)' },
  Ethics: { bg: 'var(--color-secondary)', text: 'white', border: 'var(--color-secondary)' },
  Culture: { bg: 'var(--color-secondary)', text: 'white', border: 'var(--color-secondary)' },
  Womenhood: { bg: 'var(--color-primary)', text: 'white', border: 'var(--color-primary)' },
  'Greek Mythology': {
    bg: 'var(--color-light)',
    text: 'var(--color-primary)',
    border: 'var(--color-secondary)',
  },
  Adventure: { bg: 'var(--color-accent)', text: 'var(--color-primary)', border: 'var(--color-accent)' },
  Bias: { bg: 'var(--color-dark)', text: 'white', border: 'var(--color-dark)' },
  'Decision Making': {
    bg: 'var(--color-accent)',
    text: 'var(--color-primary)',
    border: 'var(--color-accent)',
  },
};

export function getTagColor(tag: string): TagStyle {
  return colorMap[tag] ?? defaultStyle;
}
