import { Droppable } from "@hello-pangea/dnd";
import DraggableCard from "./DraggableCard";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { IToDo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";

export const Wrapper = styled.div`
  width: 300px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
  height: auto;
  display: flex;
  flex-direction: column;
`;
interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
}

const Title = styled.h2`
  padding-top: 10px;
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

interface IAreaProps {
  $isDraggingOver: boolean;
  $isDraggingFromThis: boolean;
}

const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  input {
    border: none;
    width: 95%;
    outline: none;
    border-radius: 10px;
    padding: 4px 0 4px 8px;
  }
`;

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.$isDraggingOver
      ? "#def6e9"
      : props.$isDraggingFromThis
      ? "#b2bec3"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.5s ease-in-out;
  padding: 20px;
`;

interface IForm {
  toDo: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [...allBoards[boardId], newToDo],
      };
    });
    setValue("toDo", "");
  };
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={boardId == "완료" ? "" : ` ${boardId} 작성하기`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(magic, info) => (
          <Area
            $isDraggingOver={info.isDraggingOver}
            $isDraggingFromThis={Boolean(info.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard
                key={toDo.id}
                index={index}
                toDoId={toDo.id}
                toDoText={toDo.text}
                boardId={boardId}
              />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
