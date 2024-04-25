import React from 'react';
import { Person } from '../types'; // Assuming types.ts is in the same directory

interface PersonCardProps {
  person: Person;
  handleDragStart: (index: number, column: string) => void;
  columnKey: string;
  index: number;
  isDragging: boolean;
}

const PersonCard: React.FC<PersonCardProps> = ({ person, handleDragStart, columnKey, index, isDragging }) => {
  return (
    <div key={person.id} id={person.id.toString()}
      className="d-flex align-items-center justify-content-between p-3 mb-2 bg-light border rounded"
      draggable
      onDragStart={() => handleDragStart(index, columnKey)}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      <div>
        <h5 className="mb-0">{person.name}</h5>
        <small>{person.content}</small>
      </div>
      {/* <div>
        <button className="btn btn-info btn-sm mx-1">Edit</button>
        <button className="btn btn-danger btn-sm">Delete</button>
      </div> */}
    </div>
  );
};

export default PersonCard;
