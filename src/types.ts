import type { Dayjs } from 'dayjs';

export type Note = { key: string; text: string; start: number; end: number };
export type FormValue = { text: string; dates: [Dayjs, Dayjs] };
export type Notes = Note[];
export type DateRange = [Dayjs | null, Dayjs | null];
export type Limit = Dayjs | null;
export type NotificationType = 'success' | 'info' | 'warning' | 'error';
