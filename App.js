import React from 'react';
import {createStore, compose, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {View} from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation';

import reducer from './reducers';
import DeckListView from './components/DeckListView';
import DeckView from './components/DeckView';
import QuizView from './components/QuizView';
import AddCard from './components/AddCard';
import AddDeck from './components/AddDeck';
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
        navigationOptions: ({navigation}) => ({
            ...navigationOptions,
            title: "Decks"
        })
    },
    Deck: {
        screen: DeckView,
        navigationOptions: ({navigation}) => ({
            ...navigationOptions,
            title: `${navigation.state.params.title}`
        })
    },
    Quiz: {
        screen: QuizView,
        navigationOptions: ({navigation}) => ({
            ...navigationOptions,
            title: `Quiz for ${navigation.state.params.title}`
        })
    },
    AddDeck: {
        screen: AddDeck,
        navigationOptions: ({navigation}) => ({
            ...navigationOptions,
            title: "Add Deck",
        })
    },
    AddCard: {
        screen: AddCard,
        navigationOptions: ({navigation}) => ({
            ...navigationOptions,
            title: `Add card to ${navigation.state.params.title}`
        })
    }
})

const store = createStore(
    reducer,
    compose(
        applyMiddleware(
            thunk
        )
	)
);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
            <MainNavigator />
        </View>
      </Provider>
    );
  }
}
