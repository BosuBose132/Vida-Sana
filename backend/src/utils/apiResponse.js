function successResponse(message, data = null) {
  return {
    success: true,
    message,
    data,
  };
}

function errorResponse(message) {
  return {
    success: false,
    message,
  };
}

module.exports = {
  successResponse,
  errorResponse,
};
