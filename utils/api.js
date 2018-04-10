import {AsyncStorage} from 'react-native';

const DECKS_STORAGE_KEY = 'mobile-flashcards:decks';

export function getDecks() {

}

export function getDeck(title) {
}

export function saveDeckTitle(title) {
    return AsyncStorage.setItem(
        DECKS_STORAGE_KEY,
        JSON.stringify({
            [title]: {
                title,
                questions: []
            }
        })
    )
}

export function addCardToDeck(title, card) {
    return AsyncStorage.mergeItem(
        DECKS_STORAGE_KEY,
        JSON.stringify({
            [title]: {questions: [card]}
        })
    )
}
