import { Draggable } from "@hello-pangea/dnd";
import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IToDoState, localStorageKey, toDoState } from "../atoms";

const Wrapper = styled.div`
  position: relative;
`;

const Card = styled.div<{ $isDragging: boolean }>`
  background-color: ${(props) =>
    props.$isDragging ? "#74b9ff" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.$isDragging ? "0px 2px 5px rgba(15,15,15,0.05)" : ""};
  padding: 10px 10px;
  border-radius: 5px;
  margin-bottom: 5px;
`;

interface IDraggableCradProps {
  toDoId: number;
  toDoText: string;
  index: number;
  boardId: string;
}

const DeleteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  border: none;
  background-color: transparent;
  &:hover {
    color: rgba(0, 0, 0, 1);
    transition: 0.3s ease-in-out;
  }
`;

function DraggableCard({
  toDoId,
  toDoText,
  index,
  boardId,
}: IDraggableCradProps) {
  const setToDos = useSetRecoilState(toDoState);
  const onDeleteCard = () => {
    let check = confirm("정말 삭제하시겠습니까?");

    if (!check) return;
    setToDos((allBoards: IToDoState) => {
      const boardCopy = [...allBoards[boardId]];
      boardCopy.splice(index, 1);
      const newState = {
        ...allBoards,
        [boardId]: boardCopy,
      };
      return newState;
    });
  };
  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {(magic, snapshot) => (
        <Wrapper>
          <Card
            $isDragging={snapshot.isDragging}
            ref={magic.innerRef}
            {...magic.dragHandleProps}
            {...magic.draggableProps}
          >
            {toDoText}
            <DeleteButton onClick={onDeleteCard}>X</DeleteButton>
          </Card>
        </Wrapper>
      )}
    </Draggable>
  );
}
// 불필요한 렌더링을 방지하기 위해 memo 사용
export default React.memo(DraggableCard);
