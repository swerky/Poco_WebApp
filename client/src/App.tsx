import React from 'react';
import './App.css';
import { BrowserRouter as Router} from "react-router-dom";
import MyRouter from './utils/Router/MyRouter';
import MyLayout from './utils/Layout/MyLayout';

const App: React.FC = () => {
  return (
    <Router>
      <MyLayout>
        <MyRouter/>
      </MyLayout>
    </Router>
  );
}

export default App;
