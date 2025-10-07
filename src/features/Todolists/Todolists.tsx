import { useAppSelector } from "@/common/hooks/useAppSelector";

import { TaskType, Todolist } from "@/features/Todolists/ui/Todolist/Todolist";

import { useEffect } from "react";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { selectTasks, setTasksTC } from "./model/reducers/tasks-slice";
import {
  fetchTodolistsTC,
  selectTodolists,
} from "./model/reducers/todolists-slice";
import { TaskStatus } from "./lib/enums";

export type Todolists = Todolist[];

export interface Todolist {
  id: string;
  title: string;
  addedDate: string;
  order: number;
}

export const Todolists = () => {
  const dispatch = useAppDispatch();
  const todolists = useAppSelector(selectTodolists);
  const tasks = useAppSelector(selectTasks);

  useEffect(() => {
    dispatch(fetchTodolistsTC()).then((action) => {
      // Проверяем, что запрос выполнен успешно
      if (fetchTodolistsTC.fulfilled.match(action)) {
        dispatch(setTasksTC());
      } else {
        // Если запрос завершился с ошибкой, не вызываем setTasksTC
        console.log("Todolists not loaded, skipping tasks fetch");
      }
    });
  }, [dispatch]);
  return (
    <div className="todolists-wrapper">
      {" "}
      {/* Новый враппер */}
      <div className="todolists-container">
        {" "}
        {/* Контейнер с inline-flex */}
        {todolists.map((todolist) => {
          let filteredTasks = tasks[todolist.id] || [];
          if (todolist.filter === "active") {
            filteredTasks = filteredTasks.filter(
              (task: TaskType) => task.isDone === TaskStatus.Active
            );
          } else if (todolist.filter === "completed") {
            filteredTasks = filteredTasks.filter(
              (task: TaskType) => task.isDone === TaskStatus.Completed
            );
          }
          return (
            <Todolist
              key={todolist.id}
              todolist={todolist}
              tasks={filteredTasks}
            />
          );
        })}
      </div>
    </div>
  );
};
