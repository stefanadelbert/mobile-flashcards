import React from 'react';
import {connect} from 'react-redux';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import {white, grey, red, blue} from '../utils/colors';

function Button({onPress, children}) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  )
}

export default class DeckView extends React.Component {
    render() {
        const {title, questions} = this.props.navigation.state.params;
        return (
            <View style={styles.viewContainer}>
                <View style={styles.header}>
                    <Text style={styles.deckTitle}>{title}</Text>
                    <Text style={styles.cardCount}>{questions.length} cards</Text>
                </View>
                <View>
                    <Button>Add Card</Button>
                    <Button>Start Quiz</Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        padding: 20,
        backgroundColor: white
    },
    header: {
        justifyContent: "space-around",
        alignItems: "center",
    },
    deckTitle: {
        fontSize: 24,
    },
    cardCount: {
        color: grey,
        fontSize: 18,
    },
    buttonGroup: {
        justifyContent: "space-between",
        alignItems: "center",
    },
    button: {
        backgroundColor: white,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
    }
})
