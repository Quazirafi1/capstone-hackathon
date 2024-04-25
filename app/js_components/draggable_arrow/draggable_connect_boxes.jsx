import React, { useRef, useState } from "react";
import Xarrow from "react-xarrows";
import Draggable from "react-draggable";
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
            return; // Exit the function if the ref isn't available
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
        }}
      />
      {beingDragged ? <Xarrow start={boxId} end={ref1} /> : null}
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



export default function App() {
  const [arrows, setArrows] = useState([]);
  const addArrow = ({ start, end }) => {
    setArrows([...arrows, { start, end }]);
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <Box
        text="col1"
        handlers={["right"]}  // Correctly passing as an array
        addArrow={addArrow}
        boxId="box2_1"
      />
      <Box
        text="col2"
        handlers={["left", "right"]}  // Correctly passing two handlers for two sides
        addArrow={addArrow}
        boxId="box2_2"
      />
      <Box
        text="col3"
        handlers={["left"]}  // Correctly passing as an array
        addArrow={addArrow}
        boxId="box2_3"
      />

      {arrows.map(ar => (
        <Xarrow
          start={ar.start}
          end={ar.end}
          key={ar.start + "-." + ar.start}
        />
      ))}
    </div>
  );
}