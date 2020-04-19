import APIRestMaker from 'utils/magic-redux-rest';

import { ENDPOINT, ENTITY_NAME, ENTITY_PLURAL_NAME } from './constants';

const userModel = APIRestMaker;

userModel.make({
  entityName: ENTITY_NAME,
  entityNamePluralName: ENTITY_PLURAL_NAME,
  ApiUrl: ENDPOINT
});

export default userModel;
