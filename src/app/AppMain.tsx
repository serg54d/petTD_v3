import { AddItemForm } from "@/common/components/AddItemForm";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { addTodolist } from "@/features/Todolists/model/reducers/todolists-reducer";
import { Todolists } from "@/features/Todolists/Todolists";
import { nanoid } from "@reduxjs/toolkit";

export const AppMain = () => {
  const dispatch = useAppDispatch();

  const addTodolistHandler = (title: string) => {
    const todolistId = nanoid();
    console.log(todolistId);
    dispatch(addTodolist({ title, id: todolistId }));
  };

  return (
    <>
      <div className="app_add-todolist">
        <AddItemForm addItem={addTodolistHandler} />
      </div>
      <Todolists />
    </>
  );
};
