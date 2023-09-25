import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../contexts/auth/authContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { register, user } = useAuthContext();
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
              Login to your account
            </p>
          </div>
          <input name="username" onInput={(e) => setUsername(e.target.value)} className="form-control" />
          <input type="password" name="password" onInput={(e) => setPassword(e.target.value)} className="form-control" />
          <button
            type="button"
            onClick={() => register(username, password)}
            className="btn btn-primary account__btn">Join</button>
        </div>
      </div>
    </div>
  );
}

export default Register;
