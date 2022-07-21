import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/home.jsx';
import NavBar from './components/NavBar/navBar.jsx';
import Shopping from './components/Shopping/shopping.jsx';
import User from './components/User/user.jsx';
import WishList from './components/WishList/wishList.jsx';


function App() {
  return (
    <div className="App">
     <Routes>
      <Route path='/' element={< NavBar />}>
        <Route path="home" element={< Home />} />
        <Route path='shopping' element={< Shopping />} />
        <Route path='user' element={< User />} />
        <Route path='wish' element={< WishList />} />
      </Route>
     </Routes>
    </div>
  ); 
}

export default App;
