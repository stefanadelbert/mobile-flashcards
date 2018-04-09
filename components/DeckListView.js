import React from 'react';
import {connect} from 'react-redux';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import {grey, red, blue} from '../utils/colors';

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
                            <View style={styles.deckContainer}>
                                <Text style={styles.deckTitle}>{title}</Text>
                                <Text style={styles.cardCount}>{questions.length} cards</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    deckContainer: {
        borderBottomWidth: 1,
        borderBottomColor: grey,
        alignItems: "center",
        paddingTop: 30,
        paddingBottom: 30,
    },
    deckTitle: {
        fontSize: 18,
    },
    cardCount: {
        color: grey,
        fontSize: 12,
    }
})

function mapStateToProps (state) {
    return {
        decks: state
    }
}

export default connect(
  mapStateToProps
)(DeckListView)
