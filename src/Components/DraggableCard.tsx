import { Draggable } from "@hello-pangea/dnd";
import React from "react";
import styled from "styled-components";

const Card = styled.div<{ isDragging: boolean }>`
  background-color: ${(props) =>
    props.isDragging ? "#74b9ff" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(15,15,15,0.05)" : ""};
  padding: 10px 10px;
  border-radius: 5px;
  margin-bottom: 5px;
`;

interface IDraggableCradProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

function DraggableCard({ toDoId, toDoText, index }: IDraggableCradProps) {
  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
}
// 불필요한 렌더링을 방지하기 위해 memo 사용
export default React.memo(DraggableCard);
