import React , {useState} from 'react';
import './App.css';
import AppContainer from './containers/AppContainer'
import Header from './components/Header'
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
require('dotenv').config()


function App() {
  const [start, setStart] = useState(false);

  const handleStart = () => setStart(true)


  return (
    <div>
      <Header/>
      {start?
      <AppContainer />
      :
      <LandingPage handleStart={handleStart}/>
      }
      <Footer/>
    </div>
  );
}

export default App;
