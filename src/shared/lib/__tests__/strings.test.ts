import { describe, it, expect } from 'vitest';
import { firstMissingLetter } from '../strings';

describe('firstMissingLetter', () => {
  it('should return first missing letter', () => {
    expect(firstMissingLetter('abc')).toBe('d');
  });

  it('should return "-" if all letters present', () => {
    expect(firstMissingLetter('abcdefghijklmnopqrstuvwxyz')).toBe('-');
  });
});
