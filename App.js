import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {View} from 'react-native';
import {StackNavigator} from 'react-navigation';

import reducer from './reducers';
import DeckListView from './components/DeckListView';
import DeckView from './components/DeckView';
import {black, brand} from './utils/colors';

const navigationOptions = {
    headerTintColor: black,
    headerStyle: {
        backgroundColor: brand,
    }
}
const MainNavigator = StackNavigator({
    DeckList: {
        screen: DeckListView,
        navigationOptions 
    },
    Deck: {
        screen: DeckView,
        navigationOptions
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
