import { TasksStateType } from "@/app/AppWithRedux";
import { RootState } from "@/app/store";

// (state) => state.tasks;

export const selectTasks = (state: RootState): TasksStateType => state.tasks;
