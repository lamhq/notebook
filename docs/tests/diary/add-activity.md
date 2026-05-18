# Add Activity Test Suite

## Introduction

- **Feature:** Diary - Add Activity functionality
- **Author:** QA Team
- **Description:** This test suite verifies the functionality of the Add Activity feature, including form validation, auto-calculation of income/outcome amounts, tag management, and form submission.

---

## TC_AA_01 - Auto-calculate outcome from content

### Description

Verify that the system correctly auto-calculates the outcome amount when the content does not contain the "nhận" keyword.

### Pre-conditions

- Application is accessible
- User is logged in
- User is on the Add Activity page (`/activities/new`)

### Test Data

- Content: "chi 100k cho cà phê"

### Test Steps

1. Navigate to the Add Activity page (`/activities/new`)
2. Enter "chi 100k cho cà phê" in the content field
3. Wait for auto-calculation to complete
4. Verify the income and outcome fields are updated

### Expected Result

- The Outcome field displays `100`
- The Income field remains empty
- The calculated values are based on the pattern matching and line analysis

### Postconditions

- No data cleanup required; close the form without submitting

---

## TC_AA_02 - Auto-calculate multiple amounts from multi-line content

### Description

Verify that the system correctly sums multiple amounts from different lines and categorizes them as income or outcome based on keywords.

### Pre-conditions

- Application is accessible
- User is logged in
- User is on the Add Activity page (`/activities/new`)

### Test Data

- Content: "nhận hoa hồng 200k\nchi xăng 80k"

### Test Steps

1. Navigate to the Add Activity page (`/activities/new`)
2. Enter "nhận hoa hồng 200k\nchi xăng 80k" in the content field (with newline)
3. Wait for auto-calculation to complete
4. Verify the income and outcome fields are updated

### Expected Result

- The Income field displays `200`
- The Outcome field displays `80`
- Multiple amounts per line are summed correctly

### Postconditions

- No data cleanup required; close the form without submitting

---

## TC_AA_03 - Auto-calculate outcome from single line with multiple amounts

### Description

Verify that the system correctly sums multiple amounts from a single line when no "nhận" keyword is present.

### Pre-conditions

- Application is accessible
- User is logged in
- User is on the Add Activity page (`/activities/new`)

### Test Data

- Content: "mua đồ 50k, trà 20k"

### Test Steps

1. Navigate to the Add Activity page (`/activities/new`)
2. Enter "mua đồ 50k, trà 20k" in the content field
3. Wait for auto-calculation to complete
4. Verify the income and outcome fields are updated

### Expected Result

- The Outcome field displays `70` (`50` + `20`)
- The Income field remains empty
- Multiple amounts on the same line are summed together

### Postconditions

- No data cleanup required; close the form without submitting

---

## TC_AA_04 - Override auto-calculated income value

### Description

Verify that a user can manually override the auto-calculated income value and the manual value is preserved.

### Pre-conditions

- Application is accessible
- User is logged in
- User is on the Add Activity page (`/activities/new`)

### Test Data

- Content: "nhận 500k từ dự án"
- Manual Income: `600`

### Test Steps

1. Navigate to the Add Activity page (`/activities/new`)
2. Enter "nhận 500k từ dự án" in the content field
3. Wait for auto-calculation (income should be `500`)
4. Click on the income field
5. Clear the field and enter `600`
6. Submit the form with valid tags and time

### Expected Result

- The income field is successfully updated to `600`
- The form is submitted with the manual income value of `600`
- The activity is created with income of `600` (not the auto-calculated `500`)

### Postconditions

- Delete the activity created during this test

---

## TC_AA_05 - Submit form with empty content field

### Description

Verify that the system displays a validation error when the content field is empty.

### Pre-conditions

- Application is accessible
- User is logged in
- User is on the Add Activity page (`/activities/new`)

### Test Data

- Content: (empty)
- Tags: ["expense"]
- Time: Current date and time

### Test Steps

1. Navigate to the Add Activity page (`/activities/new`)
2. Leave the content field empty
3. Fill in the tags field with "expense"
4. Set the time to current date and time
5. Click the "Submit" button

### Expected Result

- The form does not submit
- A validation error message "This field is required" appears below the content field
- The user remains on the Add Activity page (`/activities/new`)
- Focus moves to the content field

### Postconditions

- No data cleanup required; form remains unsaved

---

## TC_AA_06 - Add multiple tags

### Description

Verify that a user can add multiple tags to the activity form.

### Pre-conditions

- Application is accessible
- User is logged in
- User is on the Add Activity page (`/activities/new`)
- Tags API returns multiple tags

