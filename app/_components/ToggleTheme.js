"use client"

import { useState } from "react";

import { FiSun, FiMoon } from "react-icons/fi";

export default function ToggleTheme({ initialTheme }) {
  const [theme, setTheme] = useState(initialTheme)

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    document.cookie = `theme=${next}; path=/; max-age=31536000`;
  }

  return (
    <button 
      onClick={toggle} 
      className="text-lg transition-transform duration-300 hover:scale-140 text-(--gray-text) z-30"
      aria-label="Toggle theme"
    >
     {theme === "light" ? <FiMoon /> : <FiSun />}
    </button>
  );
}