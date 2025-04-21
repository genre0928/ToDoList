import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";
import { Wrapper } from "./Board";

const AddButton = styled.button`
  border: none;
  height: 100%;
  background: none;
  color: rgba(0, 0, 0, 1);
  font-size: 32px;
  font-weight: bold;
  line-height: 1;
  cursor: pointer;
  &:hover {
    color: rgba(0, 0, 0, 0.5);
    transition: color 0.3s ease-in-out;
  }
`;

function CreateBoard() {
  const setToDos = useSetRecoilState(toDoState);
  const AddCard = () => {
    const newBoardId = prompt("새 보드 이름을 입력하세요");
    if (!newBoardId) return;

    setToDos((allBoards) => {
      if (allBoards[newBoardId]) {
        alert("이미 존재하는 보드입니다.");
        return allBoards;
      }
      return {
        ...allBoards,
        [newBoardId]: [],
      };
    });
    console.log("추가한덩");
  };
  return (
    <Wrapper>
      <AddButton onClick={AddCard}>+</AddButton>
    </Wrapper>
  );
}

export default CreateBoard;
