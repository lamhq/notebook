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
 * Reports list page
 */
export const REPORTS_ROUTE = '/reports';

/**
 * Create report page
 */
export const CREATE_REPORT_ROUTE = '/reports/new';

/**
 * Report detail page (use :id param)
 */
export const REPORT_DETAIL_ROUTE = '/reports/:id';
