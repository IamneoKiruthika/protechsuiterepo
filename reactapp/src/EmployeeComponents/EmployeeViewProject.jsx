import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./EmployeeNavbar"; // Update the import path as per your file structure
import API_BASE_URL from "../apiConfig";
import "./EmployeeViewProject.css"; // Update the import path as per your file structure

const EmployeeViewProject = () => {
  const navigate = useNavigate();
  const [availableProjects, setAvailableProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showInfoPopup, setShowInfoPopup] = useState(false);

  const fetchAvailableProjects = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/projects`);
      if (res.status === 200) {
        setAvailableProjects(res.data);
      } else {
        navigate("/error");
      }
    } catch (error) {
      console.log(error + "error");
      navigate("/error");
    }
  };

  useEffect(() => {
    fetchAvailableProjects();
  }, []);

  const handleViewMoreInfo = (project) => {
    setSelectedProject(project);
    setShowInfoPopup(true);
  };

  const closeInfoPopup = () => {
    setSelectedProject(null);
    setShowInfoPopup(false);
  };

  return (
    <div id="parent">
      <Navbar />
      <div id="projectHomeBody" className={showInfoPopup ? "blur" : ""}>
        <h1>Projects</h1>
        <table className="project-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Frontend Tech Stack</th>
              <th>Backend Tech Stack</th>
              <th>Database</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {availableProjects.length > 0 ? (
              availableProjects.map((project) => (
                <tr key={project._id}>
                  <td>{project.ProjectTitle}</td>
                  <td>{project.ProjectDescription}</td>
                  <td>{new Date(project.StartDate).toLocaleDateString()}</td>
                  <td>{new Date(project.EndDate).toLocaleDateString()}</td>
                  <td>{project.FrontEndTechStack}</td>
                  <td>{project.BackendTechStack}</td>
                  <td>{project.Database}</td>
                  <td>{project.Status}</td>
                  <td>
                    <button
                      onClick={() => handleViewMoreInfo(project)}
                      className="infoButtonPro"
                    >
                      View More Info
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="no-records-cell">
                  Oops! No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {showInfoPopup && selectedProject && (
        <div className="info-popup">
          <div className="info-content">
            <h2>Project Information</h2>
            <img
              src={selectedProject.CoverImage}
              alt="Cover"
              className="cover-image"
            />
            <p><strong>Title:</strong> {selectedProject.ProjectTitle}</p>
            <p><strong>Description:</strong> {selectedProject.ProjectDescription}</p>
            <p><strong>Start Date:</strong> {new Date(selectedProject.StartDate).toLocaleDateString()}</p>
            <p><strong>End Date:</strong> {new Date(selectedProject.EndDate).toLocaleDateString()}</p>
            <p><strong>Frontend Tech Stack:</strong> {selectedProject.FrontEndTechStack}</p>
            <p><strong>Backend Tech Stack:</strong> {selectedProject.BackendTechStack}</p>
            <p><strong>Database:</strong> {selectedProject.Database}</p>
            <p><strong>Status:</strong> {selectedProject.Status}</p>
            <button onClick={closeInfoPopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeViewProject;
