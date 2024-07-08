import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./ManagerNavbar"; // Update the import path as per your file structure
import API_BASE_URL from "../apiConfig";
import "./ViewProject.css"; // Update the import path as per your file structure

const ViewProject = () => {
  const navigate = useNavigate();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [availableProjects, setAvailableProjects] = useState([]);

  const handleDeleteClick = (projectId) => {
    setProjectToDelete(projectId);
    setShowDeletePopup(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (projectToDelete) {
        const response = await axios.delete(
          `${API_BASE_URL}/api/projects/${projectToDelete}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        if (response.status === 200) {
          fetchAvailableProjects();
        } else {
          navigate("/error");
        }
        closeDeletePopup();
      }
    } catch (error) {
      navigate("/error");
    }
  };

  const closeDeletePopup = () => {
    setProjectToDelete(null);
    setShowDeletePopup(false);
  };

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
    }
  };

  useEffect(() => {
    fetchAvailableProjects();
  }, []);

  const handleSearchChange = (e) => {
    const inputValue = e.target.value;
    setSearchValue(inputValue);
  };

  const handleViewMoreInfo = (project) => {
    setSelectedProject(project);
    setShowInfoPopup(true);
  };

  const closeInfoPopup = () => {
    setSelectedProject(null);
    setShowInfoPopup(false);
  };

  const filteredProjects = availableProjects.filter(
    (project) =>
      project.ProjectTitle.toLowerCase().includes(searchValue.toLowerCase()) ||
      project.ProjectDescription.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div id="parent">
      <Navbar />
      <div id="projectHomeBody" className={showDeletePopup || showInfoPopup ? "blur" : ""}>
        <h1>Projects</h1>
        <div>
          <input
            id="searchBox"
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={handleSearchChange}
          />
        </div>
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
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <tr key={project.ProjectId}>
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
                      className="editButtonPro"
                      onClick={() => navigate("/editproject/" + project.ProjectId)}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(project.ProjectId)}
                      className="deleteButtonPro"
                    >
                      Delete
                    </button>
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
      {showDeletePopup && (
        <div className="delete-popup">
          <p>Are you sure you want to delete?</p>
          <button onClick={handleConfirmDelete}>Yes, Delete</button>
          <button onClick={closeDeletePopup}>Cancel</button>
        </div>
      )}
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

export default ViewProject;
