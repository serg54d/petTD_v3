import { useAppSelector } from "@/common/hooks/useAppSelector";
import { selectTasks } from "@/common/utils/tasks-selector";
import { selectTodolists } from "@/common/utils/todolists-selector";
import { TaskType, Todolist } from "@/features/Todolists/ui/Todolist/Todolist";
import axios from "axios";
import { useEffect, useState } from "react";
import { todolistsApi } from "./api/requests/todolistsApi";
import { TodolistType } from "@/app/AppWithRedux";
import { tasksApi } from "./api/requests/tasksApi";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { addTask } from "./model/reducers/tasks-reducer";
import { addTodolist } from "./model/reducers/todolists-reducer";
import { TaskStatus } from "./lib/enums";
// import { getTasks } from "./model/requests";

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
    todolistsApi
      .getTodolists()
      .then((res) => {
        const todolistsData = res.data;

        // Добавляем тудулисты в стейт
        todolistsData.forEach((todolist) => {
          dispatch(addTodolist({ title: todolist.title, id: todolist.id }));
        });

        return todolistsData;
      })
      .then((todolistsData) => {
        // Загружаем задачи для каждого тудулиста
        todolistsData.forEach((todolist) => {
          tasksApi
            .getTasks(todolist.id)
            .then((res) => {
              const tasksData = res.data.items;

              // Добавляем каждую задачу в стейт
              tasksData.forEach((task: any) => {
                dispatch(
                  addTask({
                    todolistId: todolist.id,
                    taskId: task.id,
                    text: task.title,
                    status:
                      task.status === 1
                        ? TaskStatus.Completed
                        : TaskStatus.Active,
                  })
                );
              });
            })
            .catch((error) => {
              console.error(
                `Failed to load tasks for todolist ${todolist.id}:`,
                error
              );
            });
        });
      })
      .catch((error) => {
        console.error("Failed to load todolists:", error);
      });
  }, [dispatch]);

  return (
    <div className="todolists-container">
      {todolists.map((todolist) => {
        let filteredTasks = tasks[todolist.id];
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
  );
};
