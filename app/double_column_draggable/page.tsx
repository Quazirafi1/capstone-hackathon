'use client'

import React, { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

interface Person {
  id: number;
  name: string;
  content: string;
  sets: string;
}

interface Columns {
  [key: string]: Person[];
}

export default function Home() {
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
    const offsetY = e.clientY - rect.top; // Cursor position within the element
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
          <div key={key} className="col"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, key)}
          >
            <h2>{key.charAt(0).toUpperCase() + key.slice(1)}</h2>
            {list.map((person, index) => (
              <div key={person.id} id={person.id.toString()}
                className="d-flex align-items-center justify-content-between p-3 mb-2 bg-light border rounded"
                draggable
                onDragStart={() => handleDragStart(index, key)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, key)}
                style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
              >
                <div>
                  <h5 className="mb-0">{person.name}</h5>
                  <small>{person.content}</small>
                </div>
                <div>
                  <button className="btn btn-info btn-sm mx-1">Edit</button>
                  <button className="btn btn-danger btn-sm">Delete</button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}

