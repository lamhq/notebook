# Update Activity Test Suite

## Introduction

- **Feature:** Diary - Update Activity functionality
- **Author:** QA Team
- **Description:** This test suite verifies the functionality of the Update Activity feature, including form pre-filling, validation, auto-calculation of income/outcome amounts, tag management, and form submission.

---

## TC_UA_01 - Load Update Activity page with valid activity ID

### Description

Verify that the Update Activity page loads successfully with pre-filled form data when accessing a valid activity record.

### Pre-conditions

- Application is running and accessible
- User is authenticated and logged in
- An activity exists with ID that can be accessed
- User navigates to `/activities/:id` with a valid activity ID

### Test Data

- Activity ID: existing activity from database (e.g., from a previous test)
- Activity content: "Lunch at restaurant - 15k"
- Activity tags: ["food", "expense"]
- Activity time: any valid past/future timestamp
- Activity outcome: 15

### Test Steps

1. Navigate to update activity page using valid activity ID in URL (`/activities/:id`)
2. Wait for page to fully load
3. Observe the form fields

### Expected Result

- Page title "Update Activity" is displayed
- Form is displayed with all fields pre-filled with existing activity data
- Content field shows the existing activity description
- Tags field shows the existing tags
- Time field shows the existing activity timestamp
- Income and Outcome fields show existing values (if any)
- All form fields are interactive and editable
- Submit and Cancel buttons are visible and enabled
- Content field has autofocus enabled

### Postconditions

- No data changes have been made
- Navigate back to home page using Cancel button

---

## TC_UA_02 - Update activity with valid form data

### Description

Verify that a user can successfully update an activity with valid form data and is redirected to the homepage.

### Pre-conditions

- Application is running and accessible
- User is authenticated and logged in
- An activity exists in the database
- User is on the Update Activity page with form pre-filled

### Test Data

- Updated content: "Lunch at coffee shop - 12k"
- Updated tags: ["food", "cafe"]
- Updated outcome: 12
- Updated time: current date/time

### Test Steps

1. Modify the content field: "Lunch at coffee shop - 12k"
2. Clear and add new tags: ["food", "cafe"]
3. Click on the time field and select a new date/time
4. Verify the outcome field for auto-calculated value
5. Adjust the outcome to 12 if needed
6. Click the "Submit" button

### Expected Result

- Form validation passes without errors
- Submit button shows loading state during submission
- Activity is successfully updated in the database
- User is redirected to the homepage
- The activity list shows the updated activity with new content and values
- Updated timestamp reflects the new time selected

### Postconditions

- Verify the activity has been updated by checking the activity list on homepage

---

## TC_UA_03 - Auto-calculate income/outcome when content changes

### Description

Verify that the auto-calculation engine correctly updates income/outcome amounts when the content field is modified.

### Pre-conditions

- Application is running and accessible
- User is authenticated and logged in
- An activity exists with existing income/outcome values
- User is on the Update Activity page

### Test Data

- Original content: "Lunch - 20k"
- New content: "Coffee - 5k"
- Expected outcome after auto-calculation: 5

### Test Steps

1. Modify the content field to: "Coffee - 5k"
2. Observe the outcome field for automatic update
3. Check the outcome field value

### Expected Result

- Outcome field automatically updates to 5 (matching new content)
- Income field remains unchanged if not mentioned in new content
- Auto-calculated value reflects the amount in the updated content
- User can still manually override the auto-calculated value if desired

### Postconditions

- Cancel the update to discard changes
- Verify original activity data remains unchanged

---

## TC_UA_04 - Manual override of auto-calculated income/outcome

### Description

Verify that users can manually override auto-calculated income/outcome values and the manual values are preserved.

### Pre-conditions

- Application is running and accessible
- User is authenticated and logged in
- User is on the Update Activity page
- Content field contains a calculable amount

### Test Data

- Content: "Expense - 25k"
- Auto-calculated outcome: 25
- Manual override outcome: 30

### Test Steps

1. Observe the auto-calculated outcome value (should be 25 from the 25k amount)
2. Click on the outcome field
3. Clear and enter a different value: 30
4. Leave the content field unchanged
5. Click the Submit button

### Expected Result

- Manual outcome value (30) is accepted and not overridden
- Form submission succeeds with the manually entered value
- Activity is updated with outcome = 30 (manual override)
- No auto-calculation re-triggers the outcome field on submission

### Postconditions

- Verify the activity has been saved with the manual override value

---

## TC_UA_05 - Update activity with tag selection

### Description

Verify that tags can be properly selected, removed, and updated for an activity.

### Pre-conditions

- Application is running and accessible
- User is authenticated and logged in
- User is on the Update Activity page
- Tags API endpoint is functioning

### Test Data

- Existing tags: ["food", "expense"]
- New tags to add: ["restaurant", "lunch"]

### Test Steps

1. Click on the tags field to open the tag selector
2. Remove existing tags by clicking their X buttons
3. Type and select new tag: "restaurant"
4. Add another new tag: "lunch"
5. Verify both tags are displayed
6. Click the Submit button

