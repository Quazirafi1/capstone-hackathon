'use client'

import React, { useRef, useState } from 'react';
import Column from '@/app/ui/sortable_list/column';
// import 'bootstrap/dist/css/bootstrap.css';
import { Person, Columns } from '@/app/ui/types'; // Assuming types.ts is in the same directory

export default function SortList() {
  const [columns, setColumns] = useState<Columns>({
    left: [
      { id: 1, name: 'John Doe', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', sets: '3x10' },
      { id: 3, name: 'Adam Smith', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', sets: '3x10' },
    ],
    right: [
      { id: 2, name: 'Max Walters', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', sets: '3x10' },
      { id: 4, name: 'Tom Johnson', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', sets: '3x10' },
    ]
  });

  const dragPerson = useRef<{ index: number; column: string }>({ index: -1, column: '' });
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleDragStart = (index: number, column: string) => {
    dragPerson.current = { index, column };
    setIsDragging(true);
  };

  const getDropIndex = (e: React.DragEvent, list: Person[]): number => {
    const target = e.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    const offsetY = e.clientY - rect.top;
    return offsetY > rect.height / 2 ? list.findIndex(p => p.id === parseInt(target.id)) + 1 : list.findIndex(p => p.id === parseInt(target.id));
  };

  const handleDrop = (e: React.DragEvent, targetColumn: string) => {
    const dropIndex = getDropIndex(e, columns[targetColumn]);
    const sourceIndex = dragPerson.current.index;
    const sourceColumn = dragPerson.current.column;

    if (targetColumn === sourceColumn && dropIndex === sourceIndex) {
      return;
    }

    const sourceItems = [...columns[sourceColumn]];
    const targetItems = targetColumn === sourceColumn ? sourceItems : [...columns[targetColumn]];
    const [item] = sourceItems.splice(sourceIndex, 1);
    targetItems.splice(dropIndex, 0, item);

    setColumns(prev => ({
      ...prev,
      [sourceColumn]: sourceItems,
      [targetColumn]: targetItems
    }));

    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  return (
    <main className="container mt-5">
      <h1 className="text-center mb-4">Drag and Sort Participants</h1>
      <div className="row">
        {Object.entries(columns).map(([key, list]) => (
          <Column
            key={key}
            columnKey={key}
            list={list}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
            handleDragStart={handleDragStart}
            isDragging={isDragging}
          />
        ))}
      </div>
    </main>
  );
}
