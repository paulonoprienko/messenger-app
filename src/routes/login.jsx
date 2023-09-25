import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../contexts/auth/authContext';
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { logInUser, user } = useAuthContext();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if(user) {
      console.log(user.token);
      if(user.token) {
        navigate('/');
      }
    }
    
  }, [user]);

  return (
    <div className="account">
      <div className="account__wrapper">
        <div className="account__card">
          <div className="account__profile">
            <p className="account__name">
              Login to your account or <Link to={'/register'}>register easily</Link>
            </p>
          </div>
          <input name="username" onInput={(e) => setUsername(e.target.value)} className="form-control" />
          <input type='password' name="password" onInput={(e) => setPassword(e.target.value)} className="form-control" />
          <button
            type="button"
            onClick={() => logInUser(username, password)}
            className="btn btn-primary account__btn">Join</button>
        </div>
      </div>
    </div>
  );
}

export default Login;