# Login Feature Test Suite

## Introduction

- **Feature:** User Authentication - Login (OIDC-based)
- **Author:** QA Team

---

## Test Case 1: Successful Login with Valid Credentials

### Metadata

| Field             | Value                                                                                  |
| ----------------- | -------------------------------------------------------------------------------------- |
| **ID**            | TC-101                                                                                 |
| **Title**         | User successfully logs in with valid email and password                                |
| **Objective**     | Verify that users can authenticate with correct credentials and access the dashboard.  |
| **Preconditions** | User is not authenticated; user account exists with username "test" and password "123" |
| **Priority**      | High                                                                                   |
| **Version**       | v1.0+                                                                                  |
| **Status**        | Not Run                                                                                |
| **Platform**      | Web                                                                                    |
| **Environment**   | Staging                                                                                |

### Test Data

- **Username:** test
- **Password:** 123

### Test Steps

1. Navigate to the login page
2. Enter "test" in the username field
3. Enter "123" in the password field
4. Click the "Sign In" button
5. Wait for authentication response

### Expected Result

The dashboard page loads successfully, the user is authenticated, and the user can access all authenticated features. The session token is established.

### Postconditions

No cleanup required as this is a standard authentication flow.

---

## Test Case 2: Login with Empty Username and Password Fields

### Metadata

| Field             | Value                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------- |
| **ID**            | TC-102                                                                                      |
| **Title**         | User login fails with empty username and password fields                                    |
| **Objective**     | Verify that the system validates required fields and prevents submission with empty inputs. |
| **Preconditions** | User is on the login page; both username and password fields are empty                      |
| **Priority**      | High                                                                                        |
| **Version**       | v1.0+                                                                                       |
| **Status**        | Not Run                                                                                     |
| **Platform**      | Web                                                                                         |
| **Environment**   | Staging                                                                                     |

### Test Data

- **Username:** (empty)
- **Password:** (empty)

### Test Steps

1. Navigate to the login page
2. Leave the username field empty
3. Leave the password field empty
4. Click the "Sign In" button

### Expected Result

Form submission is prevented. Validation error messages appear below the fields indicating that both username and password are required. The user remains on the login page.

### Postconditions

No cleanup required.

---

## Test Case 5: Login with Incorrect Username or Password

### Metadata

| Field             | Value                                                                         |
| ----------------- | ----------------------------------------------------------------------------- |
| **ID**            | TC-105                                                                        |
| **Title**         | User login fails with incorrect username or password                          |
| **Objective**     | Verify that the system denies access when incorrect credentials are provided. |
| **Preconditions** | User is not logged in                                                         |
| **Priority**      | High                                                                          |
| **Version**       | v1.0+                                                                         |
| **Status**        | Not Run                                                                       |
| **Platform**      | Web                                                                           |
| **Environment**   | Staging                                                                       |

### Test Data

- **Username:** nonexistent
- **Password:** wrongpassword

### Test Steps

1. Navigate to the login page
2. Enter "nonexistent" in the username field
3. Enter "wrongpassword" in the password field
4. Click the "Sign In" button
5. Wait for authentication response

### Expected Result

An error message is displayed indicating invalid credentials. The user remains on the login page and is not authenticated.

### Postconditions

No cleanup required.

---

## Test Case 7: Redirect to Originally Requested Page

### Metadata

| Field             | Value                                                                                |
| ----------------- | ------------------------------------------------------------------------------------ |
| **ID**            | TC-107                                                                               |
| **Title**         | User is redirected to originally requested page after login                          |
| **Objective**     | Verify that users are redirected to their intended destination after authentication. |
| **Preconditions** | User is not authenticated; originally requested URL is stored                        |
| **Priority**      | High                                                                                 |
| **Version**       | v1.0+                                                                                |
| **Status**        | Not Run                                                                              |
| **Platform**      | Web                                                                                  |
| **Environment**   | Staging                                                                              |

### Test Data

- **Original URL:** `/activities/new`
- **Username:** test
- **Password:** 123

### Test Steps

1. Navigate to protected URL `/activities/new`
2. Verify redirect to login page occurs
3. Enter "test" in the username field
4. Enter "123" in the password field
5. Click the "Sign In" button
6. Wait for authentication and redirect

### Expected Result

After successful authentication, the user is redirected to the originally requested page (`/activities/new`), not the dashboard. The page loads correctly with the expected content.

### Postconditions

No cleanup required.

---

## Test Case 8: Session Persists After Page Reload

### Metadata

| Field             | Value                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------- |
| **ID**            | TC-108                                                                                      |
| **Title**         | Authenticated session persists after page reload                                            |
| **Objective**     | Verify that the session token is properly stored and remains valid across page navigations. |
| **Preconditions** | User is logged in and viewing the dashboard                                                 |
| **Priority**      | High                                                                                        |
| **Version**       | v1.0+                                                                                       |
| **Status**        | Not Run                                                                                     |
| **Platform**      | Web                                                                                         |
| **Environment**   | Staging                                                                                     |

### Test Data

- No specific test data required

### Test Steps

1. Verify user is authenticated and viewing the dashboard
2. Reload the page (F5 or browser refresh)
3. Wait for page to load

### Expected Result

The page reloads successfully, the user remains authenticated, and the dashboard is displayed. The user is not redirected to the login page.

### Postconditions

No cleanup required.
