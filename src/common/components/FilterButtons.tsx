import { CustomButton } from "@/common/components";
import { FilterValuesType } from "@/app/AppWithRedux";
import { FilterValues } from "../enums/enums";

type FilterButtonsProps = {
  filter: FilterValues;
  onChangeFilter: (newFilter: FilterValuesType) => void;
};

export const FilterButtons = ({
  filter,
  onChangeFilter,
}: FilterButtonsProps) => {
  return (
    <div className="filters">
      <CustomButton
        variant={filter === FilterValues.All ? "contained" : "outlined"}
        size="small"
        onClick={() => onChangeFilter("all")}
      >
        All
      </CustomButton>
      <CustomButton
        variant={filter === FilterValues.Active ? "contained" : "outlined"}
        size="small"
        onClick={() => onChangeFilter("active")}
      >
        Active
      </CustomButton>
      <CustomButton
        variant={filter === FilterValues.Completed ? "contained" : "outlined"}
        size="small"
        onClick={() => onChangeFilter("completed")}
      >
        Completed
      </CustomButton>
    </div>
  );
};
