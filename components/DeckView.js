import React from 'react';
import {connect} from 'react-redux';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {
    Button,
    Divider,
} from 'react-native-elements';

import {white, grey, red, blue} from '../utils/colors';

class DeckView extends React.Component {
    render() {
        const {title} = this.props.navigation.state.params;
        const {questions} = this.props.deck;
        return (
            <View style={{justifyContent: "center", alignItems: "center"}}>
                <View style={{marginTop: 30, marginBottom: 30}}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subtitle}>{questions.length} cards</Text>
                </View>
                <Button
                    title={"Add Card"}
                    onPress={() => this.props.navigation.navigate(
                        'AddCard', {title}
                    )} 
                    buttonStyle={styles.button}
                />
                <Button
                    title={"Start Quiz"}
                    onPress={() => this.props.navigation.navigate(
                        'Quiz', {title, questions}
                    )} 
                    buttonStyle={styles.button}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        alignItems: "center",
    },
    title: {
        fontSize: 36,
    },
    subtitle: {
        fontSize: 24,
        color: grey,
    },
    button: {
        width: 100,
        height: 30,
        margin: 10,
    }
})

function mapStateToProps (state, props) {
    const {title} = props.navigation.state.params;
    return {
        deck: state[title]
    }
}

export default connect(
  mapStateToProps
)(DeckView)
