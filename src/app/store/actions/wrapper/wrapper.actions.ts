import { createAction, props } from '@ngrx/store';

export const hydrateWrapper = createAction('Hydrate', props<{ firstName: string; lastName: string }>());
