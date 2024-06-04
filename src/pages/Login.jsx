import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const onSubmit = async (formData) => {
    try {
      const response = await axios.post("http://127.0.0.1:8080/api/auth/signin", formData);
      console.log("Success!", response.data);
      if (response.data.accessToken) {
        sessionStorage.setItem("user", JSON.stringify(response.data));
        Cookies.set('accessToken', response.data.accessToken, { secure: true, sameSite: 'strict' });
        onLogin(response.data.accessToken);
        setSuccessMessage("Login Successful!");
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }
    } catch (error) {
      console.log("Error during Login!", error);
      if (error.response && error.response.data) {
        Object.keys(error.response.data).forEach(field => {
          const errorMessages = error.response.data[field];
          if (errorMessages && errorMessages.length > 0) {
            setError(errorMessages[0]);
          }
        });
      }
    }
  };

  return (
    <div>
      {error && <p style={{color:"red"}}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <h2>Login:</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Username:</label>
        <br />
        <input
          type="text"
          name="username"
          {...register("username", { required: "Username is required" })}
        />
        <br />
        {errors.username && <p style={{ color: "red" }}>{errors.username.message}</p>}
        <br />
        <label>Password:</label>
        <br />
        <input
          type="password"
          {...register("password", { required: "Password is required" })}
        />
        <br />
        {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
        <br />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};
