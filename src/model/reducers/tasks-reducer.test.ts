import { beforeEach, expect, test } from "vitest";
import { addTodolistAC, deleteTodolistAC } from "./todolists-reducer";
import { v1 } from "uuid";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from "./tasks-reducer";
import { TasksStateType } from "../../app/AppWithRedux";

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
  const endState = tasksReducer(
    startState,
    addTodolistAC({ title: "New todolist", id: v1() })
  );

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

test("correct task should be deleted", () => {
  const endState = tasksReducer(
    startState,
    removeTaskAC({ todolistId: "todolistId2", taskId: "2" })
  );

  expect(endState).toEqual({
    todolistId1: [
      { id: "1", text: "CSS", isDone: false },
      { id: "2", text: "JS", isDone: true },
      { id: "3", text: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", text: "bread", isDone: false },
      { id: "3", text: "tea", isDone: false },
    ],
  });
});

test("correct task should be created at correct array", () => {
  const endState = tasksReducer(
    startState,
    addTaskAC({ todolistId: "todolistId2", text: "juice", taskId: v1() })
  );

  expect(endState.todolistId1.length).toBe(3);
  expect(endState.todolistId2.length).toBe(4);
  expect(endState.todolistId2[0].id).toBeDefined();
  expect(endState.todolistId2[0].text).toBe("juice");
  expect(endState.todolistId2[0].isDone).toBe(false);
});

test("correct task should change its status", () => {
  const endState = tasksReducer(
    startState,
    changeTaskStatusAC({
      todolistId: "todolistId2",
      taskId: "3",
      status: true,
    })
  );
  expect(endState.todolistId2[2].isDone).toBeTruthy(); // из false в true произошло
  //   не изменились другие
  expect(endState.todolistId2[0].isDone).toBeFalsy();
  expect(endState.todolistId2[1].isDone).toBeTruthy();
});

test("correct task should change its title", () => {
  const endState = tasksReducer(
    startState,
    changeTaskTitleAC({ todolistId: "todolistId1", taskId: "2", title: "TS" })
  );

  expect(endState.todolistId1[1].text).toBe("TS");
});
