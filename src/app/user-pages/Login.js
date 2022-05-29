import React, { Component, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { login } from '../../api/AuthAPI';
import { setToken } from '../../api/Common'

export function Login() {
  const [auth, setAuth] = useState({email: "", password: ""});
  const [error, setError] = useState(null)
  const history = useHistory();

  const changeInput = (e) => {
    setAuth({...auth, [e.target.name] : e.target.value})
  }

  const onSignIn = (e) => {
    e.preventDefault()
    login(auth.email, auth.password).then( res => {
      setToken(res.data)
      history.push("/dashboard")
    }).catch(err => {
      setError("Invalid email or password!")
    })
  }

  return (
    <div>
      <div className="d-flex align-items-center auth px-0">
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div className="card text-left py-5 px-4 px-sm-5">
              <div className="brand-logo">
                <h2>LibHub</h2>
              </div>
              <h4>Hello! let's get started</h4>
              <h6 className="font-weight-light">Sign in to continue.</h6>
              <Form className="pt-3">
                <Form.Group className="d-flex search-field">
                  <Form.Control type="email" placeholder="Username" size="lg" className="h-auto" name="email" onChange={changeInput} />
                </Form.Group>
                <Form.Group className="d-flex search-field">
                  <Form.Control type="password" placeholder="Password" size="lg" className="h-auto" name="password" onChange={changeInput} />
                </Form.Group>
                <div className="mt-3">
                  <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" onClick={onSignIn}>SIGN IN</button>
                </div>
                {error && <div className='text-danger'>{error}</div>}
                <div className="my-2 d-flex justify-content-between align-items-center">
                  <div className="form-check">
                    <label className="form-check-label text-muted">
                      <input type="checkbox" className="form-check-input"/>
                      <i className="input-helper"></i>
                      Keep me signed in
                    </label>
                  </div>
                  <a href="!#" onClick={event => event.preventDefault()} className="auth-link text-muted">Forgot password?</a>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>  
    </div>
  )
}

export default Login
