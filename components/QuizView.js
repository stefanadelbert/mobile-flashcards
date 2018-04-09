import React from 'react';
import {connect} from 'react-redux';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    Button,
    ButtonGroup,
    Card,
    Divider,
} from 'react-native-elements';

import {white, grey, red, blue} from '../utils/colors';

export default class QuizView extends React.Component {
    render() {
        const {title, questions} = this.props.navigation.state.params;
        return (
            <View style={{justifyContent: "center", alignItems: "center"}}>
                <View style={{marginTop: 30, marginBottom: 30}}>
                </View>
                <Divider />
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

