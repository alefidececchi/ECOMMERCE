// import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/home.jsx"



function App() {
  return (
    <div className="App">
      

      
      <Routes>

        <Route path="home" element={< Home />} />

      </Routes>
    </div>
  );
}

export default App;
