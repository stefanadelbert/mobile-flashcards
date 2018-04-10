import * as API from '../utils/api';

export const DECK_ADDED = "DECK_ADDDED";
export const CARD_ADDED = "CARD_ADDED";

export function deckAdded(deck) {
    return {
        type: DECK_ADDED,
        deck,
    }
}

export function cardAdded(deck, card) {
    // Add the card to the local store.
    return {
        type: CARD_ADDED,
        deck,
        card,
    }
}

export function addCardToDeck(deck, card) {
    // Add the card to storage and then add the card to the local store.
    return dispatch => API.addCardToDeck(deck, card)
        .then(() => dispatch(cardAdded(deck, card)))
}

export function addDeck(deck) {
    return dispatch => API.saveDeckTitle(deck)
        .then(() => dispatch(deckAdded(deck)))
}
