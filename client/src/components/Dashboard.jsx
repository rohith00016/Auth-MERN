import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation, NavLink, Routes, Route } from 'react-router-dom';
import { format } from 'date-fns';
import '../styles/dashboard.css';
import Logout from './Logout';

const Dashboard = () => {
  const { userId } = useParams();
  const location = useLocation();
  const user = location.state && location.state.user;

  const [additionalInfo, setAdditionalInfo] = useState({
    age: '',
    gender: '',
    dob: '',
    mobile: '',
  });

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    const fetchAdditionalInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/profile/${userId}`);
        const fetchedInfo = response.data || {};

        const formattedDate = fetchedInfo.dob ? format(new Date(fetchedInfo.dob), 'yyyy-MM-dd') : '';

        setAdditionalInfo({
          age: fetchedInfo.age || '',
          gender: fetchedInfo.gender || '',
          dob: formattedDate,
          mobile: fetchedInfo.mobile || '',
        });
      } catch (error) {
        console.error('Error fetching additional info:', error);
      }
    };

    fetchAdditionalInfo();
  }, [userId]);

  const handleAdditionalInfoChange = (e) => {
    const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;

    setAdditionalInfo({
      ...additionalInfo,
      [e.target.name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('Data to be sent:', { additionalInfo });
      const response = await axios.put(`http://localhost:3000/api/profile/${userId}`, { ...additionalInfo });

      if (response.data.message) {
        console.log(response.data.message);
        setShowSuccessAlert(true);

        setTimeout(() => {
          setShowSuccessAlert(false);
        }, 5000);
      } else {
        console.error('Error updating additional info:', response.data.error);
      }
    } catch (error) {
      console.error('Error updating additional info:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="edit-info-form">
        <form onSubmit={handleFormSubmit}>
          <h3>Edit Additional Information:</h3>
          <label>
            Age:
            <input
              type="number"
              name="age"
              value={additionalInfo.age || ''}
              onChange={handleAdditionalInfoChange}
              className="input-field"
            />
          </label>
          <br />
          <label>
            Gender:
            <div className="radio-buttons">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={additionalInfo.gender === 'male'}
                  onChange={handleAdditionalInfoChange}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={additionalInfo.gender === 'female'}
                  onChange={handleAdditionalInfoChange}
                />
                Female
              </label>
              {/* Add more options if needed */}
            </div>
          </label>
          <br />
          <label>
            Date of Birth:
            <input
              type="date"
              name="dob"
              value={additionalInfo.dob}
              onChange={handleAdditionalInfoChange}
              className="input-field"
            />
          </label>
          <br />
          <label>
            Mobile Number:
            <input
              type="number"
              name="mobile"
              value={additionalInfo.mobile || ''}
              onChange={handleAdditionalInfoChange}
              className="input-field"
            />
          </label>
          <br />
          <button type="submit" className="submit-button">
            Save Changes
          </button>
        </form>
      </div>
      {showSuccessAlert && (
        <div className="success-alert">
          Success! Additional information updated.
        </div>
      )}
      <div className="logout-link">
        <NavLink to="/logout" className="logout-button">
          Logout
        </NavLink>
      </div>
      <Routes>
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
