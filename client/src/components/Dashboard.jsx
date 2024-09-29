import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";
import "./dashboard.css";
import { useSelector } from "react-redux";
import Container from "./container";

const AdminDashbord = () => {
  const navigate = useNavigate();

  const {user} = useSelector(state=>state.auth)

  if (user && user.role !== "admin") return navigate("/");

  const [stats, setStats] = useState([]);

  async function fetchStats() {
    try {
      const { data } = await axiosInstance.get(`/stats`);

      setStats(data.stats);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);
  return (
    <Container>
        <div className="main-content p-3">
          <div className="box">
            <p>Total Courses</p>
            <p>{stats.totalCourses}</p>
          </div>
          <div className="box">
            <p>Total Lectures</p>
            <p>{stats.totalLectures}</p>
          </div>
          <div className="box">
            <p>Total Users</p>
            <p>{stats.totalUsers}</p>
          </div>
        </div>
    </Container>
  );
};

export default AdminDashbord;
