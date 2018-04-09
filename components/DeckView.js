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

export default class DeckView extends React.Component {
    render() {
        const {title, questions} = this.props.navigation.state.params;
        return (
            <View style={{justifyContent: "center", alignItems: "center"}}>
                <View style={{marginTop: 30, marginBottom: 30}}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subtitle}>{questions.length} cards</Text>
                </View>
                <Divider />
                <Button
                    title={"Add Card"}
                    onPress={() => console.log("Add Card")}
                    buttonStyle={styles.button}
                />
                <Button
                    title={"Start Quiz"}
                    onPress={() => console.log("Start Quiz")}
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
