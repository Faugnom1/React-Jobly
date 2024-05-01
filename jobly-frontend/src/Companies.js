import React from "react";
import { Link } from "react-router-dom";
import "./Companies.css";
import { Card, CardBody, CardTitle, ListGroup, ListGroupItem, } from "reactstrap";

function Companies({ companies } ){
        return (
            <div className="Menu">
                <section>
                  <Card>
                    <CardBody>
                      <CardTitle className="font-weight-bold text-center">Companies List</CardTitle>
                      <ListGroup className="">
                        {companies.map(company => (
                          <Link to={`/companies/${company.handle}`} key={company.handle}>
                            <ListGroupItem>{company.name}</ListGroupItem>
                            <ListGroupItem>{company.description}</ListGroupItem>
                          </Link>
                        ))}
                      </ListGroup>
                      {/* <Button color="primary" onClick={() => handleApply(job.id)}
                                  disabled={appliedJobs[job.id]}>
                                    {appliedJobs[job.id] ? 'Applied' : 'Apply'}
                                  </Button> */}
                    </CardBody>
                  </Card>
                </section>
            </div>
          );
        }


export default Companies;
