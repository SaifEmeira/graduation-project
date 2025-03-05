import { Outlet } from 'react-router-dom';
import CustomNavbar from './Navbar';
import LandingPage  from './LandingPage';

export default function Layout() {
  return (
    <div>
      <CustomNavbar />


        <Outlet /> 

      <LandingPage />      

    </div>
  );
}
