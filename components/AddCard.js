import React from 'react';
import {connect} from 'react-redux';
import {View, Text, TextInput} from 'react-native';
import {
    Button,
    FormLabel,
    FormInput,
} from 'react-native-elements';

import {addCard} from '../actions';

class AddCard extends React.Component {
    state = {
        question: "",
        answer: ""
    }
    submit = () => {
        const {addCard, goBack} = this.props;
        const {title} = this.props.navigation.state.params;
        const {question, answer} = this.state;

        addCard(title, {question, answer});
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
  const { entryId } = navigation.state.params

  return {
    addCard: (title, card) => dispatch(addCard(title, card)),
    goBack: () => navigation.goBack(),
  }
}

export default connect(
  null,
  mapDispatchToProps,
)(AddCard)
