import React from 'react';
import {connect} from 'react-redux';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {Card} from 'react-native-elements';

import {grey} from '../utils/colors';

class DeckListView extends React.Component {
    render() {
        return (
            <View>
                {Object.keys(this.props.decks).map(deckId => {
                    const {title, questions} = this.props.decks[deckId];
                    return (
                        <TouchableOpacity
                            key={title} 
                            onPress={() => this.props.navigation.navigate(
                                'Deck', {title, questions}
                            )} 
                        >
                            <Card title={title}>
                                <View style={{alignItems: "center"}}>
                                    <Text style={{color: grey}}>{questions.length} cards</Text>
                                </View>
                            </Card>
                        </TouchableOpacity>
                    )
                })}
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
