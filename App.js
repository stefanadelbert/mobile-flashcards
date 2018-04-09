import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { View } from 'react-native';

import reducer from './reducers';
import Decks from './components/Decks';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <Decks />
        </View>
      </Provider>
    );
  }
}
