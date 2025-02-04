import "../styles/Login.css";
import Logo from "../images/icons/Amazon_logo.svg.webp";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <img src={Logo} alt="Amazon Logo" className="amazon-logo" />
        <h1>Sign in</h1>
        <form>
          <label>Email or mobile phone number</label>
          <input type="email" required />

          <label>Password</label>
          <input type="password" required />

          <button type="submit" className="sign-in-btn">
            Sign in
          </button>
        </form>
        <p className="terms">
          By continuing, you agree to Amazon's <a href="#">Conditions of Use</a>{" "}
          and <a href="#">Privacy Notice</a>.
        </p>
        <div className="new-account">
          <p>New to Amazon?</p>
          <button className="create-account-btn">
            Create your Amazon account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
