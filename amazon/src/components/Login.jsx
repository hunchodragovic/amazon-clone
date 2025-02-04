import "../styles/Login.css";
import Logo from "../images/icons/Amazon_logo.svg.webp";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirm password
  const [error, setError] = useState(""); // State for error messages
  const [isSignup, setIsSignup] = useState(false); // State for toggling between login and signup
  const [loading, setLoading] = useState(false); // State for loading
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value); // Handle confirm password input
  };

  const signIn = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true
    signInWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        if (auth) {
          navigate("/");
        }
      })
      .catch((error) => {
        setError("Invalid credentials. Please check your email and password.");
      })
      .finally(() => {
        setLoading(false); // Set loading state to false once the request is complete
      });
  };

  const register = (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true); // Set loading state to true
    createUserWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        if (auth) {
          navigate("/");
        }
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false); // Set loading state to false once the request is complete
      });
  };

  const toggleForm = () => {
    setIsSignup(!isSignup); // Toggle between login and signup form
    setError(""); // Clear error message when switching forms
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <Link to="/">
          <img src={Logo} alt="Amazon Logo" className="amazon-logo" />
        </Link>

        <h1>{isSignup ? "Create account" : "Sign in"}</h1>
        <form onSubmit={isSignup ? register : signIn}>
          <label>Email or mobile phone number</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
          {isSignup && (
            <>
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                required
              />
              {error && <p className="error-message">{error}</p>}{" "}
              {/* Display error */}
            </>
          )}
          {error && !isSignup && <p className="error-message">{error}</p>}{" "}
          {/* Error message for login */}
          <button
            type="submit"
            className={`sign-in-btn ${loading ? "loading" : ""}`} // Add the "loading" class when loading
            disabled={loading} // Disable button while loading
          >
            {loading
              ? isSignup
                ? "Creating your account..."
                : "Signing in..."
              : isSignup
              ? "Create your Amazon account"
              : "Sign in"}
          </button>
        </form>

        <p className="terms">
          By continuing, you agree to Amazon's <a href="#">Conditions of Use</a>{" "}
          and <a href="#">Privacy Notice</a>.
        </p>

        <div className="new-account">
          <p>{isSignup ? "Already have an account?" : "New to Amazon?"}</p>
          <button className="create-account-btn" onClick={toggleForm}>
            {isSignup ? "Sign in" : "Create your Amazon account"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
