import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  graphql,
  ApolloProvider,
} from 'react-apollo';
import ApolloClient from 'apollo-client-preset';
import gql from 'graphql-tag';
import {
  makeExecutableSchema,
  addMockFunctionsToSchema
} from 'graphql-tools';
import { mockNetworkInterfaceWithSchema } from 'apollo-test-utils';
import { typeDefs } from './schema';
const schema = makeExecutableSchema({ typeDefs });
addMockFunctionsToSchema({ schema });

const mockNetworkInterface = mockNetworkInterfaceWithSchema({ schema });



const client = new ApolloClient({
  networkInterface: mockNetworkInterface,
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            <ChannelsListWithData />
          </p>
        </div>
      </ApolloProvider>
    );
  }
}
const channelsListQuery = gql`
query ChannelsListQuery {
  channels {
    id
    name
  }
}
`
const ChannelsList = ({ data: { loading, error, channels }}) => {
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <ul>
      <li>Channel 1</li>
      <li>Channel 2</li>
    </ul>
  );
};

const ChannelsListWithData = graphql(channelsListQuery)(ChannelsList);

export default App;