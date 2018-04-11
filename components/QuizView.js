import React from 'react';
import {connect} from 'react-redux';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
} from 'react-native';
import {
    Button,
    Card,
    Icon,
} from 'react-native-elements';

import {completeQuiz} from '../actions';
import {white, grey, lightRed, red, lightGreen, green} from '../utils/colors';

var Verdict = {
  UNKNOWN: 1,
  CORRECT: 2,
  INCORRECT: 3,
};

function verdictToColor(verdict) {
    switch(verdict) {
        case Verdict.CORRECT:
            return lightGreen;
        case Verdict.INCORRECT:
            return lightRed;
        default:
            return white;
    }
}

class QuizCard extends React.Component {
    constructor(props) {
        super(props);
        this.flipButton = <Icon
            raised
            name='rotate-right'
            type='material'
            containerStyle={{alignSelf: "flex-end"}}
            onPress={() => this.setState({flipped: !this.state.flipped})}
        />
        this.correctButton = <Icon
            raised
            name='check'
            type='material'
            containerStyle={{alignSelf: "flex-end"}}
            iconStyle={{color: green}}
            onPress={() => this.setVerdict(Verdict.CORRECT)}
        />
        this.incorrectButton = <Icon
            raised
            name='clear'
            type='material'
            containerStyle={{alignSelf: "flex-end"}}
            iconStyle={{color: red}}
            onPress={() => this.setVerdict(Verdict.INCORRECT)}
        />
    }
    state = {
        flipped: false,
        verdict: Verdict.UNKNOWN
    }
    setVerdict = (verdict) => {
        this.setState({verdict});
        this.props.onChangeVerdict(verdict);
    }
    render() {
        let cardContent = undefined;
        if (!this.state.flipped) {
            cardContent = <View>
                <Text>{this.props.question}</Text>
                {this.flipButton}
            </View>
        } else {
            cardContent = <View>
                <Text>{this.props.answer}</Text>
                <View style={{flexDirection: "row", justifyContent: "flex-end"}}>
                    {this.flipButton}
                    {this.incorrectButton}
                    {this.correctButton}
                </View>
            </View>
        }
        let cardColor = verdictToColor(this.state.verdict);
        return (
            <Card containerStyle={{padding: 10, backgroundColor: cardColor}}>
                {cardContent} 
            </Card>
        )
    }
}

const QuizProgress = (props) => {
    var numberCorrect = props.verdicts.reduce(
        (n, verdict) => n + (verdict === Verdict.CORRECT),
        0
    );
    return (
        <View style={quizProgressStyle.container}>
            <Text style={quizProgressStyle.text}>
                {numberCorrect} / {props.verdicts.length}
            </Text>
        </View>
    )
}   

class QuizComplete extends React.Component {
    constructor(props) {
        super(props);
        this.props.onCompleteQuiz(this.props.title);
    }
    render() {
        const numberCorrect = this.props.verdicts.reduce(
            (n, verdict) => n + (verdict === Verdict.CORRECT),
            0
        );
        const numberIncorrect = this.props.verdicts.reduce(
            (n, verdict) => n + (verdict === Verdict.INCORRECT),
            0
        );
        const finishButton = <Icon
            raised
            name='check'
            type='material'
            onPress={() => this.props.goBack()}
        />
        const repeatButton = <Icon
            raised
            name='repeat'
            type='material'
            onPress={this.props.onRepeat}
        />
        const correctIcon = <Icon
            name='check'
            type='material'
            iconStyle={{color: green, fontSize: 18}}
        />
        const incorrectIcon = <Icon
            name='clear'
            type='material'
            iconStyle={{color: red, fontSize: 12}}
        />
        return <View style={{flex: 1, alignItems: "stretch"}}>
            <Text style={{textAlign: "center", fontSize: 24, margin: 20}}>Quiz complete</Text> 
            <View style={{flexDirection:"row", justifyContent: "center", alignItems: "center"}}>
                <View style={[quizCompleteStyle.tally, {backgroundColor: lightGreen}]}>
                    {correctIcon}
                    <Text>{numberCorrect}</Text> 
                </View>
                <View style={[quizCompleteStyle.tally, {backgroundColor: lightRed}]}>
                    {incorrectIcon}
                    <Text>{numberIncorrect}</Text> 
                </View>
            </View>
            <View style={{flexGrow: 1, flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end"}}>
                {repeatButton}
                {finishButton}
            </View>
        </View>
    }
}

class QuizView extends React.Component {
    state = {
        verdicts: []
    }
    constructor(props) {
        super(props);
        const {questions} = props.navigation.state.params;
        this.state.verdicts = questions.map(() => Verdict.UNKNOWN);
    }
    onChangeVerdict = (index, verdict) => {
        this.setState({
            verdicts: Object.assign([], this.state.verdicts, {[index]: verdict})
        });
    }
    quizComplete = (verdicts) => {
        return 0 == verdicts.reduce(
            (n, i) => n + (i === Verdict.UNKNOWN),
            0
        );
    } 
    resetQuiz = () => {
        this.setState({verdicts: this.state.verdicts.map(() => Verdict.UNKNOWN)});
    }
    render() {
        const {title, questions} = this.props.navigation.state.params;
        if (this.quizComplete(this.state.verdicts)) {
            return <View style={{flex: 1}}>
                <QuizComplete
                    title={title}
                    verdicts={this.state.verdicts}
                    onCompleteQuiz={this.props.completeQuiz}
                    onRepeat={this.resetQuiz}
                    goBack={this.props.navigation.goBack}
                />
            </View>
        }
        return (
            <View>
                <QuizProgress verdicts={this.state.verdicts}/>
                <FlatList
                    style={quizViewStyle.list}
                    data={questions}
                    keyExtractor={(item, index) => `${index}`}
                    renderItem={({item, index}) => (
                        <QuizCard
                            question={item.question}
                            answer={item.answer}
                            onChangeVerdict={(verdict) => this.onChangeVerdict(index, verdict)}
                        />
                    )}
                />
            </View>
        );
    }
}

function mapDispatchToProps(dispatch) {
  return {
    completeQuiz: (title, score) => dispatch(completeQuiz(title, score)),
  }
}

export default connect(null, mapDispatchToProps)(QuizView);

const style =  StyleSheet.create({
    centered: {
        justifyContent: "center",
        alignItems: "center",
    }
})
const quizViewStyle =  StyleSheet.create({
    list: {
        marginTop: 0,
        borderTopWidth: 0,
        borderBottomWidth: 0,
    },
});
const quizProgressStyle = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: grey,
        fontSize: 18,
        padding: 5,
    }
})
const quizCompleteStyle =  StyleSheet.create({
    tally: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 0,
        borderRadius: 10,
        height: 50,
        minWidth: 50,
        margin: 10,
    },
});
