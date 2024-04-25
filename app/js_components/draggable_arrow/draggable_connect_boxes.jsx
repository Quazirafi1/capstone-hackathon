import React, { useRef, useState } from "react";
import Xarrow from "react-xarrows";
import Draggable from "react-draggable";
import 'bootstrap/dist/css/bootstrap.min.css';

import "./styles.css";


const connectPointStyle = {
  position: "absolute",
  width: 15,
  height: 15,
  borderRadius: "50%",
  background: "black",
  cursor: "pointer",
  zIndex: 1000
};

const connectPointOffset = {
  left: { left: 0, top: "50%", transform: "translate(-50%, -50%)" },
  right: { left: "100%", top: "50%", transform: "translate(-50%, -50%)" },
  top: { left: "50%", top: 0, transform: "translate(-50%, -50%)" },
  bottom: { left: "50%", top: "100%", transform: "translate(-50%, -50%)" }
};


const ConnectPointsWrapper = ({ boxId, handler, boxRef }) => {
  const ref1 = useRef();
  const [position, setPosition] = useState({});
  const [beingDragged, setBeingDragged] = useState(false);

  return (
    <React.Fragment>
      <div
        className="connectPoint"
        style={{
          ...connectPointStyle,
          ...connectPointOffset[handler],
          ...position
        }}
        draggable
        onMouseDown={e => e.stopPropagation()}
        onDragStart={e => {
          setBeingDragged(true);
          e.dataTransfer.setData("arrow", boxId);
        }}
        onDrag={e => {
          if (!boxRef.current) {
            console.log("boxRef is not available.");
            return;
          }
          const rect = boxRef.current.getBoundingClientRect();
          setPosition({
            position: "fixed",
            left: e.clientX - rect.left,
            top: e.clientY - rect.top,
            transform: "none",
            opacity: 0
          });
        }}        
        ref={ref1}
        onDragEnd={e => {
          setPosition({});
          setBeingDragged(false);
          e.dataTransfer.clearData(); // Ensure data is cleared after drag
        }}
      />
      {beingDragged && <Xarrow start={boxId} end={ref1.current} />}
    </React.Fragment>
  );
};


const boxStyle = {
  border: "1px solid black",
  position: "relative",
  padding: "20px 10px"
};

const Box = ({ text, handlers, addArrow, boxId }) => {
  const boxRef = useRef(); // This ref should be attached to the box div
  const dragRef = useRef(); // This ref is specifically for the Draggable component

  return (
    <Draggable nodeRef={dragRef}>
      <div
        id={boxId}
        ref={boxRef}  // Ensure this ref is attached to the actual box div
        style={boxStyle}
        onDragOver={e => e.preventDefault()}
        onDrop={e => {
          const arrowData = e.dataTransfer.getData("arrow");
          if (arrowData && arrowData !== boxId) {
            const refs = { start: arrowData, end: boxId };
            addArrow(refs);
          }
        }}
      >
        {text}
        {handlers.map(handler => (
          <ConnectPointsWrapper key={`${boxId}-${handler}`} {...{ boxId, handler, boxRef }} />
        ))}
      </div>
    </Draggable>
  );
};



const App = () => {
  const [arrows, setArrows] = useState([]);

  const rowData = [
    ["dataC11", "dataC21", "dataC31"],
    ["dataC12", "dataC22", "dataC32"],
    ["dataC13", "dataC23", "dataC33"],
    ["dataC14", "dataC24", "dataC34"]
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center" }}>
      {rowData.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex", justifyContent: "space-evenly", width: "100%" }}>
          {row.map((cell, colIndex) => (
            <Box
              key={`cell-${rowIndex}-${colIndex}`}
              text={cell}
              handlers={colIndex === 0 ? ["right"] : colIndex === row.length - 1 ? ["left"] : ["left", "right"]}
              addArrow={(arrow) => setArrows([...arrows, arrow])}
              boxId={`cell-${rowIndex}-${colIndex}`}
            />
          ))}
        </div>
      ))}
      {arrows.map((arrow, index) => (
        <Xarrow
          start={arrow.start}
          end={arrow.end}
          key={index}
        />
      ))}
    </div>
  );
};


export default App;

