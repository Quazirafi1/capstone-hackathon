"use client"
import { useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
// Make sure to import the Bootstrap CSS in your project entry file (_app.js or _app.tsx)
// Example: import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
    const [people, setPeople] = useState([
      { id: 1, name: 'John Doe', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', sets: '3x10' },
      { id: 2, name: 'Max Walters', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', sets: '3x10' },
      { id: 3, name: 'Adam Smith', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', sets: '3x10' },
      { id: 4, name: 'Tom Johnson', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', sets: '3x10' },
    ]);
  
    const dragPerson = useRef<number>(0);
    const draggedOverPerson = useRef<number>(0);
    const [isDragging, setIsDragging] = useState<boolean>(false);
  
    function handleSort() {
      const peopleClone = [...people];
      const temp = peopleClone[dragPerson.current];
      peopleClone[dragPerson.current] = peopleClone[draggedOverPerson.current];
      peopleClone[draggedOverPerson.current] = temp;
      setPeople(peopleClone);
      setIsDragging(false); // Reset dragging state
    }

    return (
      <main className="container mt-5">
        <h1 className="text-center mb-4">List of Participants</h1>
        {people.map((person, index) => (
          <div key={person.id}
            className="d-flex align-items-center justify-content-between p-3 mb-2 bg-light border rounded"
            draggable
            onDragStart={() => { dragPerson.current = index; setIsDragging(true); }}
            onDragEnter={() => (draggedOverPerson.current = index)}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }} // Change cursor based on dragging state
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
      </main>
    );
  }
