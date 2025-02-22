// Login.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {backendurl} from './BackEndUrl';
import Waitload from './Waitload';
import Updateuser from './Updateuser';
import axios from 'axios';
import './Login.css';

const Login = () => {

  const navigate = useNavigate();

 
  useEffect(() => {
  
    const UpdateUser = async () => {
      const msg = await Updateuser();
      if (msg==='notlog') {
        console.log('You are not signed in')
      } else if (msg==="connectionerror"){
        console.log('You are not signed in')
      } else if(msg.activebudget==='yes') {
        navigate('/tjbudget2025/dashboard');
      }  else if(msg.activebudget==='no') {
        navigate('/tjbudget2025/frontpage');
      }else {
        console.log('You are not signed in')
      }
    };
    UpdateUser();
  }, [navigate]);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [waitload, setWaitload] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setWaitload(true);

    if (!formData.username || !formData.password) {
      setError('All fields are required!');
    } else {
      try {
        const response = await axios.post(`${backendurl}/login`, { formData }, { withCredentials: true });
        if (response.data==='usererror') {
          setError('User Name not exist');
          setWaitload(false);
        } else if (response.data==='passworderror'){
          setError('Password is not matched');
          setWaitload(false);
        } else if (response.data==='passwordmatched'){
          navigate('/tjbudget2025/dashboard')
          setWaitload(false);
        } else {
          setError(`${response.data}`);
          setWaitload(false);
        }
        setFormData({username: '', password: '',});
      } catch (error) {
        setError(`${error}`)
        setWaitload(false);
      }
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        {waitload && (<Waitload/>)}
        <h1 className="app-title">THE BUDGET CALCULATER</h1>
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
        <p className="account-redirect">
          Don't have an account?{' '}
          <button type="button" onClick={() => navigate('/tjbudget2025')}>Sign Up</button>
        </p>
      </form>
    </div>
  );
};

export default Login;
