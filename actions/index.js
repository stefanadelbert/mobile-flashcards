import * as API from '../utils/api';
import uuidv4 from '../utils/helpers';

export const DECKS_ADDED = "DECKS_ADDDED";
export const DECK_ADDED = "DECK_ADDDED";
export const CARD_ADDED = "CARD_ADDED";

export function decksAdded(decks) {
    console.log('actions.decksAdded', decks);
    return {
        type: DECKS_ADDED,
        decks,
    }
}

export function deckAdded(deckId, description) {
    return {
        type: DECK_ADDED,
        deckId,
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

export function addDeck(title, description) {
    console.log('action.addDeck', title, description);
    return dispatch => API.saveDeckTitle(title, description)
        .then(() => dispatch(deckAdded(title, description)));
}

export function loadDecks() {
    console.log('loadDecks');
    return (dispatch) => API.getDecks().then(
        (decks) => dispatch(decksAdded(decks))
    );
}
