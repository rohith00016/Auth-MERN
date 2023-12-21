
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Logout from './components/Logout';
import NavBar from './components/NavBar';

const App = () => {

  return (
    <Router>
      <div>
        
        <Routes>
          <Route path="/" element={<NavBar />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/:userId" element={<Dashboard />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
