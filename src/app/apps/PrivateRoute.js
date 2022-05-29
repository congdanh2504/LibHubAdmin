import { Redirect, Route } from "react-router-dom";
import { getToken, getUser } from "../../api/Common"
import React from 'react';

function PrivateRoute({component: Component, ...rest}) {
  return (
      <Route 
      {...rest}
      render={props => {
          return getToken() ? <Component {...props}/>
          : <Redirect to= {{ pathname:'/user-pages/login-1', state: { from: props.location}}}/>
      }}
      />
  )
}

export default PrivateRoute