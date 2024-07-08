import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './ManagerNavbar'; // Assuming you have a Navbar component
import API_BASE_URL from '../apiConfig';
import "./ProjectForm.css"

const ProjectForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    ProjectTitle: '',
    ProjectDescription: '',
    StartDate: '',
    EndDate: '',
    FrontEndTechStack: '',
    BackendTechStack: '',
    Database: '',
    Status: '',
    Attachment: null
  });

  const [errors, setErrors] = useState({
    ProjectTitle: '',
    StartDate: '',
    EndDate: '',
    FrontEndTechStack: '',
    BackendTechStack: '',
    Database: '',
    Status: '',
    Attachment: ''
  });

  const [successPopup, setSuccessPopup] = useState(false);
  const [filePreview, setFilePreview] = useState(null);

  useEffect(() => {
    if (id) {
      fetchProject(id);
    }
  }, [id]);

  const fetchProject = async (id) => {
    try {
      const response = await axios.get(API_BASE_URL + `/api/projects/${id}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });

      if (response.status === 200) {
        const startDate = new Date(response.data.StartDate).toISOString().split('T')[0];
        const endDate = new Date(response.data.EndDate).toISOString().split('T')[0];

        setFormData({
          ProjectTitle: response.data.ProjectTitle,
          ProjectDescription: response.data.ProjectDescription,
          StartDate: startDate,
          EndDate: endDate,
          FrontEndTechStack: response.data.FrontEndTechStack,
          BackendTechStack: response.data.BackendTechStack,
          Database: response.data.Database,
          Status: response.data.Status,
          Attachment: response.data.CoverImage
        });
      }
    } catch (error) {
      console.log("error", error);
      // navigate('/error');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64String = await convertFileToBase64(file);
      setFilePreview(base64String);
      setFormData({ ...formData, Attachment: base64String });
    }
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAddProject = async () => {
    const fieldErrors = {};

    if (!formData.ProjectTitle) {
      fieldErrors.ProjectTitle = 'Project Title is required';
    }
    if (!formData.ProjectDescription) {
      fieldErrors.ProjectDescription = 'Project Description is required';
    }

    if (!formData.StartDate) {
      fieldErrors.StartDate = 'Start Date is required';
    }

    if (!formData.EndDate) {
      fieldErrors.EndDate = 'End Date is required';
    }

    if (!formData.FrontEndTechStack) {
      fieldErrors.FrontEndTechStack = 'Frontend Tech Stack is required';
    }

    if (!formData.BackendTechStack) {
      fieldErrors.BackendTechStack = 'Backend Tech Stack is required';
    }

    if (!formData.Database) {
      fieldErrors.Database = 'Database is required';
    }

    if (!formData.Status) {
      fieldErrors.Status = 'Status is required';
    }

    if (!formData.Attachment) {
      fieldErrors.Attachment = 'CoverImage is required';
    }

    if (Object.values(fieldErrors).some((error) => error)) {
      setErrors(fieldErrors);
      return;
    }

    try {
      const requestObject = {
        ProjectTitle: formData.ProjectTitle,
        ProjectDescription: formData.ProjectDescription,
        StartDate: formData.StartDate,
        EndDate: formData.EndDate,
        FrontEndTechStack: formData.FrontEndTechStack,
        BackendTechStack: formData.BackendTechStack,
        Database: formData.Database,
        Status: formData.Status,
        CoverImage: formData.Attachment
      };

      const response = id
        ? await axios.put(API_BASE_URL + `/api/projects/${id}`, requestObject, {
          headers: { Authorization: localStorage.getItem('token') },
        })
        : await axios.post(API_BASE_URL + '/api/projects', requestObject, {
          headers: { Authorization: localStorage.getItem('token') },
        });

      if (response.status === 200) {
        setSuccessPopup(true);
      }
    } catch (error) {
      // navigate('/error');
    }
  };

  const handleSuccessMessage = () => {
    setSuccessPopup(false);
    navigate('/viewproject'); // Assuming you have a view projects page
  };

  return (
    <div>
      <Navbar />
      <div className={`project-form-container ${successPopup ? 'blur' : ''}`}>
        {id && (
          <>
            <button type="button" className="back-button" onClick={() => navigate(-1)}>
              Back
            </button>
            <h2 className="Editheading">Edit Project</h2>
          </>
        )}
        {!id && <h2>Create New Project</h2>}
        <div>
          <div className="form-group">
            <label htmlFor="ProjectTitle">Project Title <span style={{ color: 'red' }}>*</span></label>
            <input
              type="text"
              name="ProjectTitle"
              value={formData.ProjectTitle}
              onChange={handleChange}
            />
            {errors.ProjectTitle && <div className="error">{errors.ProjectTitle}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="ProjectDescription">Project Description<span style={{ color: 'red' }}>*</span></label>
            <input
              type="text"
              name="ProjectDescription"
              value={formData.ProjectDescription}
              onChange={handleChange}
            />
            {errors.ProjectDescription && <div className="error">{errors.ProjectDescription}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="StartDate">Start Date<span style={{ color: 'red' }}>*</span></label>
            <input
              type="date"
              name="StartDate"
              value={formData.StartDate}
              onChange={handleChange}
            />
            {errors.StartDate && <div className="error">{errors.StartDate}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="EndDate">End Date<span style={{ color: 'red' }}>*</span></label>
            <input
              type="date"
              name="EndDate"
              value={formData.EndDate}
              onChange={handleChange}
              min={formData.StartDate} // Set the minimum value of end date based on start date
            />
            {errors.EndDate && <div className="error">{errors.EndDate}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="FrontEndTechStack">Frontend Tech Stack<span style={{ color: 'red' }}>*</span></label>
            <input
              type="text"
              name="FrontEndTechStack"
              value={formData.FrontEndTechStack}
              onChange={handleChange}
            />
            {errors.FrontEndTechStack && <div className="error">{errors.FrontEndTechStack}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="BackendTechStack">Backend Tech Stack<span style={{ color: 'red' }}>*</span></label>
            <input
              type="text"
              name="BackendTechStack"
              value={formData.BackendTechStack}
              onChange={handleChange}
            />
            {errors.BackendTechStack && <div className="error">{errors.BackendTechStack}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="Database">Database<span style={{ color: 'red' }}>*</span></label>
            <input
              type="text"
              name="Database"
              value={formData.Database}
              onChange={handleChange}
            />
            {errors.Database && <div className="error">{errors.Database}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="Status">Status<span style={{ color: 'red' }}>*</span></label>
            <input
              type="text"
              name="Status"
              value={formData.Status}
              onChange={handleChange}
            />
            {errors.Status && <div className="error">{errors.Status}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="Attachment">Cover Image<span style={{ color: 'red' }}>*</span></label>
            <input
              type="file"
              name="Attachment"
              onChange={handleFileChange}
              accept=".jpg, .jpeg, .png, .pdf" // Specify the allowed file types
            />
            {errors.Attachment && <div className="error">{errors.Attachment}</div>}
          </div>
          <button className="project-button" type="button" onClick={handleAddProject}>
            {id ? 'Update Project' : 'Add Project'}
          </button>
        </div>
      </div>
      {successPopup && (
        <>
          <div className="overlay"></div>
          <div className="modalpopup">
            <p>{id ? 'Updated Successfully!' : 'Successfully Added!'}</p>
            <button onClick={handleSuccessMessage}>Ok</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectForm;
