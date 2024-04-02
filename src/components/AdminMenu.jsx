import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./AdminMenu.css";
import Logo from "../assets/logo1.png";
import { Context, server } from "..";
import axios from "axios";
import toast from "react-hot-toast";
 
const AdminMenu = () => {
    const { isAuthenticated, setIsAuthenticated, loading, setLoading ,isAuthenticatedAdmin, setIsAuthenticatedAdmin} = useContext(Context);  
    return (
      <nav className="Admin-menu">
          <article className="admin-article">
            <Link className="admin-item">Users</Link>
            <Link  className="admin-item">Places</Link>
            <Link  className="admin-item">Trips</Link>
            <Link  className="admin-item">Queries</Link>
            <Link  className="admin-item">Others</Link>
          </article>
      </nav>
    );
  };
  

export default AdminMenu