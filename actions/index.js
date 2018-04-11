import * as API from '../utils/api';
import {
    DECKS_ADDED,
    DECK_ADDED,
    CARD_ADDED,
    QUIZ_COMPLETED,
} from './types.js';
import uuidv4 from '../utils/helpers';


export function decksAdded(decks) {
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
    return dispatch => API.saveDeckTitle(title, description)
        .then(() => dispatch(deckAdded(title, description)));
}

export function loadDecks() {
    return (dispatch) => API.getDecks().then(
        (decks) => dispatch(decksAdded(decks))
    );
}

export function quizCompleted(deckId, date) {
    console.log('action.quizComplete', deckId, date);
    return {
        type: QUIZ_COMPLETED,
        deckId,
        date,
    }
}

export function completeQuiz(deckId) {
    console.log('action.completeQuiz', deckId);
    const date = Date.now();
    return (dispatch) => {
        API.completeQuiz(deckId, date).then(
            () => dispatch(quizCompleted(deckId, date))
        )
    }
}
