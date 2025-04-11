import React from 'react';
import './App.css';
import { RoutesConfig } from './Routes/RoutesConfig';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <RoutesConfig></RoutesConfig>
    <ToastContainer />
    </>
  );
}

export default App;
