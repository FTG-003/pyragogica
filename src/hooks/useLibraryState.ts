import { useState, useCallback } from 'react';
import { Resource, Chapter } from '../data/libraryContent';

export interface LibraryState {
  searchTerm: string;
  selectedCategory: string;
  selectedContent: Resource | null;
  selectedChapter: Chapter | null;
  isLoading: boolean;
}

export const useLibraryState = () => {
  const [state, setState] = useState<LibraryState>({
    searchTerm: '',
    selectedCategory: 'all',
    selectedContent: null,
    selectedChapter: null,
    isLoading: false
  });

  const setSearchTerm = useCallback((searchTerm: string) => {
    setState(prev => ({ ...prev, searchTerm }));
  }, []);

  const setSelectedCategory = useCallback((selectedCategory: string) => {
    setState(prev => ({ ...prev, selectedCategory }));
  }, []);

  const setSelectedContent = useCallback((selectedContent: Resource | null) => {
    setState(prev => ({ ...prev, selectedContent, selectedChapter: null }));
  }, []);

  const setSelectedChapter = useCallback((selectedChapter: Chapter | null) => {
    setState(prev => ({ ...prev, selectedChapter }));
  }, []);

  const setIsLoading = useCallback((isLoading: boolean) => {
    setState(prev => ({ ...prev, isLoading }));
  }, []);

  const resetState = useCallback(() => {
    setState({
      searchTerm: '',
      selectedCategory: 'all',
      selectedContent: null,
      selectedChapter: null,
      isLoading: false
    });
  }, []);

  return {
    ...state,
    setSearchTerm,
    setSelectedCategory,
    setSelectedContent,
    setSelectedChapter,
    setIsLoading,
    resetState
  };
};