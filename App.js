import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {View} from 'react-native';
import {StackNavigator} from 'react-navigation';

import reducer from './reducers';
import DeckListView from './components/DeckListView';
import DeckView from './components/DeckView';
import {white, purple} from './utils/colors';

const MainNavigator = StackNavigator({
  DeckList: {
    screen: DeckListView,
  },
  Deck: {
    screen: DeckView,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  }
})

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
            <MainNavigator />
        </View>
      </Provider>
    );
  }
}
