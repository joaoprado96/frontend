// pages/_app.js

import React from 'react';
import '../app/globals.css'; // Ajuste o caminho para o seu arquivo CSS global, se necessário
import Navbar from '../app/components/navbar'; // Ajuste o caminho para o seu componente Navbar

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
