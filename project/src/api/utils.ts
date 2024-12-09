import { API_DELAY, API_ERROR_RATE, ApiError } from './config';

export async function simulateRequest<T>(
  handler: () => T | Promise<T>,
  errorMessage = 'Request failed'
): Promise<T> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, API_DELAY));

  // Simulate random errors
  if (Math.random() < API_ERROR_RATE) {
    throw new ApiError(errorMessage, 500, 'INTERNAL_SERVER_ERROR');
  }

  return handler();
}