import { useState, useEffect, useCallback } from "react";
import { Languages } from "../types";
import { getInitialLanguage, saveLanguagePreference } from "../utils/locale";

/**
 * Custom hook for managing application language
 * @returns Language state and setter function
 */
export const useLanguage = () => {
  const [language, setLanguage] = useState<Languages>(getInitialLanguage());

  // Update the language and save to localStorage
  const changeLanguage = useCallback((newLanguage: Languages) => {
    setLanguage(newLanguage);
    saveLanguagePreference(newLanguage);
  }, []);

  // Set up language on mount
  useEffect(() => {
    // Any additional setup needed for language
  }, []);

  return {
    language,
    changeLanguage,
  };
};
