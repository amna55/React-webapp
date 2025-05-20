import React from 'react';
import '../../App.css';
import Footer from '../Footer';
import StartHecras from '../StartHecras';
import Button5 from '../Button5';
import WMS from '../WFSmap'

function HecRas() {
  return (
    <>
      <StartHecras />
      <WMS />
      <Button5 />
      <Footer />
    </>
  );
}

export default HecRas;