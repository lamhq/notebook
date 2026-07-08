/**
 * Home
 */
export const HOME_ROUTE = '/';

/**
 * URL to redirect the user back to after authentication
 * This's where the application receive a response from OIDC/OAuth2 provider with an authorization code
 */
export const AUTH_CALLBACK_ROUTE = '/auth/callback';

/**
 * Where user is redirected after signing out
 */
export const AUTH_SIGNOUT_ROUTE = '/auth/signout';

/**
 * Activity List page
 */
export const ACTIVITIES_ROUTE = HOME_ROUTE;

/**
 * Reports List page
 */
export const REPORTS_ROUTE = '/reports';

/**
 * Create Report page
 */
export const CREATE_REPORT_ROUTE = '/reports/new';

/**
 * Report Detail page (use :id param)
 */
export const REPORT_DETAIL_ROUTE = '/reports/:id';
