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

import {grey} from '../utils/colors';

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
        return (
            <View style={{flex: 1}}>
                <FlatList
                    data={Object.keys(this.props.decks)}
                    keyExtractor={(item) => item}
                    renderItem={({item}) => {
                        const {title, questions} = this.props.decks[item]
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

function mapStateToProps (state) {
    return {
        decks: state
    }
}

export default connect(
  mapStateToProps
)(DeckListView)
