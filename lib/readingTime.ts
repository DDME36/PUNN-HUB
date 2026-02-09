export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200; // Average reading speed
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes;
}

export function formatReadingTime(minutes: number): string {
  if (minutes < 1) return "น้อยกว่า 1 นาที";
  return `${minutes} นาที`;
}
