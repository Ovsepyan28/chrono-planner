import dayjs, { Dayjs } from 'dayjs';

import { Note } from '@/types';

export const hasInNotes = (cur: Dayjs, note: Note): boolean => {
  return !(cur.startOf('d').isBefore(dayjs(note.start)) || cur.startOf('d').isAfter(dayjs(note.end)));
};