### Expected Result

- Existing tags can be removed by clicking the X button
- New tags can be typed and selected from suggestions
- Multiple tags are properly displayed as chips
- Form submission succeeds with updated tags
- Activity list shows updated tags
- Tags are normalized to lowercase in the backend

### Postconditions

- Updated tags are reflected in the activity list

---

## TC_UA_06 - Update activity date/time

### Description

Verify that the date and time of an activity can be successfully updated using the date/time picker.

### Pre-conditions

- Application is running and accessible
- User is authenticated and logged in
- User is on the Update Activity page
- Date/time picker component is functional

### Test Data

- Original time: existing activity timestamp
- Updated time: tomorrow at 14:30

### Test Steps

1. Click on the Time field to open the date/time picker
2. Navigate to tomorrow's date
3. Select 14:30 as the time
4. Confirm the date/time selection
5. Verify the Time field displays the new date/time
6. Click the Submit button

### Expected Result

- Date/time picker opens with existing activity time pre-selected
- User can navigate between dates and select a specific time
- Selected date/time is displayed in the Time field
- Form submission succeeds with updated time
- Time is stored in ISO 8601 format

### Postconditions

- Updated activity timestamp is reflected in the activity list

---

## TC_UA_07 - Cancel update and discard changes

### Description

Verify that clicking the Cancel button discards all unsaved changes and navigates back to the homepage.

### Pre-conditions

- Application is running and accessible
- User is authenticated and logged in
- User is on the Update Activity page
- User has made changes to the form (without submitting)

### Test Data

- Modified content: "Changed content"
- Modified tags: ["new", "tags"]

### Test Steps

1. Modify the content field: "Changed content"
2. Modify the tags field: ["new", "tags"]
3. Click the Cancel button

### Expected Result

- All unsaved changes are discarded
- User is redirected to the homepage (/)
- Form is not submitted
- Activity data in the database remains unchanged
- The activity list shows original activity data
- No validation errors are displayed

### Postconditions

- User is back on the homepage
- Original activity data is intact

---

## TC_UA_08 - Form validation errors

### Description

Verify that the form displays validation errors for invalid or empty required fields.

### Pre-conditions

- Application is running and accessible
- User is authenticated and logged in
- User is on the Update Activity page
- Form is pre-filled with existing activity data

### Test Data

- Empty content field

### Test Steps

For each validation scenario:

1. Set the content field to empty
2. Click the Submit button

### Expected Result

- User remains on the Update Activity page
- Validation error message is displayed using browser's built-in validation
- Form does not submit to the API
- Validation errors disappear when fields are corrected

### Postconditions

- Form returns to valid state after corrections

---

## TC_UA_09 - Activity not found error (invalid activity ID)

### Description

Verify that an appropriate error message is displayed when the activity ID is invalid or the activity doesn't exist.

### Pre-conditions

- Application is running and accessible
- User is authenticated and logged in
- Activity with the provided ID does not exist in the database

### Test Data

- Invalid activity ID: non-existent UUID

### Test Steps

1. Navigate to `/activities/{invalid-id}` with an invalid or non-existent ID

### Expected Result

- API returns 404 error or not-found response
- User is informed with error message: "Activity not found"
- Form is not displayed
- User can navigate back to the homepage using a link or button
- Error message is clear and helpful

### Postconditions

- Click back button or navigate to homepage

---

## TC_UA_10 - API error during activity fetch

### Description

Verify that an appropriate error message is displayed when the API fails to fetch activity data.

### Pre-conditions

- Application is running and accessible
- User is authenticated and logged in
- API endpoint for fetching activity is unavailable or returns an error

### Test Data

- Valid activity ID but API returns 500 error

### Test Steps

1. Mock or simulate an API error for the activity fetch endpoint
2. Navigate to `/activities/:id` with valid activity ID

### Expected Result

- API error is caught by the error handler
- User is displayed error message: "Failed to load activity"
- Error message does not expose technical details
- Form is not displayed
- User can refresh the page or navigate back to homepage
- Loading indicator disappears after error

### Postconditions

- Navigate back to homepage
- Retry operation once API is restored

---

## TC_UA_11 - API error during form submission

### Description

Verify that an appropriate error message is displayed when the API fails during form submission.

### Pre-conditions

- Application is running and accessible
- User is authenticated and logged in
- User has filled out the form with valid data
- API endpoint for updating activity is unavailable or returns an error

### Test Data

- Valid form data (all fields properly filled)
- API returns 500 error

### Test Steps

1. Fill out the form with valid data
2. Mock or simulate an API error for the update endpoint
3. Click the Submit button

### Expected Result

- Submit button shows loading state during submission attempt
- API error is caught and handled gracefully
- User is displayed error message: "Failed to update activity"
- Error message does not expose technical details
- Form data is retained (allowing user to retry)
- Submit button becomes enabled again
- User remains on the Update Activity page

### Postconditions

- Check that activity data in database is unchanged
- Fix API issue and retry submission or navigate away
