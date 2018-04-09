import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {View} from 'react-native';
import {StackNavigator} from 'react-navigation';

import reducer from './reducers';
import DeckListView from './components/DeckListView';
import DeckView from './components/DeckView';
import QuizView from './components/QuizView';
import AddCard from './components/AddCard';
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
        navigationOptions: {
            ...navigationOptions,
            title: "Flashcards"
        }
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
    AddCard: {
        screen: AddCard,
        navigationOptions: ({navigation}) => ({
            ...navigationOptions,
            title: `Add card to ${navigation.state.params.title}`
        })
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
