import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import "./style.css";
import { Avatar } from "@mui/material";
import { currencySymbols } from "../../constants";

const referral = {
  backgroundColor: "#4843d9",
  color: "#fff",
};

const apply = {
  backgroundColor: "#54f0c4",
  color: "#0a1f19",
  display: "flex",
  alignItems: "center",
};

function JobCards(props) {
  const { jobLists } = props;
  const [viewMore, setViewMore] = useState([]);

  const handleViewMore = (e, id) => {
    if (viewMore.includes(id)) {
      setViewMore(viewMore.filter((curr) => curr !== id));
    } else {
      setViewMore([...viewMore, id]);
    }
  };
  // console.log(jobLists);

  return (
    <div className="job-container">
      {jobLists?.map((job, id) => (
        <Box sx={{ minWidth: 320, maxWidth: 400 }} key={job.jdUid}>
          <Card variant="outlined" className="p-4 rounded">
            <CardContent className="p-0">
              <div className="mb-3">
                <Chip
                  sx={{
                    p: 1,
                  }}
                  icon={<QueryBuilderIcon />}
                  variant="outlined"
                  label={`Posted ${(Math.random() * 30).toFixed(0)} day(s) ago`}
                  size="small"
                ></Chip>
              </div>

              <div className="flex-row gap-2 mb-4">
                <div>
                  <img src={job.logoUrl} alt="Logo" width="48" height="48" loading="lazy" />
                </div>
                <div className="flex-column gap-1 grow-1 bold">
                  <div className="gray-text">{job.companyName || ""}</div>
                  <div className="role-color capitalize">{job.jobRole || ""}</div>
                  <div className="black capitalize">{job.location || "India"}</div>
                </div>
              </div>
              <div className="mb-5 salary-text font-500 h-8">
                Estimated Salary: {currencySymbols[job.salaryCurrencyCode] || currencySymbols["INR"]}
                {job.minJdSalary || 0} - {job.maxJdSalary} LPA <CheckBoxIcon style={{ color: "#187a1d" }} />
              </div>
              <div className="black font-500 mb-3">About the company:</div>
              <div className="black font-600 mb-1">About us</div>
              <div className="black font-400 mb-3">
                {job.jobDetailsFromCompany.length <= 200 || viewMore.includes(id)
                  ? job.jobDetailsFromCompany
                  : job.jobDetailsFromCompany.substr(0, 200)}
                {!viewMore.includes(id) && job.jobDetailsFromCompany.length > 200 && (
                  <span
                    style={{ color: "rgb(0, 90, 156)", fontSize: "12px", cursor: "pointer" }}
                    onClick={(e) => {
                      handleViewMore(e, id);
                    }}
                  >
                    ...view more
                  </span>
                )}
                {viewMore.includes(id) && job.jobDetailsFromCompany.length > 200 && (
                  <span
                    style={{ color: "rgb(0, 90, 156)", fontSize: "12px", cursor: "pointer" }}
                    onClick={(e) => {
                      handleViewMore(e, id);
                    }}
                  >
                    ...show less
                  </span>
                )}
              </div>
              <div className="contact-header-color mb-1">Founder/Recruiter profiles:</div>
              <div className=" contact-color mb-3">Weekday Team</div>
              <div className="flex-column gap-1 mb-3">
                <div className="exp-color ">Minimum Experience</div>
                <div className="">
                  {job.minExp || 0} {job.minExp && job.minExp > 1 ? "years" : "year"}
                </div>
              </div>
            </CardContent>
            <div className="flex-column gap-2 ">
              <Button
                variant="contained"
                color="success"
                fullWidth
                className="text-none mb-3"
                style={apply}
                disableElevation
              >
                <div className="normal-case h-8">
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                    <path
                      d="M12.439 7.14766H10.379V2.34766C10.379 1.22766 9.77236 1.00099 9.03236 1.84099L8.49903 2.44766L3.9857 7.58099C3.3657 8.28099 3.6257 8.85432 4.55903 8.85432H6.61903V13.6543C6.61903 14.7743 7.2257 15.001 7.9657 14.161L8.49903 13.5543L13.0124 8.42099C13.6324 7.72099 13.3724 7.14766 12.439 7.14766Z"
                      fill="#ebba34"
                    ></path>
                  </svg>
                  Easy apply
                </div>
              </Button>
              <Button variant="contained" fullWidth style={referral} disableElevation>
                <Avatar sx={{ width: 24, height: 24 }} className="mr-2" />
                <Avatar sx={{ width: 24, height: 24 }} className="mr-2" />
                <span className="normal-case">Unlock referral asks</span>
              </Button>
            </div>
          </Card>
        </Box>
      ))}
    </div>
  );
}

export default JobCards;
