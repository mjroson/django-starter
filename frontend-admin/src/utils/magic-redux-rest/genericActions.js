import axios from 'axios';

const generateactions = (entityName, APIUrl) => ({
  list: (params, onSuccess, onError, apiEndpoint = APIUrl) => {
    return (dispatch, getState) => {
      const reqName = 'list';
      dispatch({
        type: `${entityName}/REQUESTING`,
        reqName
      });
      axios
        .get(apiEndpoint, { params })
        .then(resp => {
          dispatch({
            type: `${entityName}/LIST`,
            data: resp.data,
            reqName
          });
          if (typeof onSuccess === 'function') {
            onSuccess(resp.data);
          }
        })
        .catch(e => {
          dispatch({
            type: `${entityName}/REQUEST-ERROR`,
            reqName,
            errors: e.response ? e.response.data : null
          });
          if (typeof onError === 'function') {
            onError(e.response ? e.response.data : null);
          }
        });
    };
  },
  create: (data, onSuccess, onError, params = null, apiEndpoint = APIUrl) => {
    return dispatch => {
      const reqName = 'create';
      dispatch({
        type: `${entityName}/REQUESTING`,
        reqName
      });
      return axios
        .post(`${apiEndpoint}`, data)
        .then(resp => {
          dispatch({
            type: `${entityName}/CREATE`,
            data: resp.data,
            reqName
          });
          if (typeof onSuccess === 'function') {
            onSuccess(resp.data);
          }
        })
        .catch(e => {
          dispatch({
            type: `${entityName}/REQUEST-ERROR`,
            reqName,
            errors: e.response.data
          });
          if (typeof onError === 'function') {
            onError(e.response ? e.response.data : null);
          }
        });
    };
  },
  update: (data, onSuccess, onError, params = null, apiEndpoint = APIUrl) => {
    return dispatch => {
      const reqName = 'update';
      dispatch({
        type: `${entityName}/REQUESTING`,
        reqName
      });
      return axios
        .put(`${apiEndpoint}${data.id}/`, data)
        .then(resp => {
          dispatch({
            type: `${entityName}/UPDATE`,
            data: resp.data,
            reqName
          });
          if (typeof onSuccess === 'function') {
            onSuccess(resp.data);
          }
        })
        .catch(e => {
          dispatch({
            type: `${entityName}/REQUEST-ERROR`,
            reqName,
            errors: e.response ? e.response.data : null
          });
          if (typeof onError === 'function') {
            onError(e.response ? e.response.data : null);
          }
        });
    };
  },
  destroy: (data, onSuccess, onError, params = null, apiEndpoint = APIUrl) => {
    return dispatch => {
      const reqName = 'destroy';
      dispatch({
        type: `${entityName}/REQUESTING`,
        reqName
      });
      axios
        .delete(`${apiEndpoint}${data.id}/`)
        .then(resp => {
          dispatch({
            type: `${entityName}/DESTROY`,
            data,
            reqName
          });
          if (typeof onSuccess === 'function') {
            onSuccess(resp.data);
          }
        })
        .catch(e => {
          dispatch({
            type: `${entityName}/REQUEST-ERROR`,
            reqName,
            errors: e.response.data
          });
          if (typeof onError === 'function') {
            onError(e.response ? e.response.data : null);
          }
        });
    };
  }
});

export default generateactions;
