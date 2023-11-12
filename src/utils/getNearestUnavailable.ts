import dayjs from 'dayjs';

import { DateRange, Limit, Notes } from '@/types';

export const getNearestUnavailable = (values: DateRange, notes: Notes): DateRange => {
  let left: Limit = null;
  let right: Limit = null;

  const anyDate = values[0] || values[1];

  if (!anyDate) return [null, null];

  notes.forEach((note) => {
    // Находим ближайшее недоступное число слева
    if (dayjs(note.end).isBefore(anyDate.startOf('d'))) {
      if (left) {
        left = dayjs(note.end).isAfter(left) ? dayjs(note.end) : left;
      } else {
        left = dayjs(note.end);
      }
    }

    // Находим ближайшее недоступное число справа
    if (dayjs(note.start).isAfter(anyDate.startOf('d'))) {
      if (right) {
        right = dayjs(note.start).isBefore(right) ? dayjs(note.start) : right;
      } else {
        right = dayjs(note.start);
      }
    }
  });

  return [left, right];
};
