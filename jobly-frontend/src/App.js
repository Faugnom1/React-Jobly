import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import NavBar from "./NavBar";
import Companies from "./Companies";
import Jobs from "./Jobs";
import JoblyApi from "./JoblyApi";
import ShowCompanyJobs from "./ShowCompanyJobs";
import UserProfile from "./UserProfile";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import { UserProvider } from './UserContext'; 
// import { useUser } from './UserContext';

function App() {
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);

  // function logOut() {
  //   setUser(null);
  //   setToken(null);
  //   navigate('/');
  // }

  useEffect(() => {
    async function getAllCompanies() {
      try {
        let { companies } = await JoblyApi.request('companies');
        setCompanies(companies);
      } catch (error) {
        console.error('Failed to fetch companies', error);
      }
    }
    getAllCompanies();
  }, []);

  useEffect(() => {
    async function getAllJobs() {
      try {
        let { jobs } = await JoblyApi.request('jobs');
        setJobs(jobs);
      } catch (error) {
        console.error('Failed to fetch companies', error);
      }
    }
    getAllJobs();
  }, []);

  return (
    <div className="App">
      <Router>
        <UserProvider>
          <NavBar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/companies" element={<Companies companies={companies} />} />
              <Route path="/companies/:handle" element={<ShowCompanyJobs />} />
              <Route path="/jobs" element={<Jobs jobs={jobs} />} />
              <Route path="/jobs/:handle" element={<Jobs jobs={jobs} />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </main>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
