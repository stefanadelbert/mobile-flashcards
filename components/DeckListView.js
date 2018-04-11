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
        console.log('DeckListView.render', this.props.decks);
        const addDeckButton = <Icon
            raised
            name='add'
            type='material'
            onPress={() => this.props.navigation.navigate(
                'AddDeck'
            )} 
        />
        const alertButton = <Icon
            name='warning'
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
                            this.props.quiz === undefined ||
                            !this.props.quiz.hasOwnProperty(title) ||
                            !within24hrs(this.props.quiz[title].date, Date.now())
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
                <View style={{flexGrow: 1, flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end"}}>
                    {addDeckButton}
                </View>
            </View>
        );
    }
}

function mapStateToProps ({decks, quiz}) {
    return {
        decks,
        quiz,
    }
}

export default connect(
  mapStateToProps
)(DeckListView)
