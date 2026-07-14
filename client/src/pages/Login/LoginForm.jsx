import React, { useState, useEffect } from 'react';
import Form from '../../components/Form';
import TextInput from '../../components/TextInput';
import { PrimaryButton } from '../../components/Button';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAxios } from '../../hooks/useAxios';
import { authAPI } from '../../api';
import { useAuthContext } from '../../context/AuthContext';
import { errorToast, warningToast } from '../../utils/toastify';
import { useSocketContext } from '../../context/SocketContext';

function LoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const { setUser, setToken } = useAuthContext();
  const { socketConnect } = useSocketContext();
  const { error, isLoading, sendRequest: postLogin } = useAxios();

  useEffect(() => {
    if (error?.errors) {
      error.errors.forEach((e) => {
        errorToast(e.msg);
      });
    } else if (error?.message) {
      errorToast(error.message);
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      warningToast('All fields are required!');
      return;
    }
    postLogin(
      {
        method: 'POST',
        url: authAPI.login,
        data: { ...formData }
      },
      (data) => {
        const { accessToken, ...other } = data.data;
        setUser({ ...other });
        setToken({ accessToken });
        socketConnect();
      }
    );
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormTitle>Welcome to CircuitConnect</FormTitle>
      <FormSubtitle>
          Connect with engineers, discuss ideas and build projects together.
      </FormSubtitle>
      <TextInput
        type="text"
        placeholder="Engineer Username"
        name="username"
        id="username"
        value={formData.username}
        onChange={handleInputChange}
      />
      <TextInput
        type="password"
        placeholder="Password"
        name="password"
        id="password"
        value={formData.password}
        onChange={handleInputChange}
      />
      <PrimaryButton>
          {isLoading ? 'Connecting...' : 'Continue to CircuitConnect'}
      </PrimaryButton>
      <LoginSpan>
        New to CircuitConnect?
        <Link to="/signup">
          <span>Create account</span>
        </Link>
      </LoginSpan>
    </Form>
  );
}

const FormTitle = styled.h1`
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 1px;
  text-align: center;
  margin: 0.5rem 0;
`;

const FormSubtitle = styled.p`
  font-size: 0.8rem;
  line-height: 1.4;
  text-align: center;
  color: var(--gray);
  margin: 0 0 1rem;
`;

const LoginSpan = styled.p`
  font-size: 0.75rem;

  a {
    text-decoration: none;
  }

  span {
    margin-left: 0.5rem;
    color: var(--danger);
    font-weight: 500;
    text-transform: capitalize;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default LoginForm;
