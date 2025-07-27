import { CustomButton } from "./Button";
import { FilterValuesType } from "./App";

type FilterButtonsProps = {
  filter: FilterValuesType;
  onChangeFilter: (newFilter: FilterValuesType) => void;
};

export const FilterButtons = ({
  filter,
  onChangeFilter,
}: FilterButtonsProps) => {
  return (
    <div className="filters">
      <CustomButton
        variant={filter === "all" ? "contained" : "outlined"}
        size="small"
        onClick={() => onChangeFilter("all")}
      >
        All
      </CustomButton>
      <CustomButton
        variant={filter === "active" ? "contained" : "outlined"}
        size="small"
        onClick={() => onChangeFilter("active")}
      >
        Active
      </CustomButton>
      <CustomButton
        variant={filter === "completed" ? "contained" : "outlined"}
        size="small"
        onClick={() => onChangeFilter("completed")}
      >
        Completed
      </CustomButton>
    </div>
  );
};
