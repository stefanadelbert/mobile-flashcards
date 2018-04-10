import React from 'react';
import {connect} from 'react-redux';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {
    Icon,
} from 'react-native-elements';

import {white, grey, red, blue} from '../utils/colors';

class DeckView extends React.Component {
    render() {
        const {title} = this.props.navigation.state.params;
        const {questions} = this.props.deck;
        startQuizButton = <Icon
            raised
            name='play-arrow'
            type='material'
            onPress={() => this.props.navigation.navigate(
                'Quiz', {title, questions}
            )} 
        />
        addCardButton = <Icon
            raised
            name='add'
            type='material'
            onPress={() => this.props.navigation.navigate(
                'AddCard', {title}
            )} 
        />
        return (
            <View style={{flex: 1, alignItems: "stretch"}}>
                <View style={{marginTop: 30, marginBottom: 30}}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subtitle}>{questions.length} cards</Text>
                </View>
                <View style={{flexGrow: 1, flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end"}}>
                    {addCardButton}
                    {startQuizButton}
                </View>
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
        textAlign: "center",
    },
    subtitle: {
        fontSize: 24,
        textAlign: "center",
        color: grey,
    },
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
