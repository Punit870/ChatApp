import { create } from 'zustand';
export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || "light",
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);

    // Remove any previous theme-* class
    document.documentElement.classList.forEach((cls) => {
      if (cls.startsWith("theme-")) {
        document.documentElement.classList.remove(cls);
      }
    });

    // Add the new theme class
    document.documentElement.classList.add(`theme-${theme}`);

    set({ theme });
  },
}));
