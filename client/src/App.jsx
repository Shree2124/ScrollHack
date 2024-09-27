
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login.jsx';
import Register from './components/register.jsx';
import Dashboard from './components/Dashboard'; 
import useAuth from './hooks/useAuth.js';

function App() {
  useAuth()

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} /> {/* Protected Route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
