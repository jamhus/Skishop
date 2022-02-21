import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useState } from "react";

interface Props {
  options: string[];
  checked?: string[];
  onChange: (items: string[]) => void;
}
const CheckBoxGroup = ({ options, checked, onChange }: Props) => {
  const [checkedItems, setCheckedItems] = useState(checked || []);

  const handleChecked = (value: string) => {
    const currentIndex = checkedItems.findIndex((item) => item === value);
    let newChecked: string[] = [];
    if (currentIndex === -1) newChecked = [...checkedItems, value];
    else newChecked = checkedItems.filter((item) => item !== value);
    setCheckedItems(newChecked);
    onChange(newChecked);
  };

  return (
    <FormGroup>
      {options.map((option) => {
        return (
          <FormControlLabel
            control={<Checkbox 
                checked={checkedItems.indexOf(option)!== -1}
                onClick={()=> handleChecked(option)}
            />}
            label={option}
            key={option}
          />
        );
      })}
    </FormGroup>
  );
};

export default CheckBoxGroup;
