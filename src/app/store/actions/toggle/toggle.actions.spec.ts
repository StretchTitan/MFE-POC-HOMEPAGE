import { toggle } from './toggle.actions';

const name = { firstName: 'Pablo', lastName: 'Sanchez' };

describe('Toggle Actions', () => {
  it('should return toggle object', () => {
    expect(toggle()).toEqual({ type: 'Toggle' });
  });
});
