import React from 'react';
import './styles/index.scss';
import Navbar from './components/Navbar';
import FormContainer from './containers/Form-Cotainer';

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <FormContainer />
    </React.Fragment>
    
  );
}

export default App;
