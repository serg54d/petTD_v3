// import { AddItemForm } from "@/common/components/AddItemForm";
import { AddItemForm } from "@/common/components";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { todolistsApi } from "@/features/Todolists/api/requests/todolistsApi";
import { addTodolist } from "@/features/Todolists/model/reducers/todolists-reducer";

import { Todolists } from "@/features/Todolists/Todolists";

export const AppMain = () => {
  const dispatch = useAppDispatch();

  const addTodolistHandler = async (title: string) => {
    try {
      const response = await todolistsApi.createTodolist(title);

      if (response.data.resultCode === 0) {
        dispatch(
          addTodolist({
            title: response.data.data.item.title,
            id: response.data.data.item.id,
          })
        );
      } else {
        console.error("Error creating todolist:", response.data.messages);
      }
    } catch (error) {
      console.error("Failed to create todolist:", error);
    }
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
