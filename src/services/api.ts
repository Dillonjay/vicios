/**
 * API Service
 * This file contains the methods for interacting with the API
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

/**
 * Generic fetch method with error handling
 */
const fetchWithErrorHandling = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};

/**
 * Example API methods
 */

export interface Album {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  releaseDate: string;
  tracks: Track[];
}

export interface Track {
  id: string;
  title: string;
  duration: number;
}

/**
 * Get album information
 */
export const getAlbumById = async (albumId: string): Promise<Album> => {
  return fetchWithErrorHandling<Album>(`/albums/${albumId}`);
};

/**
 * Submit contact form
 */
export const submitContactForm = async (formData: {
  name: string;
  email: string;
  message: string;
}): Promise<{ success: boolean; message: string }> => {
  return fetchWithErrorHandling<{ success: boolean; message: string }>(
    "/contact",
    {
      method: "POST",
      body: JSON.stringify(formData),
    }
  );
};
