import styled from "styled-components";

const CardWrapper = styled.div`

width: 300px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
  height: auto;
  display: flex;
  flex-direction: column;
  border: 2px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: white;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Circle = styled.div`
  width: 60px;
  height: 60px;
  border: 3px solid black;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlusIcon = styled.span`
  font-size: 32px;
  font-weight: bold;
  line-height: 1;
`;

function CreateBoard() {
  return (
    <CardWrapper>
      <Circle>
        <PlusIcon>+</PlusIcon>
      </Circle>
    </CardWrapper>
  );
}

export default CreateBoard;
