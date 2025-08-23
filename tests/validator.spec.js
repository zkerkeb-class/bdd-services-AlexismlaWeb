const { isValidId, isValidEmail, isValidString } = require('../src/utils/validator');

describe('Validator utilities', () => {
  describe('isValidId', () => {
    test('valid uuid', () => {
      expect(isValidId('550e8400-e29b-41d4-a716-446655440000')).toBe(true);
    });

    test('invalid uuid format', () => {
      expect(isValidId('not-a-uuid')).toBe(false);
    });

    test('empty string', () => {
      expect(isValidId('')).toBe(false);
    });

    test('null value', () => {
      expect(isValidId(null)).toBe(false);
    });
  });

  describe('isValidEmail', () => {
    test('valid email', () => {
      expect(isValidEmail('user@example.com')).toBe(true);
    });

    test('invalid email format', () => {
      expect(isValidEmail('not-an-email')).toBe(false);
    });

    test('empty string', () => {
      expect(isValidEmail('')).toBe(false);
    });

    test('null value', () => {
      expect(isValidEmail(null)).toBe(false);
    });
  });

  describe('isValidString', () => {
    test('valid string with default min length', () => {
      expect(isValidString('hello')).toBe(true);
    });

    test('valid string with custom min length', () => {
      expect(isValidString('hello world', 5)).toBe(true);
    });

    test('string too short for custom min length', () => {
      expect(isValidString('hi', 5)).toBe(false);
    });

    test('empty string', () => {
      expect(isValidString('')).toBe(false);
    });

    test('whitespace only', () => {
      expect(isValidString('   ')).toBe(false);
    });

    test('null value', () => {
      expect(isValidString(null)).toBe(false);
    });
  });
});
