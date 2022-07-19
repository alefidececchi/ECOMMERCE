import './App.css';
import { Routes, Route } from "react-router-dom";
import AddBook from './components/addBook/addBook.jsx';
function App() {
  return (
    <div className="App">
  
      <Routes>
        <Route  path='/' element={<AddBook/>}/>
      </Routes>
    </div>
  ); 
}

export default App;
