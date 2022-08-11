import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';



function ProtectedRoute({ children }) {


  const token = useSelector((store) => store.token);

  return !!token ?

    children

    : (
      <Navigate to="/login" />
    );




 
}

export default ProtectedRoute;
