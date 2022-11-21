import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Navigation/>
    </BrowserRouter>
  );
}

export default App;
