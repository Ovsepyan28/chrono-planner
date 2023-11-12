'use client';

import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { Input, DatePicker, Form, Button } from 'antd';

import type { DateRange, FormValue, Note, Notes } from '@/types';
import type { RangePickerProps } from 'antd/es/date-picker';

import { NotesList } from '../NotesList';

import { hasInNotes } from '@/utils/hasInNotes';
import { getNearestUnavailable } from '@/utils/getNearestUnavailable';
import { getSavedNotes } from '@/utils/getSavedNotes';

import styles from './index.module.css';

const { RangePicker } = DatePicker;

export const MainPage: React.FC = () => {
  const [selected, setSelected] = useState<DateRange>([null, null]);
  const [limits, setLimits] = useState<DateRange>([null, null]);
  const [notes, setNotes] = useState<Notes>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    setNotes(getSavedNotes());
  }, []);

  // useEffect(() => {
  //
  // }, [notes]);

  const disabledDate: RangePickerProps['disabledDate'] = (cur) => {
    if (selected[0] || selected[1]) {
      const leftCut = (limits[1] && !cur.startOf('d').isBefore(dayjs(limits[1]))) ?? false;
      const rightCut = (limits[0] && !cur.startOf('d').isAfter(dayjs(limits[0]))) ?? false;
      return leftCut || rightCut;
    }

    // Не выбраны даты
    return notes.some((note) => hasInNotes(cur, note));
  };

  const onFinish = (value: FormValue) => {
    const newNote: Note = {
      key: uuidv4(),
      text: value.text.trim(),
      start: value.dates[0].startOf('d').valueOf(),
      end: value.dates[1].startOf('d').valueOf(),
    };

    setLimits([null, null]);
    setSelected([null, null]);
    setNotes((prev) => {
      const notes = [...prev, newNote];
      localStorage.setItem('notes', JSON.stringify(notes));
      return notes;
    });
    form.resetFields();
  };

  const handleSelect = (values: DateRange | null) => {
    if (!values) return;
    const nearestUnavailable = getNearestUnavailable(values, notes);
    setSelected(values);
    setLimits(nearestUnavailable);
  };

  const handleDelete = (key: string) => {
    setNotes((prev) => {
      const notes = prev.filter((note) => note.key !== key);
      localStorage.setItem('notes', JSON.stringify(notes));
      return notes;
    });
  };

  return (
    <div className={styles.mainPage}>
      <div className={styles.sider}>
        <Form onFinish={onFinish} form={form} layout="vertical">
          <Form.Item
            label="Наименование занятия"
            name="text"
            rules={[{ required: true, message: 'Пожалуйста, введите наименование занятия!' }]}
          >
            <Input placeholder="Наименование занятия" />
          </Form.Item>
          <Form.Item
            label="Период проведения занятия"
            name="dates"
            rules={[{ required: true, message: 'Пожалуйста, выберите даты!' }]}
          >
            <RangePicker
              placeholder={['Дата начала', 'Дата окончания']}
              format="DD.MM.YYYY"
              disabledDate={disabledDate}
              onCalendarChange={handleSelect}
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles.submit}>
              Добавить запись
            </Button>
          </Form.Item>
        </Form>
      </div>
      <NotesList notes={notes} handleDelete={handleDelete} />
    </div>
  );
};
