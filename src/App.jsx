import Header from "./components/Header";
import "./styles/App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Places from "./pages/Places";
import TripPlan from "./pages/TripPlan";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import toast, { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import axios from "axios";
import { Context, server } from "./index";
import Dashboard from "./pages/admin/Dashboard";
import AdminMenu from "./components/AdminMenu";

function App() {
  const {
    setUser,
    isAuthenticated,
    isAuthenticatedAdmin,
    setIsAuthenticated,
    setIsAuthenticatedAdmin,
  } = useContext(Context);
  useEffect(() => {
    axios
      .get(`${server}/users/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
        setIsAuthenticated(true);
        if (res.data.user.role === "admin") {
          setIsAuthenticatedAdmin(true);
        }
      })
      .catch((error) => {
        setUser({});
        setIsAuthenticated(false);
        setIsAuthenticatedAdmin(false);
      });
  }, []);

  const AdminRoute = ({ element }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    if (!isAuthenticatedAdmin) {
      return <Navigate to="/" />;
    }
    return element;
  };

  return (
    <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/places" element={<Places />} />
            <Route path="/trip-plans" element={<TripPlan />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* Admin Routes */}
            <Route
              path="/admin-dashboard"
              element={<AdminRoute element={<Dashboard />} />}
            />
          </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
