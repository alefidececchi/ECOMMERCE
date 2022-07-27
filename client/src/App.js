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
import PostedBooks from './components/User/userComponents/PostedBooks/postedBooks';
//import SideBar from './components/User/sideBar';
import MyGiftCards from './components/User/userComponents/MyGiftCards/myGiftCards';
import MyWishList from './components/User/userComponents/MyWishList/myWishList';
import Purchases from './components/User/userComponents/Purchases/purchases';
import Discounts from './components/User/userComponents/Discount/discounts';
import Payment from './components/User/userComponents/Payment/payment';


function App() {
  return (
    <div className="App">
    <ToastContainer />
     <Routes>
      <Route path='/' element={< NavBar />}>
        <Route path="/" element={< Home />} />
        <Route path='shopping' element={< Shopping />} />
        <Route path='user' element={< User />}/>
        <Route path='/user/sales' element={< PostedBooks />}/>
        <Route path='/user/myGiftCards' element={< MyGiftCards />}/> 
        <Route path='/user/myWishList' element={< MyWishList />}/>
        <Route path='/user/purchases' element={< Purchases />}/>
        <Route path='/user/discounts' element={< Discounts />}/>
        <Route path='/user/payment' element={< Payment />}/>
        <Route path='user/newBook' element={< AddBook />} />
        <Route path='wish' element={< WishList />} />
      </Route>
     </Routes>
    </div>
  ); 
}

export default App;
