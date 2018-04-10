import React from 'react';
import {connect} from 'react-redux';
import {View, Text, TextInput} from 'react-native';
import {
    Button,
    FormLabel,
    FormInput,
} from 'react-native-elements';

import {addDeck} from '../actions';

class AddDeck extends React.Component {
    state = {
        title: "",
    }
    submit = () => {
        const {addDeck, goBack} = this.props;
        const {title} = this.state;

        addDeck(title);
        goBack();
    }
    render() {
        return (
            <View>
                <FormLabel>Title</FormLabel>
                <FormInput onChangeText={(title) => this.setState({title})}/>
                <Button title="Submit" onPress={this.submit}/>
            </View>
        );
    }
}

function mapDispatchToProps(dispatch, { navigation }) {
  return {
    addDeck: (title) => dispatch(addDeck(title)),
    goBack: () => navigation.goBack(),
  }
}

export default connect(
  null,
  mapDispatchToProps,
)(AddDeck)

