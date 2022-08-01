import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';



function ProtectedRoute({ children }) {


  const token = useSelector((store) => store.token);

  return !!token ?

    children

    : (
      <Navigate to="/login" />
    );




 
}

export default ProtectedRoute;
