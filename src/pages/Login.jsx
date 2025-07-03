import React, { useEffect } from 'react';
import { useRequest } from '../utils/request';

function Login() {
  const request = useRequest();

  const login = async () => {
    const email = "562172940@qq.com";
    const password = "admin123";
    const response = await request.post("auth/loginEmail", {
      email,
      password,
    });
    console.log(response);
  }

  useEffect(() => {
    login();
  }, []);
  return (
    <div className="login-container">
      <h2>Login page</h2>
    </div>
  );
}

export default Login; 