import { createReducer, on } from '@ngrx/store';

import { toggle } from '../../actions/toggle/toggle.actions';


export const toggleFeatureKey = 'toggle';

export interface ToggleState {
  toggle: boolean;
}

export const initialState: ToggleState = {
  toggle: false,
};


export const toggleReducer = createReducer(
  initialState,
  on(toggle, (state) => ({ toggle: !state.toggle })),
);

