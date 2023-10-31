import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ItemsDropdown = ({ name, items, onChange, value, label }) => {
  return (
    <Box sx={{ width: 250 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name={name}
          value={value}
          label={label}
          onChange={onChange}
          sx={{
            "& .MuiInputBase-input": {
              // backgroundColor: "yourColorHere",
              borderColor: "#4C2B21",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#4C2B21", // Change this to the desired border color
            },
          }}
        >
          {items.map((item, index) => (
            <MenuItem value={item} key={index}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
export default ItemsDropdown;
