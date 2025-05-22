import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";

const MainLayout = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />
      {/* whatever page it is */}
      <Outlet />
      <Footer />
    </div>
  )
}

export default MainLayout;