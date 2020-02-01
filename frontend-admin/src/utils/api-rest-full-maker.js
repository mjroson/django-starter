import axios from 'axios';

const APIRestMaker = (function(my) {
  my.list = (params, onSuccess, onError, apiEndpoint = my.config.ApiUrl) => {
    return dispatch => {
      const reqName = 'list';
      dispatch({
        type: `${my.config.entityName}/REQUESTING`,
        reqName
      });
      axios
        .get(apiEndpoint, { params })
        .then(resp => {
          dispatch({
            type: `${my.config.entityName}/LIST`,
            data: resp.data,
            reqName
          });
          if (typeof onSuccess === 'function') {
            onSuccess(resp.data);
          }
        })
        .catch(e => {
          dispatch({
            type: `${my.config.entityName}/REQUEST-ERROR`,
            reqName,
            errors: e.response ? e.response.data : null
          });
          if (typeof onError === 'function') {
            onError(e.response ? e.response.data : null);
          }
        });
    };
  };

  my.create = (
    data,
    onSuccess,
    onError,
    params = null,
    apiEndpoint = my.config.ApiUrl
  ) => {
    return dispatch => {
      const reqName = 'create';
      dispatch({
        type: `${my.config.entityName}/REQUESTING`,
        reqName
      });
      return axios
        .post(`${apiEndpoint}`, data)
        .then(resp => {
          dispatch({
            type: `${my.config.entityName}/CREATE`,
            data: resp.data,
            reqName
          });
          if (typeof onSuccess === 'function') {
            onSuccess(resp.data);
          }
        })
        .catch(e => {
          dispatch({
            type: `${my.config.entityName}/REQUEST-ERROR`,
            reqName,
            errors: e.response.data
          });
          if (typeof onError === 'function') {
            onError(e.response ? e.response.data : null);
          }
        });
    };
  };

  my.update = (
    data,
    onSuccess,
    onError,
    params = null,
    apiEndpoint = my.config.ApiUrl
  ) => {
    return dispatch => {
      const reqName = 'update';
      dispatch({
        type: `${my.config.entityName}/REQUESTING`,
        reqName
      });
      return axios
        .put(`${apiEndpoint}${data.id}/`, data)
        .then(resp => {
          dispatch({
            type: `${my.config.entityName}/UPDATE`,
            data: resp.data,
            reqName
          });
          if (typeof onSuccess === 'function') {
            onSuccess(resp.data);
          }
        })
        .catch(e => {
          dispatch({
            type: `${my.config.entityName}/REQUEST-ERROR`,
            reqName,
            errors: e.response ? e.response.data : null
          });
          if (typeof onError === 'function') {
            onError(e.response ? e.response.data : null);
          }
        });
    };
  };

  my.destroy = (
    data,
    onSuccess,
    onError,
    params = null,
    apiEndpoint = my.config.ApiUrl
  ) => {
    return dispatch => {
      const reqName = 'destroy';
      dispatch({
        type: `${my.config.entityName}/REQUESTING`,
        reqName
      });
      axios
        .delete(`${apiEndpoint}${data.id}/`)
        .then(resp => {
          dispatch({
            type: `${my.config.entityName}/DESTROY`,
            data,
            reqName
          });
          if (typeof onSuccess === 'function') {
            onSuccess(resp.data);
          }
        })
        .catch(e => {
          dispatch({
            type: `${my.config.entityName}/REQUEST-ERROR`,
            reqName,
            errors: e.response.data
          });
          if (typeof onError === 'function') {
            onError(e.response ? e.response.data : null);
          }
        });
    };
  };

  my.reducer = (
    initialState,
    reducerExtend = function(s) {
      return s;
    }
  ) => {
    return function(globalState = initialState, action) {
      const state = reducerExtend(globalState);
      switch (action.type) {
        case `${my.config.entityName}/REQUESTING`:
          return {
            ...state,
            reqStatus: {
              ...state.reqStatus,
              [action.reqName]: 'loading'
            },
            errors: {
              ...state.errors,
              [action.reqName]: null
            }
          };
        case `${my.config.entityName}/REQUEST-ERROR`:
          return {
            ...state,
            reqStatus: {
              ...state.reqStatus,
              [action.reqName]: 'loaded'
            },
            errors: {
              ...state.errors,
              [action.reqName]: action.errors
            }
          };
        case `${my.config.entityName}/LIST`: {
          const { results, count } = action.data;
          return {
            ...state,
            results,
            count,
            reqStatus: {
              ...state.reqStatus,
              [action.reqName]: 'loaded'
            },
            errors: {
              ...state.errors,
              [action.reqName]: null
            }
          };
        }
        case `${my.config.entityName}/CREATE`:
          return {
            ...state,
            count: state.count + 1,
            results: [...state.results.push(action.data)],
            loading: false,
            reqStatus: {
              ...state.reqStatus,
              [action.reqName]: 'loaded'
            },
            errors: {
              ...state.errors,
              [action.reqName]: null
            }
          };
        case `${my.config.entityName}/UPDATE`:
          return {
            ...state,
            results: state.results.map(elem =>
              elem.id === action.data.id ? action.data : elem
            ),
            loading: false,
            reqStatus: {
              ...state.reqStatus,
              [action.reqName]: 'loaded'
            },
            errors: {
              ...state.errors,
              [action.reqName]: null
            }
          };
        case `${my.config.entityName}/DESTROY`:
          return {
            ...state,
            count: state.count - 1,
            loading: false,
            results: [
              ...state.results.splice(
                state.results.findIndex(elem => elem.id === action.data.id),
                0
              )
            ],
            reqStatus: {
              ...state.reqStatus,
              [action.reqName]: 'loaded'
            },
            errors: {
              ...state.errors,
              [action.reqName]: null
            }
          };
        case `${my.config.entityName}/LOADING`:
          return { ...state, loading: !state.loading };

        default:
          return state;
      }
    };
  };

  my.make = params => {
    my.config = {
      ...params
    };
  };

  return my;
})(module);

export default APIRestMaker;
