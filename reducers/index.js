import {combineReducers} from 'redux';

import {
    DECKS_ADDED,
    DECK_ADDED,
    CARD_ADDED,
    QUIZ_COMPLETED,
    QUIZZES_ADDED
} from '../actions/types';

function decks(state = {}, action) {
    switch (action.type) {
        case DECKS_ADDED:
            return {
                ...state,
                ...action.decks
            };
        case DECK_ADDED:
            return {
                ...state,
                [action.deckId]: {
                    title: action.deckId,
                    description: action.description,
                    questions: []
                }
            };
        case CARD_ADDED:
            const {title, questions} = state[action.deck];
            return {
                ...state,
                [action.deck]: {
                    title,
                    questions: [...questions, action.card]
                }
            };
        default:
            return state;
    }
}

function quizzes(state = {}, action) {
    switch (action.type) {
        case QUIZZES_ADDED: {
            console.log('reducers.QUIZZES_ADDED', action);
            return {
                ...state,
                ...action.quizzes
            };
        }
        case QUIZ_COMPLETED: {
            return {
                ...state,
                [action.deckId]: {
                    date: action.date
                }
            };
        }
        default:
            return state;
    }
}

export default combineReducers({
	decks,
    quizzes,
});

