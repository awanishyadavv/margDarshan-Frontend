import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "../styles/Login.css";
import { Context, server } from "../index";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const {
    isAuthenticated,
    setIsAuthenticated,
    loading,
    setLoading,
    isAuthenticatedAdmin,
    setIsAuthenticatedAdmin,
  } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${server}/users/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      await axios
        .get(`${server}/users/me`, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.user.role === "admin") {
            setIsAuthenticatedAdmin(true);
            toast.success("You are a authorised admin");
          }
        })
        .catch((error) => {
          setIsAuthenticatedAdmin(false);
        });
      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
      setIsAuthenticatedAdmin(false);
    }
  };

  if (isAuthenticated) return <Navigate to={"/"} />;

  return (
    <div className="login-container">
      <section>
        <form onSubmit={submitHandler} action="">
          <h2>Log in to your account</h2>
          <h3>
            Don't have an account?{" "}
            <Link to={"/signup"} className="login-signup-btn">
              Sign Up
            </Link>
          </h3>
          <div className="input">
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
          </div>
          <div className="action">
            <button className="btn" disabled={loading}>
              Login
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
