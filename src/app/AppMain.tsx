// import { AddItemForm } from "@/common/components/AddItemForm";
import { AddItemForm } from "@/common/components";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { todolistsApi } from "@/features/Todolists/api/requests/todolistsApi";
import { addTodolistTC } from "@/features/Todolists/model/reducers/todolists-slice";

import { Todolists } from "@/features/Todolists/Todolists";

export const AppMain = () => {
  const dispatch = useAppDispatch();

  const addTodolistHandler = (title: string) => {
    dispatch(addTodolistTC({title, }));
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
