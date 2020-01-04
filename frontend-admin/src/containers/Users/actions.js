import axios from 'axios';
import { message } from 'antd';
import { ENDPOINT, ENTITY_NAME, ENTITY_PLURAL_NAME } from './constants';

export const list = params => {
  return dispatch => {
    const reqName = 'list';
    dispatch({
      type: `${ENTITY_NAME}/REQUESTING`,
      reqName
    });
    axios
      .get(ENDPOINT, { params })
      .then(resp => {
        dispatch({
          type: `${ENTITY_NAME}/LIST`,
          data: resp.data,
          reqName
        });
      })
      .catch(e => {
        message.error(
          `Hubo un error al intentar recuperar el listado de ${ENTITY_PLURAL_NAME}`
        );
        dispatch({
          type: `${ENTITY_NAME}/REQUEST-ERROR`,
          reqName,
          errors: e.response ? e.response.data : null
        });
      });
  };
};

export const create = data => {
  return dispatch => {
    const reqName = 'create';
    dispatch({
      type: `${ENTITY_NAME}/REQUESTING`,
      reqName
    });
    return axios
      .post(`${ENDPOINT}`, data)
      .then(resp => {
        message.success(`Se creó un ${ENTITY_NAME} exitosamente.`);
        dispatch({
          type: `${ENTITY_NAME}/CREATE`,
          data: resp.data,
          reqName
        });
      })
      .catch(e => {
        message.error(`Hubo un error al intentar crear un ${ENTITY_NAME}.`);
        dispatch({
          type: `${ENTITY_NAME}/REQUEST-ERROR`,
          reqName,
          errors: e.response.data
        });
      });
  };
};

export const update = data => {
  return dispatch => {
    const reqName = 'update';
    dispatch({
      type: `${ENTITY_NAME}/REQUESTING`,
      reqName
    });
    return axios
      .put(`${ENDPOINT}${data.id}/`, data)
      .then(resp => {
        message.success(`Se ha actualizado el ${ENTITY_NAME} exitosamente.`);
        dispatch({
          type: `${ENTITY_NAME}/UPDATE`,
          data: resp.data,
          reqName
        });
      })
      .catch(e => {
        message.error(
          `Hubo un error al intentar actualizar el ${ENTITY_NAME}.`
        );
        dispatch({
          type: `${ENTITY_NAME}/REQUEST-ERROR`,
          reqName,
          errors: e.response ? e.response.data : null
        });
      });
  };
};

export const destroy = data => {
  return dispatch => {
    const reqName = 'destroy';
    dispatch({
      type: `${ENTITY_NAME}/REQUESTING`,
      reqName
    });
    axios
      .delete(`${ENDPOINT}${data.id}/`)
      .then(res => {
        message.success(`El ${ENTITY_NAME} se elminó exitosamente.`);
        dispatch({
          type: `${ENTITY_NAME}/DESTROY`,
          data,
          reqName
        });
      })
      .catch(e => {
        message.error(`Hubo un error al intentar eliminar el ${ENTITY_NAME}.`);
        dispatch({
          type: `${ENTITY_NAME}/REQUEST-ERROR`,
          reqName,
          errors: e.response.data
        });
      });
  };
};
