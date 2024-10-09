import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword, signInAnonymously } from "firebase/auth";
import { auth } from "../../firebase/config";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const validForm = email && password;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validForm) {
      try {
        setIsLoading(true);
        const response = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        if (response) {
          navigate("/");
          setIsLoading(false);
        }
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    }
  };

  const handleGuestLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await signInAnonymously(auth);
      if (response) {
        navigate("/");
        setIsLoading(false);
      }
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <h1>Firegram</h1>
      <div className="login-card">
        <div className="login-image"></div>
        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className={`login-btn ${!validForm ? "--disabled" : ""}`}
            type="submit"
          >
            {isLoading ? <div className="loading-spinner --small" /> : "Log In"}
          </button>
          <p>
            Don't have an account? Log in as
            <span onClick={handleGuestLogin}> Guest</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
