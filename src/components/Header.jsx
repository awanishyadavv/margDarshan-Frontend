import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Logo from "../assets/logo1.png";
import { Context, server } from "..";
import axios from "axios";
import toast from "react-hot-toast";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading ,isAuthenticatedAdmin, setIsAuthenticatedAdmin} = useContext(Context);
  const logoutHandler = async (e) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${server}/users/logout`,
        {
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setIsAuthenticated(false);
      setIsAuthenticatedAdmin(false)
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(true)
      setLoading(false);
      setIsAuthenticatedAdmin(false)
    }
  };

  return (
    <nav className="header">
      <div className="logo">
        <img src={Logo} alt="" />
      </div>
      <div className="navigations">
        <article className="article">
          <Link to={"/"}>Home</Link>
          <Link to={"/places"}>Places</Link>
          <Link to={"/trip-plans"}>Trip Plan</Link>
          <Link to={"/about"}>About</Link>
          <Link to={"/contact-us"}>Contact</Link>
        </article>
        <article className="article">
          {
            isAuthenticatedAdmin ? (<Link className="btn" to={"/admin-dashboard"}>Admin Dashboard</Link>):<a></a>
          }
          {isAuthenticated ? (
            <button className="btn" disabled={loading} onClick={logoutHandler}>Logout</button>
          ) : (
            <div className="article">
              <Link to={"/login"}>Login</Link>
              <Link to={"/signup"}>Signup</Link>
            </div>
          )}
        </article>
      </div>
    </nav>
  );
};

export default Header;
