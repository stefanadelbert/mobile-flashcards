import React from 'react';
import {connect} from 'react-redux';
import {View, Text, TextInput} from 'react-native';
import {
    Button,
    FormLabel,
    FormInput,
} from 'react-native-elements';

import {addCardToDeck} from '../actions';

class AddCard extends React.Component {
    state = {
        question: "",
        answer: ""
    }
    submit = () => {
        const {addCardToDeck, goBack} = this.props;
        const {title} = this.props.navigation.state.params;
        const {question, answer} = this.state;
        console.log('AddCard.submit', title, question, answer);

        addCardToDeck(title, {question, answer});
        goBack();
    }
    render() {
        const {title} = this.props.navigation.state.params;
        return (
            <View>
                <FormLabel>Question</FormLabel>
                <FormInput onChangeText={(question) => this.setState({question})}/>
                <FormLabel>Answer</FormLabel>
                <FormInput onChangeText={(answer) => this.setState({answer})}/>
                <Button title="Submit" onPress={this.submit}/>
            </View>
        );
    }
}

function mapDispatchToProps(dispatch, { navigation }) {
  return {
    addCardToDeck: (title, card) => dispatch(addCardToDeck(title, card)),
    goBack: () => navigation.goBack(),
  }
}

export default connect(
  null,
  mapDispatchToProps,
)(AddCard)
