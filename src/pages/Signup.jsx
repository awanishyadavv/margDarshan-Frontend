import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "../styles/Signup.css";
import axios from "axios";
import { Context, server } from "../index";
import toast from "react-hot-toast";

const Signup = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);

  const submitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (password !== rePassword) {
      toast.error("Passwords do not match.");
      setLoading(false);
      return;
    }
    if (number.length !== 10) {
      toast.error("Phone number must be 10 digits.");
      setLoading(false);
      return;
    }
    try {
      console.log(name, email, number, password, rePassword);
      const { data } = await axios.post(
        `${server}/users/new`,
        {
          name,
          email,
          phone: number,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  if (isAuthenticated) return <Navigate to={"/"} />;
  return (
    <div className="signup-container">
      <section>
        <form onSubmit={submitHandler} action="">
          <h2>Create your account</h2>
          <h3>
            Already have an account?{" "}
            <Link to={"/login"} className="login-signup-btn">
              Login
            </Link>
          </h3>
          <div className="input">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={number}
              onChange={(e) => {
                const re = /^[0-9\b]+$/;
                if (e.target.value === "" || re.test(e.target.value)) {
                  setNumber(e.target.value);
                }
              }}
              required
              inputMode="numeric"
              minLength={10}
              maxLength={10}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Retype Password"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
              required
            />
          </div>
          <div className="terms-of-service">
            <input type="checkbox" placeholder="Email" required />
            <p>
              I accept the <a>Privacy Policy</a> and <br />
              The <a>Terms of Service</a>
            </p>
          </div>
          <div className="action">
            <button className="btn" disabled={loading}>
              Sign Up
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Signup;
