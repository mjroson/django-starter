import APIRestMaker from 'utils/api-rest-full-maker';

import { ENDPOINT, ENTITY_NAME, ENTITY_PLURAL_NAME } from './constants';

const userModel = APIRestMaker;

const initialState = {
  count: 0,
  results: [],
  errors: {},
  loading: false,
  reqStatus: {}
};

userModel.make({
  entityName: ENTITY_NAME,
  entityNamePluralName: ENTITY_PLURAL_NAME,
  ApiUrl: ENDPOINT,
  initialState
});

export default userModel;
