/**
 * Simple in-memory cache สำหรับ Notion API
 * ใช้ Bun's performance เพื่อ cache ข้อมูลชั่วคราว
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

class Cache {
  private store: Map<string, CacheEntry<any>>;

  constructor() {
    this.store = new Map();
  }

  set<T>(key: string, data: T, ttlSeconds: number = 3600): void {
    this.store.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlSeconds * 1000,
    });
  }

  get<T>(key: string): T | null {
    const entry = this.store.get(key);

    if (!entry) return null;

    const now = Date.now();
    const age = now - entry.timestamp;

    // ถ้าหมดอายุ ลบออก
    if (age > entry.ttl) {
      this.store.delete(key);
      return null;
    }

    return entry.data as T;
  }

  has(key: string): boolean {
    const data = this.get(key);
    return data !== null;
  }

  delete(key: string): void {
    this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
  }

  size(): number {
    return this.store.size;
  }

  // ลบ entries ที่หมดอายุ
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.store.entries()) {
      const age = now - entry.timestamp;
      if (age > entry.ttl) {
        this.store.delete(key);
      }
    }
  }
}

// Singleton instance
export const cache = new Cache();

// Auto cleanup ทุก 5 นาที
if (typeof setInterval !== 'undefined') {
  setInterval(
    () => {
      cache.cleanup();
    },
    5 * 60 * 1000
  );
}
