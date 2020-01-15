import { takeEvery, put, delay, call, select } from 'redux-saga/effects';
import axios from 'axios';
import * as R from 'ramda'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* executeDummySaga(action) {
    console.log('dummy saga!');
    
}

const userSagas = [
    takeEvery("DUMMY_SAGA", executeDummySaga),    
]

export default userSagas