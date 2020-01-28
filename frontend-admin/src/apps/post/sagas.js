import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { message } from 'antd';

const ENTITY_NAME = 'POST';
const ENDPOINT = '/api/post/';

const getPosts = ({ url, ...params }) => {
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
    let result = yield call(getPosts, params);

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

const updatePost = (post) => {
    return axios.put(`${ENDPOINT}${post.id}/`, post).catch(error => error.response);
}

export function* updatePostAsync(action) {
    console.log('updatePostAsync: ', action);

    const reqName = 'update';

    yield put({
        type: `${ENTITY_NAME}/REQUESTING`,
        reqName
    });

    const result = yield call(updatePost, action.payload.post)

    if (result.status === 200) {
        message.success(`Se ha actualizado el ${ENTITY_NAME} exitosamente.`);
        yield put({
            type: `${ENTITY_NAME}/UPDATE`,
            data: result.data,
            reqName
        });
    } else {
        message.error(
            `Hubo un error al intentar actualizar el ${ENTITY_NAME}.`
        );
        yield put({
            type: `${ENTITY_NAME}/REQUEST-ERROR`,
            reqName,
            errors: result ? result.data : null
        });
    }
}

const allPostSagas = [
        takeEvery('REQUEST_POSTS', requestPostAsync),
        takeEvery("UPDATE_POST", updatePostAsync),
]

export default allPostSagas;