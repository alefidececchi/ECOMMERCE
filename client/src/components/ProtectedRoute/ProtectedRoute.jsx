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




  // const intitialState = {
  //     authenticated: false
  //   };

  // // if (isError || hasAccess === false)
  // if (!token) {
  //     return <Redirect to="/signin" />;
  // }
  // // if (hasAccess === true) 
  // if (token) {
  //     return (
  //         <Route path={path} {...rest}>
  //             {children}
  //         </Route>
  //     );
  // }

  // return <div>Loading</div>;
}

export default ProtectedRoute;
