import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Home from './views/Home/Home';
import Login from './views/Login/Login';
import MisTurnos from './views/MisTurnos/MisTurnos';
import Contact from "./views/Contact/Contact";
import ErrorPage from "./views/ErrorPage/ErrorPage";
import Register from './views/Register/Register';
import NewAppointment from './views/NewAppointment/NewAppointment';
import { Routes, Route } from "react-router-dom";
import "./App.css";
import AboutUs from './views/AboutUs/AboutUs';

function App() {
  return (
    <>
      <NavBar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/appointments" element={<MisTurnos />} /> 
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/newAppointment" element={<NewAppointment />} /> 
          <Route path="*" element={<ErrorPage />} /> 
        </Routes>
      </div>
      <Footer />
    </>
  )
};

export default App;
