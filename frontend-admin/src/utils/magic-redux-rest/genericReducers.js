const generateReducer = entityName => ({
  // Requesting
  [`${entityName}/REQUESTING`]: (state, action) => ({
    ...state,
    reqStatus: {
      ...state.reqStatus,
      [action.reqName]: 'loading'
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
    listData: {
      ...state.listData,
      count: state.listData.count + 1,
      results: [...state.listData.results, { ...action.data }]
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

  // Receive a updated object
  [`${entityName}/UPDATE`]: (state, action) => ({
    ...state,
    listData: {
      ...state.listData,
      results: state.listData.results.map(elem =>
        elem.id === action.data.id ? action.data : elem
      )
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

  // Receive a deleted object
  [`${entityName}/DESTROY`]: (state, action) => ({
    ...state,
    listData: {
      ...state.listData,
      results: state.listData.results.filter(
        item => item.id !== action.data.id
      ),
      count: state.listData.count - 1
    },
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
