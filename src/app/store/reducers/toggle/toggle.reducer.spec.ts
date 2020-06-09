import { toggleReducer, initialState } from './toggle.reducer';
import { toggle } from '../../actions/toggle/toggle.actions';

describe('Name Reducer', () => {
  it('should return init state', () => {
    const newState = toggleReducer(undefined, { type: 'noop' });

    expect(newState).toEqual(initialState);
  });

  it('should change toggle', () => {
    const newState = toggleReducer(initialState, toggle());

    expect(newState).toEqual({ toggle: true });

    const newClearState = toggleReducer(newState, toggle());

    expect(newClearState).toEqual({ toggle: false });
  });
});
