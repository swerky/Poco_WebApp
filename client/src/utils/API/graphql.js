import ApolloClient from 'apollo-boost';

const URI = process.env.REACT_APP_API_URI;
const PORT = process.env.REACT_APP_API_PORT;
const URL = "http://" + URI + ":" + PORT;

const client = new ApolloClient({
  uri:  URL,
});

export default client;