import {
    DECK_ADDED,
    DECKS_ADDED,
    CARD_ADDED,
} from '../actions';

export default function entries(state = {}, action) {
    switch (action.type) {
        case DECKS_ADDED:
            const newState = {
                ...state,
                ...action.decks
            };
            return newState;
        case DECK_ADDED:
            return {
                ...state,
                [action.deck]: {
                    title: action.deck,
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
