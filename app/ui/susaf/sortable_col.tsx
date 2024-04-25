import React from 'react';
import PersonCard from '../sortable_list/person-card';
import { Person } from '../types'; // Assuming types.ts is in the same directory

interface ColumnProps {
  columnKey: string;  // Renamed from 'key' to 'columnKey'
  list: Person[];
  handleDragOver: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent, columnKey: string) => void;
  handleDragStart: (index: number, column: string) => void;
  isDragging: boolean;
}

export function SortableColumn({ columnKey, list, handleDragOver, handleDrop, handleDragStart, isDragging }: ColumnProps){
  return (
    <div className="col w-[30%]"
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, columnKey)}
    >
      <h2>{columnKey.charAt(0).toUpperCase() + columnKey.slice(1)}</h2>
      {list.map((person, index) => (
        <PersonCard
          key={person.id}
          person={person}
          handleDragStart={handleDragStart}
          columnKey={columnKey}
          index={index}
          isDragging={isDragging}
        />
      ))}
    </div>
  );
};
