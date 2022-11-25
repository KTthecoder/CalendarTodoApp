import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import './App.css'
import AuthProvider from "./contexts/AuthProvider";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    // <BrowserRouter>
    <>
    <ScrollToTop/>
      <AuthProvider>
        <Navigation/>
      </AuthProvider>
    </>
      
    // </BrowserRouter>
  );
}

export default App;
