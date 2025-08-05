import { beforeEach, expect, test } from "vitest";
import type { TasksStateType } from "../App";
import { addTodolistAC, deleteTodolistAC } from "./todolists-reducer";
import { v1 } from "uuid";
import { tasksReducer } from "./tasks-reducer";

let startState: TasksStateType = {};

beforeEach(() => {
  startState = {
    todolistId1: [
      { id: "1", text: "CSS", isDone: false },
      { id: "2", text: "JS", isDone: true },
      { id: "3", text: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", text: "bread", isDone: false },
      { id: "2", text: "milk", isDone: true },
      { id: "3", text: "tea", isDone: false },
    ],
  };
});


test("array should be created for new todolist", () => {
  const endState = tasksReducer(startState, addTodolistAC("New todolist", v1()));

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2");
  if (!newKey) {
    throw Error("New key should be added");
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test("property with todolistId should be deleted", () => {
  const endState = tasksReducer(startState, deleteTodolistAC("todolistId2"));

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).not.toBeDefined();
  // or
  expect(endState["todolistId2"]).toBeUndefined();
});