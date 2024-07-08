import React, { useEffect, useState } from 'react';
import './HomePage.css'; // Import your custom styles
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import EmployeeNavbar from '../EmployeeComponents/EmployeeNavbar';
import ManagerNavbar from '../ManagerComponents/ManagerNavbar';


const HomePage = () => {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    setUserRole(role);
  }, []);
  
  return (
    <div className="wrapper">
      {userRole === 'Manager' ? <ManagerNavbar /> : <EmployeeNavbar />}
      <div className="coverimage">
        <LazyLoadImage
          effect="blurr"
          src={process.env.PUBLIC_URL + '/protech.png'} 
          alt="Cover" 
        />
                <div className="title">ProTechSuite</div>

      </div>

      <div className="content">
          <p>Your journey to knowledge begins with us. Our platform offers a seamless project creation, project proposal creation and quick approval.</p>
        </div>

      <div className="contact">
        <h2>Contact Us</h2>
        <p>Email: example@example.com</p>
        <p>Phone: 123-456-7890</p>
      </div>
    </div>
  );
};

export default HomePage;