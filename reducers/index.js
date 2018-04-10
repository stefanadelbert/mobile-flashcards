import {
    DECK_ADDED,
    CARD_ADDED,
} from '../actions';

export default function entries(state = defaultDeckState, action) {
    switch (action.type) {
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

const defaultDeckState = {
    React: {
        title: 'React',
        description: 'All about React',
        questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            }
        ]
    },
    JavaScript: {
        title: 'JavaScript',
        description: 'All about Javascript',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    }
}

