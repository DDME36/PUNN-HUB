export function calculateReadingTime(text: string): number {
  if (!text || typeof text !== 'string') return 1; // Default to 1 minute if no content

  const wordsPerMinute = 200; // Average reading speed
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes || 1; // Minimum 1 minute
}

export function formatReadingTime(minutes: number): string {
  if (minutes < 1) return 'น้อยกว่า 1 นาที';
  return `${minutes} นาที`;
}