### Test Data

- Content: "test activity"
- Tags: ["income", "project", "bonus"]
- Time: Current date and time

### Test Steps

1. Navigate to the Add Activity page (`/activities/new`)
2. Enter "test activity" in the content field
3. Click on the tags field
4. Select "income" from the dropdown
5. Select "project" from the dropdown
6. Select "bonus" from the dropdown
7. Verify all three tags are displayed in the tags field
8. Set time to current date and time
9. Click the "Submit" button

### Expected Result

- All three tags are successfully added
- Each tag is displayed as a separate chip/badge
- The form is submitted with all three tags
- The activity is created with all three tags

### Postconditions

- Delete the activity created during this test

---

## TC_AA_07 - Create and add a new custom tag

### Description

Verify that a user can create and add a custom tag that does not exist in the system (free solo mode).

### Pre-conditions

- Application is accessible
- User is logged in
- User is on the Add Activity page (`/activities/new`)
- Tags field supports free solo mode

### Test Data

- Content: "test activity"
- Tags: ["custom-tag-new"]
- Time: Current date and time

### Test Steps

1. Navigate to the Add Activity page (`/activities/new`)
2. Enter "test activity" in the content field
3. Click on the tags field
4. Type "custom-tag-new" in the tags field (new tag)
5. Press Enter or click to add the custom tag
6. Verify the custom tag is added to the field
7. Set time to current date and time
8. Click the "Submit" button

### Expected Result

- The custom tag "custom-tag-new" is successfully added
- The tag appears as a chip/badge in the tags field
- The form is submitted with the custom tag
- The activity is created with the custom tag (normalized to lowercase)

### Postconditions

- Delete the activity created during this test

---

## TC_AA_08 - Tag normalization - trimmed whitespace

### Description

Verify that tags are trimmed of whitespace and converted to lowercase before being saved.

### Pre-conditions

- Application is accessible
- User is logged in
- User is on the Add Activity page (`/activities/new`)

### Test Data

- Content: "test activity"
- Tags: [" EXPENSE "]
- Time: Current date and time

### Test Steps

1. Navigate to the Add Activity page (`/activities/new`)
2. Enter "test activity" in the content field
3. Type " EXPENSE " (with leading and trailing spaces, uppercase) in the tags field
4. Add the tag
5. Set time to current date and time
6. Click the "Submit" button

### Expected Result

- The tag is saved as "expense" (trimmed and lowercase)
- Leading and trailing whitespace is removed
- The tag appears in the activity list without extra spaces

### Postconditions

- Delete the activity created during this test

---

## TC_AA_09 - Remove added tag before submission

### Description

Verify that a user can remove a tag before submitting the form.

### Pre-conditions

- Application is accessible
- User is logged in
- User is on the Add Activity page (`/activities/new`)

### Test Data

- Content: "test activity"
- Tags (initial): ["income", "project"]
- Tags (after removal): ["project"]
- Time: Current date and time

### Test Steps

1. Navigate to the Add Activity page (`/activities/new`)
2. Enter "test activity" in the content field
3. Add tags: "income" and "project"
4. Click the remove button (X) on the "income" tag
5. Verify only "project" tag remains
6. Set time to current date and time
7. Click the "Submit" button

### Expected Result

- The "income" tag is successfully removed
- Only "project" tag is displayed in the field
- The form is submitted with only "project" tag
- The activity is created with only "project" tag

### Postconditions

- Delete the activity created during this test

---

## TC_AA_10 - Tag field error handling - API fetch failure with refresh button

### Description

Verify that when the tag API fails to fetch, an error state is displayed with a refresh button to retry.

### Pre-conditions

- Application is accessible
- User is logged in
- Tags API is unavailable or returns an error
- User is on the Add Activity page (`/activities/new`)

### Test Data

- N/A (testing error handling)

### Test Steps

1. Navigate to the Add Activity page (`/activities/new`)
2. Observe the tags field as the API request fails
3. Verify an error message or state is displayed
4. Locate and click the refresh button

### Expected Result

- An error state is displayed in the tags field
- A refresh button is visible
- Clicking the refresh button retries the API request
- Once the API recovers, tags are loaded successfully

### Postconditions

- No data cleanup required; close the form without submitting

---

## TC_AA_11 - Submit form and display loading state on button

### Description

Verify that the submit button displays a loading state while the form is being processed.

### Pre-conditions

- Application is accessible
- User is logged in
- User is on the Add Activity page (`/activities/new`)
- All required fields are filled

### Test Data

- Content: "test activity"
- Tags: ["test"]
- Time: Current date and time

### Test Steps

