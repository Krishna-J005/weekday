import React, { useState, useCallback, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import {
  ROLE_OPTIONS,
  MIN_BASE_PAY_OPTIONS,
  EXPERIENCE_OPTIONS,
  EMPLOYEE_COUNT,
  LOCATION_OPTIONS,
  TECH_STACK_OPTIONS,
} from "../../constants";
import "./style.css";

function JobFilter(props) {
  const { handleFilterChange } = props;
  const [filter, setFilter] = useState({
    companyName: "",
    location: [],
    jobRole: [],
    minExp: "",
    minJdSalary: "",
    employeeCount: [],
    techStack: [],
  });
  const isOptionEqualToValue = useCallback((option, value) => {
    if (value === null) {
      return true;
    } else return option === value;
  }, []);

  const handleCompanyNameChange = (e) => {
    e.preventDefault();
    setFilter({ ...filter, companyName: e.target.value });
  };

  useEffect(() => {
    handleFilterChange(filter);
  }, [filter]);

  console.log(filter);

  return (
    <div className="filter-container">
      <div className="field-container">
        <div className={filter.jobRole.length !== 0 ? "black" : "black  hidden"}>Roles</div>
        <Autocomplete
          fullWidth
          multiple
          value={filter.jobRole}
          onChange={(event, newValue) => {
            setFilter({ ...filter, jobRole: newValue });
          }}
          isOptionEqualToValue={isOptionEqualToValue}
          getOptionLabel={(option) =>
            option.length > 3 ? option[0].toUpperCase() + option.slice(1) : option.toUpperCase()
          }
          id="jobRole"
          options={ROLE_OPTIONS}
          renderInput={(params) => <TextField {...params} label="" placeholder="Roles" />}
        />
      </div>
      <div className="field-container">
        <div className={filter.employeeCount.length !== 0 ? "black " : "black  hidden"}>No Of Employees</div>
        <Autocomplete
          multiple
          fullWidth
          value={filter.employeeCount}
          isOptionEqualToValue={isOptionEqualToValue}
          onChange={(event, newValue) => {
            setFilter({ ...filter, employeeCount: newValue });
          }}
          id="employeeCount"
          options={EMPLOYEE_COUNT}
          renderInput={(params) => <TextField {...params} label="" placeholder="Number Of employees" />}
        />
      </div>
      <div className="field-container">
        <div className={filter.minExp !== "" ? "black " : "black  hidden"}>Experience</div>
        <Autocomplete
          fullWidth
          id="minExp"
          value={filter.minExp}
          isOptionEqualToValue={isOptionEqualToValue}
          onChange={(event, newValue) => {
            setFilter({ ...filter, minExp: newValue });
          }}
          options={EXPERIENCE_OPTIONS}
          renderInput={(params) => <TextField {...params} label="" placeholder="Experience" />}
        />
      </div>
      <div className="field-container">
        <div className={filter.location.length !== 0 ? "black " : "black  hidden"}>Remote</div>
        <Autocomplete
          fullWidth
          multiple
          value={filter.location}
          isOptionEqualToValue={isOptionEqualToValue}
          onChange={(event, newValue) => {
            setFilter({ ...filter, location: newValue });
          }}
          id="location"
          options={LOCATION_OPTIONS}
          getOptionLabel={(option) => option[0].toUpperCase() + option.slice(1)}
          renderInput={(params) => <TextField {...params} label="" placeholder="Remote" />}
        />
      </div>
      <div className="field-container">
        <div className={filter.minJdSalary !== "" ? "black " : "black  hidden"}>Min Base Pay</div>
        <Autocomplete
          fullWidth
          id="minJdSalary"
          value={filter.minJdSalary}
          isOptionEqualToValue={isOptionEqualToValue}
          onChange={(event, newValue) => {
            setFilter({ ...filter, minJdSalary: newValue });
          }}
          options={MIN_BASE_PAY_OPTIONS}
          renderInput={(params) => {
            const { inputProps } = params;
            inputProps.value = inputProps.value ? inputProps.value + "L" : null;
            return <TextField {...params} label="" placeholder="Minimum Base Pay Salary" />;
          }}
        />
      </div>
      <div className="field-container">
        <div className={filter.techStack.length !== 0 ? "black " : "black  hidden"}>Tech Stack</div>
        <Autocomplete
          multiple
          fullWidth
          id="combo-box-demo"
          value={filter.techStack}
          isOptionEqualToValue={isOptionEqualToValue}
          onChange={(event, newValue) => {
            setFilter({ ...filter, techStack: newValue });
          }}
          options={TECH_STACK_OPTIONS}
          renderInput={(params) => <TextField {...params} label="" placeholder="Tech stack" />}
        />
      </div>

      <div className="field-container">
        <div className={filter.companyName !== "" ? "black" : "black  hidden"}>Company Name</div>
        <TextField
          fullWidth
          id="outlined-basic"
          label=""
          variant="outlined"
          placeholder="Search Company Name"
          value={filter.companyName || ""}
          onChange={(e) => handleCompanyNameChange(e)}
        />
      </div>
    </div>
  );
}

export default JobFilter;
