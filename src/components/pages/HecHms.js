import React from 'react';
import '../../App.css';
import Footer from '../Footer';
import HecHmsP from '../HecHmsprcs';
import Era5Page from '../Era5Page';
import ManualPage from '../ManualPage';
import Cmip6Page from '../Cmip6Page';

function HecHms() {
  return (
    <>
      <HecHmsP />
      <ManualPage />
      <Era5Page />
      <Cmip6Page />
      <Footer />
    </>
  );
}

export default HecHms;