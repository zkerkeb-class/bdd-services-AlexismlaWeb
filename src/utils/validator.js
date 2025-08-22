/**
 * Validation utilities for BDD service
 */

/**
 * Validates if a string is a valid UUID
 * @param {string} id - The ID to validate
 * @returns {boolean} - True if valid UUID, false otherwise
 */
function isValidId(id) {
  if (!id || typeof id !== 'string') return false;
  
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
}

/**
 * Validates if a string is a valid email
 * @param {string} email - The email to validate
 * @returns {boolean} - True if valid email, false otherwise
 */
function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates if a string is not empty and has minimum length
 * @param {string} str - The string to validate
 * @param {number} minLength - Minimum length (default: 1)
 * @returns {boolean} - True if valid, false otherwise
 */
function isValidString(str, minLength = 1) {
  if (!str || typeof str !== 'string') {
    return false;
  }
  return str.trim().length >= minLength;
}

module.exports = {
  isValidId,
  isValidEmail,
  isValidString
};
