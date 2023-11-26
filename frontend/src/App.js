import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Pages/Login';
import Admin from './Pages/Admin';
import Home from './Pages/Home';
import Add from './Pages/Add';
import Delete from './Pages/Delete';
import Update from './Pages/Update';
import Update1 from './Pages/Update1';
import User from './Pages/User';
import Show from './Pages/Show';
import "./style.css";
import Ecentre from './Pages/Ecentre';
import Enrolls from './Pages/Enrolls';
import Queries from './Pages/Queries';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/admin/add" element = {<Add/>}/>
          <Route path="/admin/delete" element = {<Delete/>}/>
          <Route path ="/admin/delete/update/:id" element = {<Update/>}/>
          <Route path ="/admin/delete/update1/:id" element = {<Update1/>}/>
          <Route path ="/user" element = {<User/>}/>
          <Route path="/show/:id" element = {<Show/>}/>
          <Route path = "/enrollmentCentre" element= {<Ecentre/>} />
          <Route path = "/enrolls" element = {<Enrolls/>} />
          <Route path = "/admin/queries" element = {<Queries/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
