// SignIn.js
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {backendurl} from './BackEndUrl';
import axios from 'axios';
import Updateuser from './Updateuser';
import './SignIn.css';
import Waitload from './Waitload';

const SignIn = () => {

  const navigate = useNavigate();

 
  useEffect(() => {
  
    const UpdateUser = async () => {
      const msg = await Updateuser();
      if (msg==='notlog') {
        console.log('You are not signed in-connection-ok')
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
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [waitload, setWaitload] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setWaitload(true);

    if (!formData.username || !formData.password) {
      setError('All fields are required!');
      setSuccess('');
      setWaitload(false);
    } else if(formData.username.length < 5) {
      setError('User name should be more than 4 characters.');
      setSuccess('');
      setWaitload(false);
    } else if(formData.password.length < 5) {
      setError('Password should be more than 4 characters.');
      setSuccess('');
      setWaitload(false);
    } else if (formData.password!==formData.confirmPassword) {
      setError('Passwords do not match');
      setSuccess('');
      setWaitload(false);
    } else {
      try {
        const response = await axios.post(`${backendurl}/signin`, { formData },);
        if (response.data==='usersaved') {
          setSuccess('User created successfully. Please log in.');
          setError('');
          setWaitload(false);
        } else if (response.data==='userexist'){
          setError('User Name allready exist');
          setSuccess('');
          setWaitload(false);
        } else {
          setError(response.data);
          setSuccess('');
          setWaitload(false);
        }
        setFormData({ username: '', password: '', confirmPassword: '',});
      } catch (error) {
        setError(`${error}`)
        console.log(error);
        setSuccess('');
        setWaitload(false);
      }
    }
  };

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSubmit}>
        {waitload && (<Waitload/>)}
        <h1 className="app-title">THE BUDGET CALCULATER</h1>
        <h2>Sign Up</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
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
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
        <p className="account-redirect">
          Already have an account?{' '}
          <button type="button" onClick={() => navigate('/tjbudget2025/login')}>Login</button>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
