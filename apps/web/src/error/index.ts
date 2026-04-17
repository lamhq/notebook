/**
 * Error module
 * This module provides a way to handle error in the application.
 *
 * Dependencies:
 * - MUI: for displaying error page
 * - React Router: for redirecting to login page
 * - axios: for handling network error
 * - /dialog module: for displaying error alert
 */
export { default as ErrorBoundary } from './ErrorBoundary';
export { default as useErrorHandler } from './useErrorHandler';
