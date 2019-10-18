import React from 'react';
import './App.css';
import { BrowserRouter as Router} from "react-router-dom";
import MyRouter from './utils/Router/MyRouter';
import MyLayout from './utils/Layout/MyLayout';
import { ApolloProvider } from '@apollo/react-hooks';
import client from './utils/API/graphql';

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <MyLayout>
          <MyRouter/>
        </MyLayout>
      </Router>
    </ApolloProvider>
  );
}

export default App;
