import { v1 } from "uuid";
import { AddItemForm } from "../common/components/AddItemForm";
import { useAppDispatch } from "../common/hooks/useAppDispatch";
import { addTodolistAC } from "../model/reducers/todolists-reducer";
import { Todolists } from "../features/todolist/Todolists";

export const AppMain = () => {
  const dispatch = useAppDispatch();
  const addTodolist = (title: string) => {
    const todolistId = v1();
    const action = addTodolistAC({ title: title, id: todolistId });
    dispatch(action);
  };
  return (
    <>
      <div className="app_add-todolist">
        <AddItemForm addItem={addTodolist} />
      </div>
      <Todolists />
    </>
  );
};
