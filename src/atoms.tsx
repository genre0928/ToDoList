import { atom } from "recoil";

export interface IToDo {
  id: number;
  text: string;
}

interface IToDoState {
  [key: string]: IToDo[];
}
// 제네릭 타입은 default에서 관리할 상태의 타입을 의미하는 것임
export const toDoState = atom<IToDoState>({
  key: "toDoState",
  default: {
    To_Do: [],
    Doing: [],
    Done: [],
  },
});
