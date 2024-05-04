import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreatePolicyPage from './pages/CreatePolicyPage';
import EditPolicyPage from './pages/EditPolicyPage';
import ViewPolicyPage from './pages/ViewPolicyPage';

// App component
function App() {
  // State variables to hold data about the policy to edit and view
  const [policyToEdit, setPolicyToEdit] = useState();
  const [policyToView, setPolicyToView] = useState();

  // Rendering the component
  return (
    <div className="App">
      <Router>
      <h1>InsureHub</h1>
        <h3>Manage your insurance polices smartly!</h3>
        <div className="App-header">          
		  <Routes>
          <Route path="/" element={<HomePage setPolicyToEdit={setPolicyToEdit} setPolicyToView={setPolicyToView}/>}/>
          <Route path="/add-policy" element={<CreatePolicyPage />}/>
          <Route path="/edit-policy" element={ <EditPolicyPage policyToEdit={policyToEdit} />}/>
          <Route path="/view-policy" element={ <ViewPolicyPage policyToView={policyToView} />}/>
		  </Routes>
          </div>
      </Router>
      
      <footer>© 2023 Yi-Han, Hsiung</footer>
    </div>
  );
}

export default App;