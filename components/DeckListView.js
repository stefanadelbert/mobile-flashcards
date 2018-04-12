import React from 'react';
import {connect} from 'react-redux';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
} from 'react-native';
import {
    Card,
    Icon,
} from 'react-native-elements';

import {grey, brand} from '../utils/colors';
import {within24hrs} from '../utils/helpers';

class DeckListView extends React.Component {
    render() {
        const addDeckButton = <Icon
            raised
            name='add'
            type='material'
            onPress={() => this.props.navigation.navigate(
                'AddDeck'
            )} 
        />
        const alertButton = <Icon
            name='announcement'
            type='material'
            iconStyle={{color: brand}}
        />
        return (
            <View style={{flex: 1}}>
                <FlatList
                    data={Object.keys(this.props.decks)}
                    keyExtractor={(item) => item}
                    renderItem={({item}) => {
                        const {title, questions} = this.props.decks[item]
                        const displayAlert = (
                            this.props.quizzes === undefined ||
                            !this.props.quizzes.hasOwnProperty(title) ||
                            !within24hrs(this.props.quizzes[title].date, Date.now())
                        );
                        return (
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate(
                                    'Deck', {title}
                                )} 
                            >
                                <Card
                                    title={title}
                                    containerStyle={{borderBottomWidth: 5, borderRightWidth: 5}}
                                >
                                    <View style={{position: "absolute", top: 0, right: 0}}>
                                        {displayAlert && alertButton}
                                    </View>
                                    <View style={{alignItems: "center"}}>
                                        <Text style={{color: grey}}>{questions.length} cards</Text>
                                    </View>
                                </Card>
                            </TouchableOpacity>
                        )
                    }}
                />
                <View style={{position: "absolute", bottom: 0, right: 0}}>
                    {addDeckButton}
                </View>
            </View>
        );
    }
}

function mapStateToProps ({decks, quizzes}) {
    return {
        decks,
        quizzes,
    }
}

export default connect(
  mapStateToProps
)(DeckListView)
