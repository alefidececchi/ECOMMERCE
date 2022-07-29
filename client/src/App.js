import './App.css';
import 'react-toastify/dist/ReactToastify.css'
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/home.jsx';
import NavBar from './components/NavBar/navBar.jsx';
import Shopping from './components/Shopping/shopping.jsx';
import User from './components/User/user.jsx';
import WishList from './components/WishList/wishList.jsx';
import AddBook from './components/BookForm/addBook.jsx'
import { ToastContainer } from 'react-toastify'
import CheckoutSuccess from './components/Shopping/CheckoutSuccess';



function App() {
  return (
    <div className="App">
    <ToastContainer />
     <Routes>
     
      <Route path='/' element={< NavBar />}>
        <Route path="/" element={< Home />} />
        <Route path='shopping' element={< Shopping />} />
        <Route path='shopping/checkout-success' element={< CheckoutSuccess />}/>
        <Route path='user' element={< User />} />
        <Route path='user/newBook' element={< AddBook />} />
        <Route path='wish' element={< WishList />} />
      </Route>
     </Routes>
    </div>
  ); 
}

export default App;
