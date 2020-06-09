import { createSelector } from '@ngrx/store';

import { AppState } from '../../reducers';

export const selectToggleState = (state: AppState) => state.toggle;

export const selectToggle = createSelector(
  selectToggleState,
  ({ toggle }) => toggle
);
