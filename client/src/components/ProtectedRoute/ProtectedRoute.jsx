import React, { useEffect, useState } from 'react';
import { Route, RouteProps, Redirect, useRouteMatch } from 'react-router-dom';
import { useAuthUser } from '../queries/account';
import { useStore, setShelterId } from '../store';
import find from 'lodash/find';




function ProtectedRoute() {




    // const intitialState = {
    //     authenticated: false
    //   };
   
    // if (isError || hasAccess === false)
    if (!token) {
        return <Redirect to="/signin" />;
    }
    // if (hasAccess === true) 
    if (token) {
        return (
            <Route path={path} {...rest}>
                {children}
            </Route>
        );
    }

    return <div>Loading</div>;
}

export default ProtectedRoute;
