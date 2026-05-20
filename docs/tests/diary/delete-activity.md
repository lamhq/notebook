# Delete Activity Test Suite

## Introduction

- **Feature:** Diary - Delete Activity functionality
- **Author:** QA Team
- **Description:** This test suite verifies the Delete Activity feature, including triggering the delete action, displaying confirmation dialogs, handling API responses, and managing the activity list after deletion.

---

## TC_DA_01 - Cancel deletion - closes dialog without making changes

### Description

Verify that clicking the "Cancel" button in the confirmation dialog closes the dialog and does not delete the activity.

### Pre-conditions

- Application is running and accessible
- User is authenticated and logged in
- Confirmation dialog for deletion is displayed
- Activity exists in the database

### Test Data

- Activity to delete: any existing activity
- Activity ID: any valid ID

### Test Steps

1. Click on the three-dot menu icon on an activity item
2. Click on the "Delete" menu item
3. Wait for confirmation dialog to appear
4. Click the "Cancel" button in the dialog

### Expected Result

- Confirmation dialog closes immediately
- Activity list is displayed (no changes)
- The deleted activity is still visible in the list
- No API request was sent to the backend
- Activity data remains unchanged in the database
- Context menu is closed

### Postconditions

- User is back to viewing the activity list
- Activity count remains the same

---

## TC_DA_02 - Close dialog by clicking outside (background click)

### Description

Verify that clicking outside the dialog (on the background/overlay) closes the dialog without deleting the activity.

### Pre-conditions

- Application is running and accessible
- User is authenticated and logged in
- Confirmation dialog for deletion is displayed
- Activity exists in the database

### Test Data

- Activity to delete: any existing activity

### Test Steps

1. Click on the three-dot menu icon on an activity item
2. Click on the "Delete" menu item
3. Wait for confirmation dialog to appear
4. Click on the semi-transparent background area outside the dialog

### Expected Result

- Confirmation dialog closes immediately
- Activity list is displayed (no changes)
- The activity remains in the list unchanged
- No API request was sent to the backend
- User can see the original activity list again

### Postconditions

- Activity data is unchanged
- User is ready to perform other actions

---

## TC_DA_03 - Delete activity successfully - API succeeds

### Description

Verify that clicking the "Delete" button in the confirmation dialog successfully deletes the activity and removes it from the list.

### Pre-conditions

- Application is running and accessible
- User is authenticated and logged in
- Confirmation dialog for deletion is displayed
- Activity exists in the database
- API endpoint is functioning correctly

### Test Data

- Activity to delete: activity with ID "activity-123", content "Test Activity - 10k"
- API endpoint: DELETE `/diary/activities/activity-123`
- Expected API response: 200/204 (successful deletion)

### Test Steps

1. Click on the three-dot menu icon on an activity item to delete
2. Click on the "Delete" menu item
3. Wait for confirmation dialog to appear
4. Verify the date in the message matches the activity's date
5. Click the "Delete" button in the dialog
6. Wait for API response
7. Observe the activity list after deletion

### Expected Result

- Delete button shows a loading state (spinner or disabled state) during API call
- API DELETE request is sent to `/diary/activities/{id}` with correct activity ID
- Activity is successfully deleted from the database (API returns 200/204)
- Confirmation dialog closes after successful deletion
- The deleted activity is no longer visible in the activity list
- Activity list is refreshed and updated
- Other activities in the list remain unchanged
- If user was on the last item of a page, navigation to previous page may occur

### Postconditions

- Verify the activity no longer appears in the activity list
- Verify the activity count has decreased by 1

---

## TC_DA_04 - Delete activity fails - API returns 404 error

### Description

Verify that a 404 error is handled gracefully when the activity no longer exists or belongs to a different user.

### Pre-conditions

- Application is running and accessible
- User is authenticated and logged in
- Confirmation dialog for deletion is displayed
- Activity ID is invalid or activity has already been deleted

### Test Data

- Activity ID: invalid or non-existent ID
- API response: 404 Not Found

### Test Steps

1. Click on the three-dot menu icon on an activity item
2. Click on the "Delete" menu item
3. Wait for confirmation dialog to appear
4. Click the "Delete" button
5. Wait for API response

### Expected Result

- API returns 404 Not Found error
- Confirmation dialog remains visible
- An error message is displayed to the user (e.g., "Activity not found")
- Delete button returns to normal state (not loading)
- User can see the error and optionally retry or cancel

### Postconditions

- Error message is visible
- User can click Cancel to close the dialog
- Activity remains in the list (if it still exists locally)

---

## TC_DA_05 - Network error handling during deletion

### Description

Verify that network errors during the deletion API request are handled gracefully.

### Pre-conditions

- Application is running and accessible
- User is authenticated and logged in
- Confirmation dialog for deletion is displayed
- Network connection is interrupted or unreliable

### Test Data

- Activity to delete: any existing activity
- Network condition: offline or network timeout
- Expected behavior: graceful error handling

### Test Steps

1. Click on the three-dot menu icon on an activity item
2. Click the "Delete" menu item
3. Wait for confirmation dialog to appear
4. Simulate network error (disconnect network or wait for timeout)
5. Click the "Delete" button
6. Observe the error handling

### Expected Result

- Network error is caught and handled gracefully
- User is shown an error message (e.g., "Network error. Please try again.")
- Delete button returns to normal state
- Confirmation dialog remains open allowing retry
- No app crash or unexpected behavior occurs

### Postconditions

- Network connectivity is restored
- User can retry the deletion operation
