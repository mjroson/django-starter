import { ENTITY_NAME } from './constants';

const initialState = {
  count: 0,
  results: [],
  errors: {},
  loading: false,
  reqStatus: {}
};

export default function objects(state = initialState, action) {
  switch (action.type) {
    case `${ENTITY_NAME}/REQUESTING`:
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
    case `${ENTITY_NAME}/REQUEST-ERROR`:
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
    case `${ENTITY_NAME}/LIST`:
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
    case `${ENTITY_NAME}/UPDATE`:
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
    case `${ENTITY_NAME}/DESTROY`:
      state.results.splice(
        state.results.findIndex(elem => elem.id === action.data.id),
        0
      );
      return {
        ...state,
        count: state.count - 1,
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
    case `${ENTITY_NAME}/LOADING`:
      return { ...state, loading: !state.loading };

    default:
      return state;
  }
}
