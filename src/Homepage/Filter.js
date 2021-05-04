import React, { useState } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  makeStyles,
  Menu,
} from "@material-ui/core";
import "../CSS Components/Filter.css";

import Trending from "@material-ui/icons/TrendingUp";
import Hot from "@material-ui/icons/Whatshot";
import Random from "@material-ui/icons/Casino";
import Recent from "@material-ui/icons/AccessTime";

const useStyles = makeStyles((theme) => ({
  root: {
    "&MuiPaper-root": {
      top: "14rem",
    },
  },
  form: {
    display: "flex",
    width: "20%",
  },

  menuPaper: {
    top: "10rem",
  },
}));

export default function Filter() {
  const classes = useStyles();
  const [value, setValue] = useState("Trending");

  const handleChange = (e) => setValue(e.target.value);

  return (
    <div>
      <FormControl size="small" className={classes.form}>
        <Select
          onChange={handleChange}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          MenuProps={{}}
          value={value}
        >
          <MenuItem
            style={{
              display: "flex",
              alignItems: "center",
            }}
            value={"Popular"}
          >
            <Hot />
            Popular
          </MenuItem>
          <MenuItem value={"Trending"}>
            <Trending />
            Trending
          </MenuItem>
          <MenuItem value={"Recent"}>
            <Recent />
            Recent
          </MenuItem>
          <MenuItem value={"Random"}>
            <Random />
            Random
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
