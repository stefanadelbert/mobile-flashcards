import React from 'react';
import {connect} from 'react-redux';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import {
    Card,
    Icon,
} from 'react-native-elements';

import {white, brand, grey, red, blue} from '../utils/colors';
import {within24hrs} from '../utils/helpers';

const LastQuizDate = (props) => {
    const time = (props.quiz === undefined)
        ?  <Text style={styles.lastQuizDateText}>Never</Text>
        : <Text style={styles.lastQuizDateText}>{new Date(props.quiz.date).toLocaleString()}</Text>
    return (
        <View style={{margin: 10, flexDirection: "row", justifyContent: "flex-end"}}>
            <Text style={styles.lastQuizDateText}>Last quiz: </Text>{time}
        </View>
    )
}

class DeckView extends React.Component {
    constructor(props) {
        super(props);
        this.alertButton = <Icon
            name='announcement'
            type='material'
            iconStyle={{color: brand}}
            containerStyle={{marginRight: 5}}
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
        const displayAlert = (
            this.props.quiz === undefined || !within24hrs(this.props.quiz.date, Date.now())
        );
        return (
            <View style={{flex: 1}}>
                {displayAlert &&
                    <View style={{marginTop: 20, flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                        {this.alertButton}<Text style={{fontStyle: "italic"}}>No recent quiz</Text>
                    </View>
                }
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Quiz', {title, questions})}
                >
                    <Card
                        title={title}
                        containerStyle={{borderBottomWidth: 5, borderRightWidth: 5}}
                    >
                        <Text style={styles.body}>{description}</Text>
                        <Text style={styles.footer}>{questions.length} cards</Text>
            </Card>
        </TouchableOpacity>
                <LastQuizDate quiz={this.props.quiz}/>
                <View style={{flexGrow: 1, flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end"}}>
                    {addCardButton}
                    {startQuizButton}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    body: {
        fontSize: 12,
        fontStyle: "italic",
        textAlign: "justify",
        margin: 20,
        color: grey,
    },
    footer: {
        fontSize: 12,
        fontStyle: "italic",
        textAlign: "right",
        marginRight: 20,
        marginLeft: 20,
        color: grey,
    },
    lastQuizDateText: {
        fontSize: 12,
        fontStyle: "italic",
        color: grey,
    }
})

function mapStateToProps (state, props) {
    const {decks, quizzes} = state;
    const {title} = props.navigation.state.params;
    return {
        deck: decks[title],
        quiz: quizzes[title],
    }
}

export default connect(
    mapStateToProps
)(DeckView)
