import React from 'react';
import {connect} from 'react-redux';
import {View, Text, TextInput} from 'react-native';
import {
    Icon,
    FormLabel,
    FormInput,
} from 'react-native-elements';

import {addDeck} from '../actions';

class AddDeck extends React.Component {
    state = {
        title: "",
        description: "",
    }
    submit = () => {
        const {addDeck, goBack} = this.props;
        const {title, description} = this.state;

        console.log('AddDeck.submit', title, description);

        addDeck(title, description);
        goBack();
    }
    render() {
        submitButton = <Icon
            raised
            name='check'
            type='material'
            onPress={this.submit} 
        />
        console.log('AddDeck.render', this.state);
        return (
            <View style={{flex: 1}}>
                <FormLabel>Title</FormLabel>
                <FormInput onChangeText={(title) => this.setState({title})}/>
                <FormLabel>Description</FormLabel>
                <FormInput onChangeText={(description) => this.setState({description})}/>
                <View style={{flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end"}}>
                    {submitButton}
                </View>
            </View>
        );
    }
}

function mapDispatchToProps(dispatch, { navigation }) {
  return {
    addDeck: (title, description) => dispatch(addDeck(title, description)),
    goBack: () => navigation.goBack(),
  }
}

export default connect(
  null,
  mapDispatchToProps,
)(AddDeck)

