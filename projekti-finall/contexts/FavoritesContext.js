import React, { createContext, useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FavoritesContext = createContext({
  favorites: [],
  toggleFavorite: () => {},
  clearFavorites: () => {},
  isFavorite: () => false,
  recentlyViewed: [],
  addRecentlyViewed: () => {},
});

const FAVORITES_KEY = 'favorites';
const RECENT_KEY = 'recentlyViewed';
const MAX_RECENT = 6;

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const storedFav = await AsyncStorage.getItem(FAVORITES_KEY);
        const storedRecent = await AsyncStorage.getItem(RECENT_KEY);
        if (storedFav) setFavorites(JSON.parse(storedFav));
        if (storedRecent) setRecentlyViewed(JSON.parse(storedRecent));
      } catch (error) {
        console.warn('FavoritesContext load error', error);
      }
    };

    load();
  }, []);

  const persistFavorites = useCallback(async (next) => {
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
    } catch (error) {
      console.warn('FavoritesContext persist error', error);
    }
  }, []);

  const persistRecent = useCallback(async (next) => {
    try {
      await AsyncStorage.setItem(RECENT_KEY, JSON.stringify(next));
    } catch (error) {
      console.warn('FavoritesContext persist recent error', error);
    }
  }, []);

  const toggleFavorite = useCallback((carId) => {
    setFavorites((prev) => {
      const next = prev.includes(carId) ? prev.filter((id) => id !== carId) : [...prev, carId];
      persistFavorites(next);
      return next;
    });
  }, [persistFavorites]);

  const isFavorite = useCallback((carId) => favorites.includes(carId), [favorites]);

  const clearFavorites = useCallback(() => {
    setFavorites([]);
    persistFavorites([]);
  }, [persistFavorites]);

  const addRecentlyViewed = useCallback((car) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((item) => item.id !== car.id);
      const next = [car, ...filtered].slice(0, MAX_RECENT);
      persistRecent(next);
      return next;
    });
  }, [persistRecent]);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, clearFavorites, isFavorite, recentlyViewed, addRecentlyViewed }}>
      {children}
    </FavoritesContext.Provider>
  );
};
