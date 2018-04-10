import React from 'react';
import {connect} from 'react-redux';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
} from 'react-native';
import {Card} from 'react-native-elements';

import {grey} from '../utils/colors';

class DeckListView extends React.Component {
    render() {
        return (
            <View>
                <FlatList
                    data={Object.keys(this.props.decks)}
                    renderItem={({item}) => {
                        const {title, questions} = this.props.decks[item]
                        return (
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate(
                                    'Deck', {title}
                                )} 
                            >
                                <Card title={title}>
                                    <View style={{alignItems: "center"}}>
                                        <Text style={{color: grey}}>{questions.length} cards</Text>
                                    </View>
                                </Card>
                            </TouchableOpacity>
                        )
                    }}
                />
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
