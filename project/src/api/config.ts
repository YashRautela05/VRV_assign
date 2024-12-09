export const API_DELAY = 500; // Simulate network delay
export const API_ERROR_RATE = 0.1; // 10% chance of error for realistic simulation

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}