import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div class = "login">
      <h2>Welcome to Aadhar Database Services</h2>
      <h3>Login</h3>
      <button class = "button" ><Link class = "links" to = "/user">User</Link></button>
      <button class = "button" ><Link class = "links" to = "/admin">Admin</Link></button>
    </div>
  )
}

export default Login