import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from './JoblyApi';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

function ShowCompanyJobs() {
    const { handle } = useParams();
    const [jobs, setJobs] = useState([]);
  
    useEffect(() => {
      async function getCompanyAndJobs() {
        try {
          const company = await JoblyApi.getCompany(handle);
          setJobs(company.jobs); // Set jobs from the company's jobs array
        } catch (error) {
          console.error('Failed to fetch company or jobs', error);
        }
      }
      getCompanyAndJobs();
    }, [handle]);

    return (
      <section>
        {jobs.map((job) => (
          <Card key={job.id}>
            <CardBody>
              <CardTitle className="font-weight-bold text-center">
                {job.title}
              </CardTitle>
              <CardText className="font-italic">{job.companyHandle}</CardText>
              <p>
                <b>Salary:</b> {job.salary}
              </p>
              <p>
                <b>Equity:</b> {job.equity}
              </p>
            </CardBody>
          </Card>
        ))}
      </section>
    );
  }
  

export default ShowCompanyJobs;