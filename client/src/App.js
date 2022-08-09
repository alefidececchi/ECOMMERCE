import './App.css';
import 'react-toastify/dist/ReactToastify.css'
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/home.jsx';
import NavBar from './components/NavBar/navBar.jsx';
import Shopping from './components/Shopping/shopping.jsx';
import User from './components/User/user.jsx';
import WishList from './components/WishList/wishList.jsx';
import AddBook from './components/BookForm/addBook.jsx'

import PostedBooks from './components/User/userComponents/PostedBooks/postedBooks';
//import SideBar from './components/User/sideBar';
import MyGiftCards from './components/User/userComponents/MyGiftCards/myGiftCards';
import MyWishList from './components/User/userComponents/MyWishList/myWishList';
import Purchases from './components/User/userComponents/Purchases/purchases';
import Discounts from './components/User/userComponents/Discount/discounts';
import Payment from './components/User/userComponents/Payment/payment';

import GiftCard from './components/GiftCard/giftCard';
import Register from "./components/Register/register"
import Login from './components/Register/login';
import Activate from "./components/Register/activate"
import Forgot from "./components/Register/forgot"
import Reset from "./components/Register/reset"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"
import ContactUs from './components/Contact/contactUs';
import { ToastContainer } from 'react-toastify'

import ActivateAccount from './components/Register/activate-account';
import ResetPassword from './components/Register/reset-password';

import CheckoutSuccess from './components/Shopping/CheckoutSuccess';
import Leaflet from './components/Leaflet/basic';

// import Darkmode from 'darkmode-js';

// new Darkmode().showWidget();
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
        <Route path='/user/sales' element={< PostedBooks />}/>
        <Route path='/user/myGiftCards' element={< MyGiftCards />}/> 
        <Route path='/user/myWishList' element={< MyWishList />}/>
        <Route path='/user/purchases' element={< Purchases />}/>
        <Route path='/user/discounts' element={< Discounts />}/>
        <Route path='/user/payment' element={< Payment />}/>
        <Route path='user/newBook' element={< AddBook />} />
        <Route path='contact' element={< ContactUs />} />
        <Route path='wish' element={< WishList />} />
        <Route path='gift' element={< GiftCard />} />
        <Route path='locations' element={< Leaflet />} />
    </Route>  
        <Route path='register' element={< Register />} />
        <Route path='activate' element={< ActivateAccount />} />
        <Route path='activate-account/:token' element={< Activate />} />
        <Route path='login' element={< Login />} />
        <Route path='forgot-password' element={< Forgot />} />
        <Route path='reset' element={< ResetPassword />} />
        <Route path='reset-password/:token' element={< Reset />} />

      </Routes>

    </div>
  );
}

export default App;





