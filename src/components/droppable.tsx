import { useDroppable } from "@dnd-kit/core";
import * as React from "react";

const Droppable: React.FC<any> = (props) => {
  const { isOver, setNodeRef } = useDroppable({ id: props.id });
  const style = { opacity: isOver ? 1 : 0.5 };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
};

export default Droppable;
