import axios from 'axios';
import { message } from 'antd';

const APIRestMaker = (function(my) {
  my.list = params => {
    return dispatch => {
      const reqName = 'list';
      dispatch({
        type: `${my.config.entityName}/REQUESTING`,
        reqName
      });
      axios
        .get(my.config.ApiUrl, { params })
        .then(resp => {
          dispatch({
            type: `${my.config.entityName}/LIST`,
            data: resp.data,
            reqName
          });
        })
        .catch(e => {
          message.error(
            `Hubo un error al intentar recuperar el listado de ${my.config.entityNamePluralName}`
          );
          dispatch({
            type: `${my.config.entityName}/REQUEST-ERROR`,
            reqName,
            errors: e.response ? e.response.data : null
          });
        });
    };
  };

  my.create = data => {
    return dispatch => {
      const reqName = 'create';
      dispatch({
        type: `${my.config.entityName}/REQUESTING`,
        reqName
      });
      return axios
        .post(`${my.config.ApiUrl}`, data)
        .then(resp => {
          message.success(`Se creó un ${my.config.entityName} exitosamente.`);
          dispatch({
            type: `${my.config.entityName}/CREATE`,
            data: resp.data,
            reqName
          });
        })
        .catch(e => {
          message.error(
            `Hubo un error al intentar crear un ${my.config.entityName}.`
          );
          dispatch({
            type: `${my.config.entityName}/REQUEST-ERROR`,
            reqName,
            errors: e.response.data
          });
        });
    };
  };

  my.update = data => {
    return dispatch => {
      const reqName = 'update';
      dispatch({
        type: `${my.config.entityName}/REQUESTING`,
        reqName
      });
      return axios
        .put(`${my.config.ApiUrl}${data.id}/`, data)
        .then(resp => {
          message.success(
            `Se ha actualizado el ${my.config.entityName} exitosamente.`
          );
          dispatch({
            type: `${my.config.entityName}/UPDATE`,
            data: resp.data,
            reqName
          });
        })
        .catch(e => {
          message.error(
            `Hubo un error al intentar actualizar el ${my.config.entityName}.`
          );
          dispatch({
            type: `${my.config.entityName}/REQUEST-ERROR`,
            reqName,
            errors: e.response ? e.response.data : null
          });
        });
    };
  };

  my.destroy = data => {
    return dispatch => {
      const reqName = 'destroy';
      dispatch({
        type: `${my.config.entityName}/REQUESTING`,
        reqName
      });
      axios
        .delete(`${my.config.ApiUrl}${data.id}/`)
        .then(res => {
          message.success(`El ${my.config.entityName} se elminó exitosamente.`);
          dispatch({
            type: `${my.config.entityName}/DESTROY`,
            data,
            reqName
          });
        })
        .catch(e => {
          message.error(
            `Hubo un error al intentar eliminar el ${my.config.entityName}.`
          );
          dispatch({
            type: `${my.config.entityName}/REQUEST-ERROR`,
            reqName,
            errors: e.response.data
          });
        });
    };
  };

  my.reducer = initialState => {
    return function(state = initialState, action) {
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
