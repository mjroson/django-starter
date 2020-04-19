const generateReducer = entityName => ({
  // Requesting
  [`${entityName}/REQUESTING`]: (state, action) => ({
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
  [`${entityName}/REQUEST-ERROR`]: (state, action) => ({
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
  [`${entityName}/LIST`]: (state, action) => ({
    ...state,
    listData: {
      ...action.data
    },
    reqStatus: {
      ...state.reqStatus,
      [action.reqName]: 'loaded'
    },
    errors: {
      ...state.errors,
      [action.reqName]: null
    }
  }),

  // Receive a new object
  [`${entityName}/CREATE`]: (state, action) => ({
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
  [`${entityName}/UPDATE`]: (state, action) => ({
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
  [`${entityName}/DESTROY`]: (state, action) => ({
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

export default generateReducer;
