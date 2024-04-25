import React from "react";
import DraggableConnectors from "./draggable_connect_boxes";
import 'bootstrap/dist/css/bootstrap.min.css';

export default () => (
  <div>
    <div style={{ margin: 20, border: "1px solid gray", padding: 10 }}>
      <DraggableConnectors />
    </div>
  </div>
);
