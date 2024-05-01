import React, { useState } from "react";
import "./Jobs.css";
import { Card, CardBody, CardTitle, CardText, ListGroup, Button } from "reactstrap";
import JoblyApi from './JoblyApi'
import { useUser } from './UserContext';

function Jobs({ jobs }){
  const [appliedJobs, setAppliedJobs] = useState({});
//   const { user } = useUser();
  const user = localStorage.getItem('username');

    const handleApply = async (jobId) => {
        if (appliedJobs[jobId]) return; 
        console.log(user)
        try {
            await JoblyApi.applyToJob(user, jobId);
            setAppliedJobs(prev => ({ ...prev, [jobId]: true }));
        } catch (error) {
            console.error('Failed to apply to job', error);
        }
    };

    return (
      <div className="Menu">
          <section>
              <Card>
                  <CardBody>
                      <CardTitle className="font-weight-bold text-center">Available Jobs</CardTitle>
                      <ListGroup>
                      {jobs.map((job) => (
                          <Card key={job.id} className="mb-3">
                              <CardBody>
                                  <CardTitle tag="h5">{job.title}</CardTitle>
                                  <CardText>Company: {job.companyName}</CardText>
                                  <CardText>Salary: {job.salary}</CardText>
                                  <CardText>Equity: {job.equity}</CardText>
                                  <Button color="primary" onClick={() => handleApply(job.id)}
                                  disabled={appliedJobs[job.id]}>
                                    {appliedJobs[job.id] ? 'Applied' : 'Apply'}
                                  </Button>
                              </CardBody>
                          </Card>
                      ))}
                      </ListGroup>
                  </CardBody>
              </Card>
          </section>
      </div>
  );
}


export default Jobs;
