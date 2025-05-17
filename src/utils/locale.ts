import { Languages } from "../types";

/**
 * Locale utility functions for managing language settings
 */

/**
 * Get the browser's preferred language
 * @returns The detected language or default language
 */
export const detectBrowserLanguage = (): Languages => {
  const browserLang = navigator.language.toLowerCase();

  if (browserLang.startsWith("es")) {
    return Languages.ES;
  }

  // Default to English
  return Languages.EN;
};

/**
 * Save the user's language preference to localStorage
 * @param language The language to save
 */
export const saveLanguagePreference = (language: Languages): void => {
  try {
    localStorage.setItem("vicios_language", language);
  } catch (error) {
    console.error("Error saving language preference:", error);
  }
};

/**
 * Load the user's language preference from localStorage
 * @returns The saved language preference or null if none exists
 */
export const loadLanguagePreference = (): Languages | null => {
  try {
    const savedLanguage = localStorage.getItem(
      "vicios_language"
    ) as Languages | null;
    return savedLanguage;
  } catch (error) {
    console.error("Error loading language preference:", error);
    return null;
  }
};

/**
 * Get the initial language based on saved preference or browser language
 * @returns The language to use
 */
export const getInitialLanguage = (): Languages => {
  const savedLanguage = loadLanguagePreference();
  if (savedLanguage) {
    return savedLanguage;
  }

  return detectBrowserLanguage();
};
