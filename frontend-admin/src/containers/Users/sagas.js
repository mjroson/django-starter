import { all, takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { message } from 'antd';
import { ENDPOINT, ENTITY_NAME, ENTITY_PLURAL_NAME } from './constants';


const getUsers = ({ url, ...params }) => {
    return axios.get(url, { params }).catch(error => error.response)
}

const deleteUser = ({ id }) => {
    return axios.delete(`${ENDPOINT}${id}/`).catch(error => error.response);
}

const updateUser = (user) => {
    return axios.put(`${ENDPOINT}${user.id}/`, user).catch(error => error.response);
}

const createUser = (user) => {
    return axios.post(`${ENDPOINT}`, user).catch(error => error.response);
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

export function* deleteUserAsync(action) {
    console.log('deleteUserAsync: ', action);

    const reqName = 'destroy';

    yield put({
        type: `${ENTITY_NAME}/REQUESTING`,
        reqName
    })

    let result = yield call(deleteUser, { id: action.payload.id })
    
    if (result.status === 204) {
        message.success(`El ${ENTITY_NAME} se elminó exitosamente.`);
        yield put({
            type: `${ENTITY_NAME}/DESTROY`,
            //data: result.data,
            data: { id: action.payload.id },
            reqName
        });
    } else {
        message.error(`Hubo un error al intentar eliminar el ${ENTITY_NAME}.`);
        yield put({
            type: `${ENTITY_NAME}/REQUEST-ERROR`,
            reqName,
            errors: result.response.data
        });
    }

}

export function* updateUserAsync(action) {
    console.log('updateUserAsync: ', action);

    const reqName = 'update';

    yield put({
        type: `${ENTITY_NAME}/REQUESTING`,
        reqName
    });

    const result = yield call(updateUser, action.payload.user)

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

export function* createUserAsync(action) {
    console.log('createUserAscync ', action);

    const reqName = 'create';

    yield put({
        type: `${ENTITY_NAME}/REQUESTING`,
        reqName
    });

    const result = yield call(createUser, action.payload.user);

    if (result.status === 201) {
        message.success(`Se creó un ${ENTITY_NAME} exitosamente.`);
        yield put({
            type: `${ENTITY_NAME}/CREATE`,
            data: result.data,
            reqName
        });
    } else {
        message.error(`Hubo un error al intentar crear un ${ENTITY_NAME}.`);

        yield put({
            type: `${ENTITY_NAME}/REQUEST-ERROR`,
            reqName,
            errors: result.data
        });
    }

}

const allUserSagas = [
        takeEvery("REQUEST_USERS", requestUsersAsync),
        takeEvery("DELETE_USER", deleteUserAsync),
        takeEvery("UPDATE_USER", updateUserAsync),
        takeEvery("CREATE_USER", createUserAsync)
    ]

export default allUserSagas;