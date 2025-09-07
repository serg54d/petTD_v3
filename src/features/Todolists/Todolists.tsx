import { useAppSelector } from "@/common/hooks/useAppSelector";
import { selectTasks } from "@/common/utils/tasks-selector";
import { selectTodolists } from "@/common/utils/todolists-selector";
import { TaskType, Todolist } from "@/features/Todolists/ui/Todolist/Todolist";

import { useEffect } from "react";
import { todolistsApi } from "./api/requests/todolistsApi";

import { tasksApi } from "./api/requests/tasksApi";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { addTask, setTasks } from "./model/reducers/tasks-slice";
import {
  addTodolist,
  fetchTodolistsTC,
} from "./model/reducers/todolists-slice";
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
    const loadData = async () => {
      try {
        // Используем thunk для загрузки тудулистов
        const todolistsResult = await dispatch(fetchTodolistsTC()).unwrap();

        if (todolistsResult?.todolists) {
          const todolistsData = todolistsResult.todolists;

          // Загружаем задачи для всех тудулистов
          const tasksPromises = todolistsData.map((todolist) =>
            tasksApi.getTasks(todolist.id).then((res) => ({
              todolistId: todolist.id,
              tasks: res.data.items,
            }))
          );

          const tasksResults = await Promise.all(tasksPromises);

          // Собираем все задачи в один массив
          const allTasks = tasksResults.flatMap((result) =>
            result.tasks.map((task) => ({
              ...task,
              todoListId: result.todolistId,
            }))
          );

          // Диспатчим все задачи одним действием
          dispatch(setTasks({ tasks: allTasks }));
        }
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    };

    loadData();
  }, [dispatch]);
  return (
    <div className="todolists-container">
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
  );
};
