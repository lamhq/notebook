// Simple placeholder handler for API Lambda function
// TODO: Replace with actual NestJS API code from apps/api/dist
exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'OK',
      timestamp: new Date().toISOString(),
    }),
  };
};
