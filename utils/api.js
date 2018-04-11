import {AsyncStorage} from 'react-native';

const DECKS_STORAGE_KEY = '@mobile-flashcards:decks';

export async function clearDecks() {
    return AsyncStorage.removeItem(DECKS_STORAGE_KEY);
}

export async function resetDecks() {
    console.log('api.resetDecks');
    const result = await AsyncStorage.setItem(
        DECKS_STORAGE_KEY,
        JSON.stringify(defaultDeckState)
    );
}

export function getDecks() {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then(decks => JSON.parse(decks));
}

export async function getDeck(title) {
    var decks = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
    console.log('api.getDeck', decks);
    return decks[title];
}

export function saveDeckTitle(title, description) {
    return AsyncStorage.mergeItem(
        DECKS_STORAGE_KEY,
        JSON.stringify({
            [title]: {
                title,
                description,
                questions: []
            }
        })
    )
}

export function deleteDeck(title) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            delete data[title];
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
        });
}

export function addCardToDeck(title, card) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            data[title].questions.push(card);
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
        });
}

export function addQuiz(title, id, questions) {
    return AsyncStorage.mergeItem(
        DECKS_STORAGE_KEY,
        JSON.stringify({
            [title]: {
                quizes: [{id, questions}]
            }
        })
    )
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
