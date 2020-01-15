import { all } from 'redux-saga/effects';
import userSagas from './containers/Users/sagas'

export function* watchAll() {
    yield all(
        userSagas
    )
}
