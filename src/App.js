import React from 'react';
import './App.css';
import AppContainer from './containers/AppContainer'
import Header from './components/Header'
import Footer from './components/Footer';
require('dotenv').config()


function App() {
  return (
    <div>
      <Header/>
      <AppContainer />
      <Footer/>
    </div>
  );
}

export default App;
