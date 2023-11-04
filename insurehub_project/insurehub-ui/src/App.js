import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreatePolicyPage from './pages/CreatePolicyPage';
import EditPolicyPage from './pages/EditPolicyPage';

function App() {
  const [policyToEdit, setPolicyToEdit] = useState();

  return (
    <div className="App">
      <Router>
      <h1>InsureHub</h1>
        <h3>Manage your insurance polices smartly!</h3>
        <div className="App-header">          
		  <Routes>
          <Route path="/" element={<HomePage setPolicyToEdit={setPolicyToEdit}/>}/>
          <Route path="/add-policy" element={<CreatePolicyPage />}/>
          <Route path="/edit-policy" element={ <EditPolicyPage policyToEdit={policyToEdit} />}/>
		  </Routes>
          </div>
      </Router>
      
      <footer>© 2023 Yi-Han, Hsiung</footer>
    </div>
  );
}

export default App;