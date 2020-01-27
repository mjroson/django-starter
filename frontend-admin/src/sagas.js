import { all } from 'redux-saga/effects';
import userSagas from './containers/Users/sagas'
import postSagas from './apps/post/sagas';

export function* watchAll() {
    yield all(
        [
            ...userSagas,
            ...postSagas
        ]
    )
}
