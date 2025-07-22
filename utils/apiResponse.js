/**
 * Utility for creating standardized API responses
 * 
 * @param {boolean} success - Indicates if the operation was successful
 * @param {any} data - Response data (can be null)
 * @param {string} message - Descriptive message of the operation
 * @returns {Object} Standardized API response
 */
const createApiResponse = (success = true, data = null, message = 'Operation completed') => {
  return {
    success,
    data,
    message,
    timestamp: new Date().toISOString()
  };
};

/**
 * Utility for creating successful responses
 * 
 * @param {any} data - Response data
 * @param {string} message - Success message
 * @returns {Object} Standardized successful response
 */
const createSuccessResponse = (data, message = 'Operation successful') => {
  return createApiResponse(true, data, message);
};

/**
 * Utility for creating error responses
 * 
 * @param {string} message - Error message
 * @param {any} data - Additional error data (optional)
 * @returns {Object} Standardized error response
 */
const createErrorResponse = (message = 'Operation error', data = null) => {
  return createApiResponse(false, data, message);
};

/**
 * Utility for creating successful list responses
 * 
 * @param {Array} data - List of data
 * @param {string} message - Success message
 * @returns {Object} Successful list response
 */
const createListResponse = (data, message = 'Data retrieved successfully') => {
  return createSuccessResponse(data, message);
};

/**
 * Utility for creating successful single object responses
 * 
 * @param {Object} data - Object data
 * @param {string} message - Success message
 * @returns {Object} Successful object response
 */
const createObjectResponse = (data, message = 'Data retrieved successfully') => {
  return createSuccessResponse(data, message);
};

/**
 * Utility for creating responses without data (DELETE, etc.)
 * 
 * @param {string} message - Confirmation message
 * @returns {Object} Response without data
 */
const createMessageResponse = (message = 'Operation completed successfully') => {
  return createSuccessResponse(null, message);
};

module.exports = {
  createApiResponse,
  createSuccessResponse,
  createErrorResponse,
  createListResponse,
  createObjectResponse,
  createMessageResponse
}; 