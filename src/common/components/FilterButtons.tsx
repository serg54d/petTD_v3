import { CustomButton } from "@/common/components";

import { FilterValues } from "../enums/enums";

type FilterButtonsProps = {
  filter: FilterValues;
  onChangeFilter: (newFilter: FilterValues) => void;
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
        onClick={() => onChangeFilter(FilterValues.All)}
      >
        All
      </CustomButton>
      <CustomButton
        variant={filter === FilterValues.Active ? "contained" : "outlined"}
        size="small"
        onClick={() => onChangeFilter(FilterValues.Active)}
      >
        Active
      </CustomButton>
      <CustomButton
        variant={filter === FilterValues.Completed ? "contained" : "outlined"}
        size="small"
        onClick={() => onChangeFilter(FilterValues.Completed)}
      >
        Completed
      </CustomButton>
    </div>
  );
};
