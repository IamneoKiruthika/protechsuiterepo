import React from 'react';
import Login from './Components/Login';
import HomePage from './Components/HomePage';
import SignupForm from './Components/Signup';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import PrivateRoute from './Components/PrivateRoute'; // Import the PrivateRoute component
import { Navigate } from 'react-router-dom';
import ErrorPage from './Components/ErrorPage';
import ProjectForm from './ManagerComponents/ProjectForm';
import ViewProject from './ManagerComponents/ViewProject';
import EmployeeViewProject from './EmployeeComponents/EmployeeViewProject';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="user">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<SignupForm />} />
        </Route>
        <Route path="/home"  element={  <PrivateRoute>  <HomePage /> </PrivateRoute>}/>   
        <Route path="*" element={<Navigate to="/user/login" replace />} />
        <Route path="/error"  element={<ErrorPage/> }/>  
        <Route path="/addproject"  element={  <PrivateRoute>  <ProjectForm /> </PrivateRoute>}/>  
        <Route path="/viewproject"  element={  <PrivateRoute>  <ViewProject /> </PrivateRoute>}/>  
        <Route path="/editproject/:id"  element={  <PrivateRoute>  <ProjectForm /> </PrivateRoute>}/>  
        <Route path="/employee/viewproject"  element={  <PrivateRoute>  <EmployeeViewProject /> </PrivateRoute>}/>  
     </Routes>
    </BrowserRouter>
  );
}

export default App;
