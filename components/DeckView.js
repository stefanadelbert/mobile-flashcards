import React from 'react';
import {connect} from 'react-redux';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {
    Card,
    Icon,
} from 'react-native-elements';

import {white, brand, grey, red, blue} from '../utils/colors';
import {within24hrs} from '../utils/helpers';

class DeckView extends React.Component {
    constructor(props) {
        super(props);
        this.alertButton = <Icon
            name='warning'
            type='material'
            iconStyle={{color: brand}}
        />
    }
    render() {
        const {title} = this.props.navigation.state.params;
        const {description, questions} = this.props.deck;
        const startQuizButton = <Icon
            raised
            name='play-arrow'
            type='material'
            onPress={() => this.props.navigation.navigate(
                'Quiz', {title, questions}
            )} 
        />
        const addCardButton = <Icon
            raised
            name='add'
            type='material'
            onPress={() => this.props.navigation.navigate(
                'AddCard', {title}
            )} 
        />
        console.log(this.props);
        const displayAlert = (
            this.props.quiz === undefined || !within24hrs(this.props.quiz.date, Date.now())
        );
        return (
            <View style={{flex: 1}}>
                <Card
                    title={title}
                    containerStyle={{marginTop: 30, marginBottom: 30, borderBottomWidth: 5, borderRightWidth: 5}}
                    style={{}}
                >
                    <View style={{position: "absolute", top: 0, right: 0}}>
                        {displayAlert && this.alertButton}
                    </View>
                    <Text style={styles.subtitle}>{questions.length} cards</Text>
                    <Text style={styles.body}>{description}</Text>
                </Card>
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
        fontSize: 18,
        textAlign: "center",
        color: grey,
    },
    body: {
        fontSize: 12,
        fontStyle: "italic",
        textAlign: "justify",
        margin: 20,
        color: grey,
    },
})

function mapStateToProps (state, props) {
    const {decks, quiz} = state;
    console.log('DeckView.mapStateToProps', state, decks, quiz);
    const {title} = props.navigation.state.params;
    return {
        deck: decks[title],
        quiz: quiz[title],
    }
}

export default connect(
    mapStateToProps
)(DeckView)
