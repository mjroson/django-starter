import ModelReduxRest from 'utils/magic-redux-rest';

import { ENDPOINT, ENTITY_NAME, ENTITY_PLURAL_NAME } from '../constants';

const config = {
  entityName: ENTITY_NAME,
  entityNamePluralName: ENTITY_PLURAL_NAME,
  ApiUrl: ENDPOINT
};

const userModel = new ModelReduxRest(config);

export const userActions = userModel.actions;
export const userReducer = userModel.reducer;
