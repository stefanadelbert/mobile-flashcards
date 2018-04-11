import React from 'react';
import {
    Text,
    View,
    ScrollView,
} from 'react-native';
import {
    Icon,
} from 'react-native-elements';

import * as API from '../utils/api';

class Decks extends React.Component {
    state = {
        decks: {}
    }
    constructor(props) {
        super(props);
        API.getDecks().then((decks) => this.setState({decks}));

        this.reset = <Icon
            name='undo'
            type='material'
            iconStyle={{color: "white"}}
            onPress={() => API.resetDecks()}
        />
        this.reload = <Icon
            name='refresh'
            type='material'
            iconStyle={{color: "white"}}
            onPress={() => API.getDecks().then((decks) => this.setState({decks}))}
        />
    }
    render() {
        console.log('LocalStorage.render', this.state);
        return (
            <View style={{flex: 1, margin: 5}}>
                <View style={{flexDirection: "row", justifyContent: "flex-end", padding: 2, backgroundColor: "#444"}}>
                    <View style={{flexGrow: 1}}><Text style={{color: "white"}}>Decks</Text></View>
                    {this.reload}
                    {this.reset}
                </View>
                <ScrollView style={{ flex: 1, backgroundColor: "#333" }}>
                    <Text style={{fontSize: 12, fontFamily: "monospace", color: "white"}}>{JSON.stringify(this.state.decks, null, 2)}</Text>
                </ScrollView>
            </View>
        )
    }
}

class Quiz extends React.Component {
    state = {
        quiz: {}
    }
    constructor(props) {
        super(props);
        API.getQuizzes().then((quiz) => this.setState({quiz}));
        this.reload = <Icon
            name='refresh'
            type='material'
            iconStyle={{color: "white"}}
            onPress={() => API.getQuizzes().then((quiz) => this.setState({quiz}))}
        />
    }
    render() {
        console.log('LocalStorage.render', this.state);
        return (
            <View style={{flex: 1, margin: 5}}>
                <View style={{flexDirection: "row", justifyContent: "flex-end", padding: 2, backgroundColor: "#444"}}>
                    <View style={{flexGrow: 1}}><Text style={{color: "white"}}>Quiz</Text></View>
                    {this.reload}
                </View>
                <ScrollView style={{ flex: 1, backgroundColor: "#333"}}>
                    <Text style={{fontSize: 12, fontFamily: "monospace", color: "white"}}>{JSON.stringify(this.state.quiz, null, 2)}</Text>
                </ScrollView>
            </View>
        )
    }
}

export default class LocalStorage extends React.Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <Decks />
                <Quiz />
            </View>
        )
    }
}

