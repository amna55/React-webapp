import React from 'react';
import Navbar from './components/navbar';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Services from './components/pages/Services';
import Products from './components/pages/Products';
import SignUp from './components/pages/SignUp';
import Simulation from './components/pages/Simulation';
import HecHms from './components/pages/HecHms';
import HecRas from './components/pages/HecRas';
import Final from './components/pages/Final';
import DataOptions from './components/dataoptions';
import ManualPage from './components/ManualPage';  // Make sure you have these components
import Cmip6Page from './components/Cmip6Page';
import Era5Page from './components/Era5Page';



function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/services' element={<Services />} />
          <Route path='/products' element={<Products />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/simulation' element={<Simulation />} />
          <Route path='/HecHms' element={<HecHms />} />
          <Route path='/HecRas' element={<HecRas />} />
          <Route path='/Final' element={<Final />} />
          <Route path="/" element={<DataOptions />} />
          <Route path="/ManualPage" element={<ManualPage />} />
          <Route path="/Cmip6Page" element={<Cmip6Page />} />
          <Route path="/Era5Page" element={<Era5Page />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
