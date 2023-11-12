import { Notes } from '@/types';

export const getSavedNotes = (): Notes => {
  const jsonNotes = localStorage.getItem('notes');
  return (jsonNotes && JSON.parse(jsonNotes)) ?? [];
};
