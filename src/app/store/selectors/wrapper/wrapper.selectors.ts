import { createSelector } from '@ngrx/store';

import { AppState } from '../../reducers';

export const selectWrapperState = (state: AppState) => state.wrapper;

export const selectWrapperNameState = createSelector(
  selectWrapperState,
  ({ name }) => name
);
