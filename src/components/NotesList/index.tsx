import { Note, Notes } from '@/types';
import { Popconfirm, Table } from 'antd';
import dayjs from 'dayjs';

import type { ColumnsType } from 'antd/es/table';

import styles from './index.module.css';

interface INotesList {
  notes: Notes;
  handleDelete: (key: string) => void;
}

export const NotesList: React.FC<INotesList> = ({ notes, handleDelete }) => {
  const columns: ColumnsType<Note> = [
    {
      title: 'Занятие',
      dataIndex: 'text',
      sorter: (a, b) => a.text.localeCompare(b.text),
      className: styles.text,
    },
    {
      title: 'Дата начала',
      dataIndex: 'start',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.start - b.start,
      width: 180,
      render: (date) => dayjs(date).format('DD.MM.YYYY'),
    },
    {
      title: 'Дата окончания',
      dataIndex: 'end',
      sorter: (a, b) => a.end - b.end,
      width: 180,
      render: (date) => dayjs(date).format('DD.MM.YYYY'),
    },
    {
      title: 'Операция',
      dataIndex: 'delete',
      render: (_, note) => (
        <Popconfirm title="Вы уверены?" onConfirm={() => handleDelete(note.key)}>
          <a>Удалить</a>
        </Popconfirm>
      ),
      width: 100,
      align: 'center',
    },
  ];

  return (
    <div className={styles.notesList}>
      <Table columns={columns} dataSource={notes} pagination={false} bordered />
    </div>
  );
};
