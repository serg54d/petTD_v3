import { TasksStateType } from "@/app/App";
import { RootState } from "@/app/store";

// (state) => state.tasks;

export const selectTasks = (state: RootState): TasksStateType => state.tasks;
