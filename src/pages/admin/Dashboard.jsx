import React, { useEffect, useState } from "react";
import "../../styles/adminStyles/Dashboard.css";
import AdminMenu from "../../components/AdminMenu";
import axios from "axios";
import { server } from "../../index";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${server}/users/admin/getAllUsers`, {
        withCredentials: true,
      })
      .then((res) => {
        setAllUsers(res.data.users);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  });

  return (
    <div className="dashboard-container">
      <div className="dashboard-menu">
        <AdminMenu />
      </div>
      <div className="dashboard">
        <input
          type="text"
          placeholder="Search User By Name"
          className="user-search"
        />

        {allUsers.map((i) => (
          <div className="user-container">
            <div className="user-information"></div>
            <div className="user-information"></div>
            <div className="user-information"></div>
            <div className="user-information"></div>
            <div className="user-information"></div>
            <div className="user-information"></div>
            <div className="user-action"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
