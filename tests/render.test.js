/**
 * Render Spec
 *
 * @author Evan Cooper 
 */
import {render} from '../render';

describe('Render function', () => {
  it('returns hey', () => { 
    expect(render()).toBe('hey')
  });
});

