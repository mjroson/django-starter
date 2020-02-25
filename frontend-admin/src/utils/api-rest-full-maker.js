import axios from 'axios';
import { createReducer } from '@reduxjs/toolkit';

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

  my.reducerCommonManager = () => ({
    // Requesting
    [`${my.config.entityName}/REQUESTING`]: (state, action) => ({
      ...state,
      reqStatus: {
        ...state.reqStatus,
        [action.reqName]: 'loading'
      },
      errors: {
        ...state.errors,
        [action.reqName]: null
      }
    }),

    // Request Error
    [`${my.config.entityName}/REQUEST-ERROR`]: (state, action) => ({
      ...state,
      reqStatus: {
        ...state.reqStatus,
        [action.reqName]: 'loaded'
      },
      errors: {
        ...state.errors,
        [action.reqName]: action.errors
      }
    }),

    // Receive list
    [`${my.config.entityName}/LIST`]: (state, action) => {
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
    },

    // Receive a new object
    [`${my.config.entityName}/CREATE`]: (state, action) => ({
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
    }),

    // Receive a updated object
    [`${my.config.entityName}/UPDATE`]: (state, action) => ({
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
    }),

    // Receive a deleted object
    [`${my.config.entityName}/DESTROY`]: (state, action) => ({
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
    })
  });

  my.reducer = (initialState, reducerCustomManager = {}) =>
    createReducer(initialState, {
      ...my.reducerCommonManager(),
      ...reducerCustomManager
    });

  my.make = params => {
    my.config = {
      ...params
    };
  };

  return my;
})(module);

export default APIRestMaker;
