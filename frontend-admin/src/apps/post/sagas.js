import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';

const ENTITY_NAME = 'POST';
const ENDPOINT = '/api/post/';

const getUsers = ({ url, ...params }) => {
    return axios.get(url, { params }).catch(error => error.response)
}

export function* requestPostAsync(action) {
    const reqName = 'list';

    yield put({
        type: `${ENTITY_NAME}/REQUESTING`,
        reqName
    })

    const params = {
        url: ENDPOINT,
        ...action.payload.query
    }
    let result = yield call(getUsers, params);

    if (result.statusText === 'OK') {
        const newAction = {
            type: `${ENTITY_NAME}/LIST`,
            data: result.data,
            reqName
        }
                
        yield put(newAction)
    } else {
        yield put({
            type: `${ENTITY_NAME}/REQUEST-ERROR`,
            reqName,
            errors: result ? result.data : null
        })
    }
}

const allPostSagas = [
        takeEvery('REQUEST_POSTS', requestPostAsync)
]

export default allPostSagas;