import React from "react";

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import PrivateRoute from '../src/utils/PrivateRoute'
import { AuthProvider } from "./context/AuthContext";


import Footer from '../src/components/Footer';
import NavBar from '../src/components/NavBar'
import Home from '../src/views/Home';
import Login from '../src/views/Login';
import Register from '../src/views/Register';
import ProtectedPage from '../src/utils/ProtectedPage';

function App() {

  return (
    
    <Router>
      <AuthProvider>
        <NavBar />
        <Switch>
          <PrivateRoute component={ProtectedPage} path='/protected' exact />
          <Route component={Login} path="/login" />
          <Route component={Register} path='/register' />
          <Route component={Home} path="/" />
        </Switch>
      </AuthProvider>
      <Footer />
    </Router>

  )
}

export default App
