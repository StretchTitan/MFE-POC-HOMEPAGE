import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { toggleFeatureKey, toggleReducer, ToggleState } from './toggle/toggle.reducer';
import { WrapperState, wrapperFeatureKey, wrapperReducer } from './wrapper/wrapper.reducer';

export interface AppState {
  [toggleFeatureKey]: ToggleState;
  [wrapperFeatureKey]: WrapperState;
}

export const reducers: ActionReducerMap<AppState> = {
  [toggleFeatureKey]: toggleReducer,
  [wrapperFeatureKey]: wrapperReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
