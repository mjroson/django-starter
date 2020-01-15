import { all, takeEvery, call, put } from 'redux-saga/effects';
//import userSagas from './containers/Users/sagas'
import axios from 'axios';
import { message } from 'antd';
import { ENDPOINT, ENTITY_NAME, ENTITY_PLURAL_NAME } from './containers/Users/constants';


// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* executeDummySaga(action) {
    console.log('dummy saga!');

}

const getUsers = ({ url, ...params }) => {

    console.log('params: ', params);
    return axios.get(url, { params }).catch(error=>error.response)

    /*
    return axios.get(url, { params }, {
    }).then(res => res)
        .catch(error => {
            // throw error
            return error
        });
    */
}

export function* requestUsersAsync(action) {
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
    
    if(result.statusText === 'OK') {        
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

export function* watchAll() {
    yield all([
        takeEvery("DUMMY_SAGA", executeDummySaga),
        takeEvery("REQUEST_USERS", requestUsersAsync),
    ])
}

// yield all(userSagas);

