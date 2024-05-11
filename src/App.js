import React, { useEffect, useState, useCallback, useRef } from "react";
import "./App.css";
import JobCards from "./components/JobCard";
import { getSampleJdJSON } from "./constants";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";

function App() {
  const [jobLists, setJobLists] = useState([]);
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

  return (
    <div className="App">
      <div className="heading">Weekday</div>
      <div>
        <JobCards jobLists={jobLists} cardElementRef={cardElementRef} />
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
