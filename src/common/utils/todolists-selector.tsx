import { TodolistType } from "../../app/AppWithRedux";
import { RootState } from "../../app/store";

export const selectTodolists = (state: RootState): TodolistType[] =>
  state.todolists;
