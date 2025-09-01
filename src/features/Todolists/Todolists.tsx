import { useAppSelector } from "@/common/hooks/useAppSelector";
import { selectTasks } from "@/common/utils/tasks-selector";
import { selectTodolists } from "@/common/utils/todolists-selector";
import { TaskType, Todolist } from "@/features/Todolists/Todolist/Todolist";

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists);
  const tasks = useAppSelector(selectTasks);

  //todolist

  return (
    <div className="todolists-container">
      {todolists.map((todolist) => {
        let filteredTasks = tasks[todolist.id];
        if (todolist.filter === "active") {
          filteredTasks = filteredTasks.filter(
            (task: TaskType) => task.isDone === false
          );
        } else if (todolist.filter === "completed") {
          filteredTasks = filteredTasks.filter(
            (task: TaskType) => task.isDone === true
          );
        }
        return (
          <Todolist
            key={todolist.id}
            //   title={todolist.title}
            //   filter={todolist.filter}
            //   todolistId={todolist.id}
            todolist={todolist}
            tasks={filteredTasks}
            // removeTask={removeTask}
            // changeFilter={changeFilter}
            // addTask={addTask}
            // changeTaskStatus={changeTaskStatus}
            // deleteTodolist={deleteTodolist}
            // changeTaskTitle={changeTaskTitle}
            // changeTodolistTitle={changeTodolistTitle}
          />
        );
      })}
    </div>
  );
};
