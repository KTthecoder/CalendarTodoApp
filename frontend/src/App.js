import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import './App.css'
import AuthProvider from "./contexts/AuthProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navigation/>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
