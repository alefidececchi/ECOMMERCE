import './App.css';
import 'react-toastify/dist/ReactToastify.css'
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/home.jsx';
import NavBar from './components/NavBar/navBar.jsx';
import Shopping from './components/Shopping/shopping.jsx';
import User from './components/User/user.jsx';
import WishList from './components/WishList/wishList.jsx';
import AddBook from './components/BookForm/addBook.jsx';
import GiftCard from './components/GiftCard/giftCard';
import Register from "./components/Register/register"
import Login from './components/Register/login';
import Activate from "./components/Register/activate"
import Forgot from "./components/Register/forgot"
import Reset from "./components/Register/reset"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"


import ActivateAccount from './components/Register/activate-account';
import ResetPassword from './components/Register/reset-password';
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
          <Route path='checkout-success' element={< CheckoutSuccess />}/>
          <Route path='/user' element={< ProtectedRoute><User /> </ProtectedRoute>} />
          <Route path='user/newBook' element={< AddBook />} />
          <Route path='wish' element={< WishList />} />
          <Route path='gift' element={< GiftCard />} />
        </Route>

        <Route path='register' element={< Register />} />
        <Route path='activate' element={< ActivateAccount />} />
        <Route path='activate-account/:token' element={< Activate />} />
        <Route path='login' element={< Login />} />
        <Route path='forgot-password' element={< Forgot />} />
        <Route path='reset' element={< ResetPassword />} />
        <Route path='reset-password/:token' element={< Reset />} />

      </Routes>

    </div >
  );
}

export default App;
