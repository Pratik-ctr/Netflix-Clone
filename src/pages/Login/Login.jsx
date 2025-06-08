import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../../assets/logo.png';
import netflix_spinner from '../../assets/netflix_spinner.gif';

const Login = () => {
  const navigate = useNavigate();
  const [signState, setSignState] = useState("Sign In");
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const endpoint = signState === "Sign In" ? "/signin" : "/signup";
    const url = `http://localhost:5000${endpoint}`;

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues)
      });

      const data = await res.json();
      alert(data.message);

      if (res.ok && signState === "Sign In") {
        console.log("Logged in user:", data.user);
        navigate('/'); // Redirect to home page
      }
    } catch (error) {
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    loading ? (
      <div className="loginspinner">
        <img src={netflix_spinner} alt="Loading..." />
      </div>
    ) : (
      <div className='login'>
        <img src={logo} className='login-logo' alt="Netflix Logo" />
        <div className="login-from">
          <h1>{signState}</h1>
          <form onSubmit={handleSubmit}>
            {signState === "Sign Up" && (
              <input
                type="text"
                name="username"
                placeholder="Your Name"
                value={formValues.username}
                onChange={handleInputChange}
                required
              />
            )}
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleInputChange}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleInputChange}
              required
            />
            <button type="submit">{signState}</button>
          </form>

          {/* 🔁 Form Switch Code Added Below */}
          <div className="form-switch">
            {signState === "Sign In" ? (
              <p>
                New to Netflix? <span onClick={() => setSignState("Sign Up")}>Sign Up Now</span>
              </p>
            ) : (
              <p>
                Already have an account? <span onClick={() => setSignState("Sign In")}>Sign In Now</span>
              </p>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Login;
