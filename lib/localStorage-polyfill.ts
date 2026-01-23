// localStorage polyfill for SSR
// This prevents "localStorage.getItem is not a function" errors during server-side rendering

if (typeof window === 'undefined') {
  // Server-side: Create a mock localStorage that doesn't throw errors
  const noop = () => {};
  const storage: { [key: string]: string } = {};

  (global as any).localStorage = {
    getItem: (key: string) => storage[key] || null,
    setItem: (key: string, value: string) => {
      storage[key] = value;
    },
    removeItem: (key: string) => {
      delete storage[key];
    },
    clear: () => {
      Object.keys(storage).forEach((key) => delete storage[key]);
    },
    get length() {
      return Object.keys(storage).length;
    },
    key: (index: number) => {
      const keys = Object.keys(storage);
      return keys[index] || null;
    },
  };
}
