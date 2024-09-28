// import {} from './Pages/index.js'
import Register from "./components/register.jsx";
import Dashboard from "./components/Dashboard";
import useAuth from "./hooks/useAuth.js";
import Header from "./components/Header/Header.jsx";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer.jsx";



function App() {
  useAuth();

  return (
    <div className="min-h-screen flex flex-wrap content-between">
      <div className="w-full">
        <Header />
        <main className="w-full min-h-screen pt-10">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
