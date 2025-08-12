import { describe, expect, it } from 'vitest';
import { firstMissingLetter } from '../src/shared/lib/strings';

describe('firstMissingLetter', () => {
  it('returns first missing a-z letter', () => {
    expect(firstMissingLetter('abc')).toBe('d');
  });
  it('returns - when all letters are present', () => {
    const pangram = 'abcdefghijklmnopqrstuvwxyz';
    expect(firstMissingLetter(pangram)).toBe('-');
  });
  it('handles accents and spaces', () => {
    expect(firstMissingLetter('Âna Béatriz')).toBe('c');
  });
});