1. Navigate to the Add Activity page (`/activities/new`)
2. Fill in all required fields: content, tags, and time
3. Click the "Submit" button
4. Observe the button state during form submission

### Expected Result

- The submit button enters a loading state (e.g., spinner, disabled appearance)
- The button text changes to indicate loading (e.g., "Submitting...")
- The button remains in the loading state until the API response is received
- Once the response is received and user is redirected, the loading state is cleared

### Postconditions

- Delete the activity created during this test

---

## TC_AA_12 - Form layout responsive on mobile

### Description

Verify that the form layout is responsive and displays correctly on mobile devices (single column).

### Pre-conditions

- Application is accessible
- User is logged in
- Browser is resized to mobile viewport (xs screen size)
- User navigates to the Add Activity page (`/activities/new`)

### Test Data

- N/A (testing responsive layout)

### Test Steps

1. Open the browser developer tools and set viewport to mobile size (e.g., `375x667`)
2. Navigate to the Add Activity page (`/activities/new`)
3. Observe the form layout
4. Verify all form fields are visible and accessible

### Expected Result

- All form fields are displayed in a single column
- Fields are not overlapping or cut off
- Input fields are adequately sized for mobile interaction
- Text is readable without horizontal scrolling

### Postconditions

- Close developer tools and return to normal viewport

---

## TC_AA_13 - Content field has autofocus enabled

### Description

Verify that the content text area field has autofocus enabled for better user experience.

### Pre-conditions

- Application is accessible
- User is logged in
- User is navigating to the Add Activity page (`/activities/new`)

### Test Data

- N/A (testing autofocus behavior)

### Test Steps

1. Navigate to the Add Activity page (`/activities/new`)
2. Wait for the page to fully load
3. Observe which form field has focus
4. Verify the content field is focused

### Expected Result

- The content text area field is automatically focused when the page loads
- The cursor is positioned in the content field
- User can start typing immediately without clicking the field first

### Postconditions

- No action required; close the form

---

## TC_AA_14 - Content field supports multi-line input

### Description

Verify that the content field accepts and preserves multi-line input with newline characters.

### Pre-conditions

- Application is accessible
- User is logged in
- User is on the Add Activity page (`/activities/new`)

### Test Data

- Content: "nhận 500k từ dự án\nchi 100k cho dụng cụ\nmua sách 50k"

### Test Steps

1. Navigate to the Add Activity page (`/activities/new`)
2. Click on the content field
3. Enter the multi-line content with newlines
4. Wait for auto-calculation
5. Observe the content and calculated values

### Expected Result

- The content field accepts and displays the multi-line text
- Each line is preserved with newline characters
- Auto-calculation correctly processes each line separately
- Income: `500`, Outcome: `150` (`100` + `50`)

### Postconditions

- No data cleanup required; close the form without submitting

---

## TC_AA_15 - API submission error displays error message

### Description

Verify that when the API returns an error during form submission, an appropriate error message is displayed to the user.

### Pre-conditions

- Application is accessible
- User is logged in
- User is on the Add Activity page (`/activities/new`)
- API is configured to return an error

### Test Data

- Content: "test activity"
- Tags: ["test"]
- Time: Current date and time

### Test Steps

1. Navigate to the Add Activity page (`/activities/new`)
2. Fill in all required fields
3. Mock or simulate an API error response
4. Click the "Submit" button
5. Observe the error handling

### Expected Result

- The form submission fails
- A user-friendly error message is displayed (e.g., "Failed to create activity. Please try again.")
- The form remains on the Add Activity page (`/activities/new`)
- User can attempt to resubmit the form
- The submit button returns to normal state (loading state is cleared)

### Postconditions

- No data cleanup required; form remains with entered data

---

## TC_AA_16 - Successful submission redirects to homepage with new activity visible

### Description

Verify that after successful form submission, the user is redirected to the homepage and the newly created activity is visible in the activity list.

### Pre-conditions

- Application is accessible
- User is logged in
- User is on the Add Activity page (`/activities/new`)
- API is functioning correctly

### Test Data

- Content: "test activity successfully added"
- Tags: ["success"]
- Time: Current date and time

### Test Steps

1. Navigate to the Add Activity page (`/activities/new`)
2. Fill in all required fields with test data
3. Click the "Submit" button
4. Wait for the page redirect
5. Verify the activity list on the homepage

### Expected Result

- The form is submitted successfully
- The user is redirected to the homepage (`/`)
- The activity list is displayed
- The newly created activity with content "test activity successfully added" is visible in the list
- The activity shows the correct tags, date/time, and financial amounts

### Postconditions

- Delete the activity created during this test
