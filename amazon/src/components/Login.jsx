import "../styles/Login.css";
import Logo from "../images/icons/Amazon_logo.svg.webp";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { useAuth } from "../context/GlobalState"; // Import the useAuth hook

const Login = () => {
  const { user } = useAuth(); // Access the user from the global context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect user to home page if they are already logged in
    if (user) {
      navigate("/"); // Redirect to homepage if the user is already logged in
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };

  const signIn = (e) => {
    e.preventDefault();
    setLoading(true);
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
        setLoading(false);
      });
  };

  const register = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
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
        setLoading(false);
      });
  };

  const toggleForm = () => {
    setIsSignup(!isSignup);
    setError("");
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
              {error && <p className="error-message">{error}</p>}
            </>
          )}

          {error && !isSignup && <p className="error-message">{error}</p>}

          <button
            type="submit"
            className={`sign-in-btn ${loading ? "loading" : ""}`}
            disabled={loading}
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
