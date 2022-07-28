import './App.css';
import 'react-toastify/dist/ReactToastify.css'
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/home.jsx';
import NavBar from './components/NavBar/navBar.jsx';
import Shopping from './components/Shopping/shopping.jsx';
import User from './components/User/user.jsx';
import WishList from './components/WishList/wishList.jsx';
import AddBook from './components/BookForm/addBook.jsx'
import Register from "./components/Register/register"
import Login from './components/Register/login';
import Activate from "./components/Register/activate"
import Forgot from "./components/Register/forgot"
import Reset from "./components/Register/reset"
import { ToastContainer } from 'react-toastify'
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';


function App() {
<<<<<<< HEAD
  const [user,setUser]= useState({});

  function handleCallbackResponse(response){
    console.log("Encoded JWT ID token: "+response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden=true;
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden=false;
  }

  useEffect(()=>{
    google.accounts.id.initialize({
      client_id: '7254200664-eqfkintn8s5ltn1i8c12finsmbkgkj6i.apps.googleusercontent.com',
      callback: handleCallbackResponse
    });
  
    google.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      { theme: "outline", size: "large"}
    );

    google.accounts.id.prompt();
  }, []);
  // If we have no user: sign in button
  // If we have a user: show the log out button

  return (
    <div className="App">
      <div id='signInDiv'></div>
      {Object.keys(user).length != 0 &&
      <button onClick={(e)=>handleSignOut(e)}>Sign Out</button>
      }
      { user && 
        <div>
          <img src={user.picture}></img>
          <h3>{user.name}</h3>
        </div>}
    <ToastContainer />
     <Routes>
     
      <Route path='/' element={< NavBar />}>
        <Route path="/" element={< Home />} />
        <Route path='shopping' element={< Shopping />} />
        <Route path='user' element={< User />} />
        <Route path='user/newBook' element={< AddBook />} />
        <Route path='wish' element={< WishList />} />
      </Route>
     </Routes>
=======
  
  return (
    <div className="App">
      <ToastContainer />
      <Routes>

        <Route path='/' element={< NavBar />}>
          <Route path="/" element={< Home />} />
          <Route path='shopping' element={< Shopping />} />
          <Route path='user' element={< User />} />
          <Route path='user/newBook' element={< AddBook />} />
          <Route path='wish' element={< WishList />} />

        </Route>

        <Route path='register' element={< Register />} />
        <Route path='activate-account' element={< Activate />} />
        <Route path='activate-account/:token' element={< Activate/>} />
        <Route path='login' element={< Login />} />
        <Route path='forgot-password' element={< Forgot />} />
        <Route path='reset-password/:token' element={< Reset />} />
      </Routes>
>>>>>>> us-FRONTlog
    </div>
  );
}

export default App;
