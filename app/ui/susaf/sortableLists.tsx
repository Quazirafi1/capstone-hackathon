'use client'

import React, { useRef, useState } from 'react';
import { SortableColumn } from '@/app/ui/susaf/sortable_col';
// import 'bootstrap/dist/css/bootstrap.css';
import { Person, Columns } from '@/app/ui/types'; // Assuming types.ts is in the same directory
import { ChosenImpact } from '@/app/lib/definitions';

export default function SortableLists({impacts} : {impacts: ChosenImpact[]}) {
  const immediate = []
  const enabling = []
  const structural = []

  impacts.forEach((impact) => {
    if(impact.temp_category=='immediate'){
      immediate.push({
        id: impact.id,
        name: impact.title,
        content: impact.description,
        sets: '3x10'
      })
    }
    if(impact.temp_category=='enabling'){
      enabling.push({
        id: impact.id,
        name: impact.title,
        content: impact.description,
        sets: '3x10'
      })
    }
    if(impact.temp_category=='structural'){
      structural.push({
        id: impact.id,
        name: impact.title,
        content: impact.description,
        sets: '3x10'
      })
    }
  })

  const [columns, setColumns] = useState({
    immediate: immediate,
    enabling: enabling,
    structural: structural,
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
    <div className="flex row w-full">
      {Object.entries(columns).map(([key, list]) => (
        <SortableColumn
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
  );
}
