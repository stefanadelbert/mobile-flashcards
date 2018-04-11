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

export default class LocalStorage extends React.Component {
    state = {
        decks: {}
    }
    constructor(props) {
        super(props);
        API.getDecks().then((decks) => this.setState({decks}));

        this.resetDecks = <Icon
            raised
            name='undo'
            type='material'
            onPress={() => API.resetDecks()}
        />
        this.reloadDecks = <Icon
            raised
            name='refresh'
            type='material'
            onPress={() => API.getDecks().then((decks) => this.setState({decks}))}
        />
    }
    render() {
        console.log('LocalStorage.render', this.state);
        return (
            <View style={{flex: 1}}>
                <View style={{flexDirection: "row", justifyContent: "flex-end"}}>
                    {this.reloadDecks}
                    {this.resetDecks}
                </View>
                <ScrollView style={{ flex: 1, margin: 10, backgroundColor: "#333" }}>
                    <Text style={{fontSize: 12, fontFamily: "monospace", color: "white"}}>{JSON.stringify(this.state.decks, null, 2)}</Text>
                </ScrollView>
            </View>
        )
    }
}
