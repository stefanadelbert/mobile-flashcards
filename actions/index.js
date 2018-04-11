import * as API from '../utils/api';
import uuidv4 from '../utils/helpers';

export const DECK_ADDED = "DECK_ADDDED";
export const DECKS_ADDED = "DECKS_ADDDED";
export const CARD_ADDED = "CARD_ADDED";

export function decksAdded(decks) {
    console.log('actions.decksAdded', decks);
    return {
        type: DECKS_ADDED,
        decks,
    }
}

export function deckAdded(deck, description) {
    return {
        type: DECK_ADDED,
        deck,
        description,
    }
}

export function cardAdded(deck, card) {
    return {
        type: CARD_ADDED,
        deck,
        card,
    }
}

export function addCardToDeck(deck, card) {
    return dispatch => API.addCardToDeck(deck, card)
        .then(() => dispatch(cardAdded(deck, card)));
}

export function addDeck(deck, description) {
    return dispatch => API.saveDeckTitle(deck, description)
        .then(() => dispatch(deckAdded(deck, description)));
}

export function loadDecks() {
    console.log('loadDecks');
    return (dispatch) => API.getDecks().then(
        (decks) => dispatch(decksAdded(decks))
    );
}
