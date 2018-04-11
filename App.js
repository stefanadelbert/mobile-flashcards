import React from 'react';
import {createStore, compose, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {View} from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation';

import reducer from './reducers';
import {loadDecks, loadQuizzes} from './actions';
import DeckListView from './components/DeckListView';
import DeckView from './components/DeckView';
import QuizView from './components/QuizView';
import AddCard from './components/AddCard';
import AddDeck from './components/AddDeck';
import {black, brand} from './utils/colors';

import LocalStorage from './components/LocalStorage';

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

const DevNavigator = TabNavigator({
  Home: { screen: MainNavigator },
  Dev: { screen: LocalStorage },
});

const store = createStore(
    reducer,
    compose(
        applyMiddleware(
            thunk
        )
	)
);

store.dispatch(loadDecks());
store.dispatch(loadQuizzes());

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
            <DevNavigator />
        </View>
      </Provider>
    );
  }
}
