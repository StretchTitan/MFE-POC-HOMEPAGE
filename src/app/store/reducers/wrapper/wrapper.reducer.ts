import { createReducer, on } from '@ngrx/store';

import { hydrateWrapper } from '../../actions/wrapper/wrapper.actions';

export const wrapperFeatureKey = 'wrapper';

export interface WrapperState {
  name: {
    firstName: string;
    lastName: string;
  };
}

export const initialState: WrapperState = {
  name: {
    firstName: '',
    lastName: '',
  },
};

export const wrapperReducer = createReducer(
  initialState,
  on(hydrateWrapper, (state, { firstName, lastName }) => ({ ...state, name: { firstName, lastName }}))
);
