import React, { useEffect, useState, useCallback, useRef } from "react";
import "./App.css";
import JobFilter from "./components/JobFilter";
import JobCards from "./components/JobCard";
import { getSampleJdJSON } from "./constants";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";

function App() {
  const [jobLists, setJobLists] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const filter = useRef({});
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const id = setTimeout(() => {
      const data = getSampleJdJSON();
      setJobLists([...jobLists, ...data]);
      setLoading(false);
    }, 1000);
    return () => {
      clearTimeout(id);
    };
  }, [pageNumber]);

  useEffect(() => {
    handleFilterChange(filter.current);
  }, [jobLists.length]);

  const observer = useRef();

  const cardElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [pageNumber, loading],
  );

  const handleFilterChange = (value) => {
    filter.current = value;
    const { companyName, location, jobRole, minExp, minJdSalary } = value;

    let jobListsData = [...jobLists];

    // Filter by companyName
    if (companyName && companyName.trim() !== "") {
      jobListsData = jobListsData.filter((job) => job.companyName.toLowerCase().includes(companyName.toLowerCase()));
    }

    // Filter by minExp
    if (minExp !== null && minExp !== "") {
      jobListsData = jobListsData.filter((job) => (job.minExp ? job.minExp >= +minExp : false));
    }

    // Filter by minJdSalary
    if (minJdSalary !== null && minJdSalary !== "") {
      jobListsData = jobListsData.filter((job) =>
        job.minJdSalary ? job.minJdSalary >= +minJdSalary : +minJdSalary <= job.maxJdSalary,
      );
    }

    // Filter by jobRole
    if (jobRole && jobRole.length > 0) {
      jobListsData = jobListsData.filter((job) => jobRole.includes(job.jobRole));
    }

    // Filter by location
    if (location && location.length > 0) {
      jobListsData = jobListsData.filter((job) => {
        let ans = false;
        if (location.includes("remote")) {
          ans = job.location === "remote";
        }
        if (!location.includes("remote")) {
          ans = ans || job.location !== "remote";
        }
        return ans;
      });
    }

    setFilteredData(jobListsData);
  };

  return (
    <div className="App">
      <div className="heading">Weekday</div>
      <div>
        <JobFilter handleFilterChange={handleFilterChange} />
        <JobCards jobLists={filteredData} cardElementRef={cardElementRef} />
        <Box sx={{ height: 50, display: "flex", justifyContent: "center" }}>
          <Fade
            in={loading}
            style={{
              transitionDelay: loading ? "800ms" : "0ms",
            }}
            unmountOnExit
          >
            <CircularProgress />
          </Fade>
        </Box>
      </div>
    </div>
  );
}

export default App;
