import { Outlet } from 'react-router-dom';
import CustomNavbar from './Navbar';
import LandingPage  from './LandingPage';
import Footer from './Footer';

export default function Layout() {
  return (
    <div>
      <CustomNavbar />


        <Outlet /> 

      <LandingPage />    
      
      <Footer />  
    </div>
  );
}
