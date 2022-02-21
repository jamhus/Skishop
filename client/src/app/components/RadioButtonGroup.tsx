import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";

interface Props {
    options: any[],
    onChange : (event: any) => void;
    selectedValue:string;
}
const RadioButtonsGroup = ({options, selectedValue, onChange}:Props) => {
  return (
    <FormControl component="fieldset">
            <RadioGroup onChange={onChange} value={selectedValue}>
              {options.map((option) => {
                return (
                  <FormControlLabel
                    value={option.value}
                    control={<Radio />}
                    label={option.label}
                    key={option.value}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
  );
};

export default RadioButtonsGroup;
