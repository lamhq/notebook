# Test Suite: View Activity List

## Introduction

- **Feature:** Diary - View Activity List
- **Author:** QA Team
- **Description:** This test suite covers the functionality of viewing a paginated list of user activities organized by date on the homepage after logging in.

---

## TC_VAL_01 - View activity list on homepage

### Description

Verify that the activity list displays correctly on the homepage after user login.

### Pre-conditions

- User is authenticated and logged in
- User has at least 5 activities in the database
- User is on the homepage

### Test Data

- Default page: 1
- Default page size: 10 activities per page

### Test Steps

1. Navigate to the homepage (`/`) after login

### Expected Result

- The page displays 10 activities
- Pagination controls are visible at the bottom
- Activities are grouped by date with date headers (e.g., "Thu, 23 Apr, 2026")
- At least one date group with activities is visible

### Postconditions

No cleanup required.

---

## TC_VAL_02 - Activity item displays all required information

### Description

Verify that each activity item displays all required information with correct styling.

### Pre-conditions

- User is authenticated and logged in
- User has at least one activity in the database
- Activity list is displayed on the homepage

### Test Data

- Expected activity components: time (with ⏱ icon), description, amount (with color), tags

### Test Steps

1. Navigate to the homepage
2. Locate the first activity item in the list
3. Examine the activity item to verify all components are present

### Expected Result

- Time component is visible with icon (⏱)
- Description/content of the activity is displayed
- Amount is visible and properly colored:
  - Green for income transactions
  - Red for expense transactions
- Associated tags are displayed (e.g., #nec, #household)
- All components are properly aligned and don't overlap
- All text is readable with adequate contrast

### Postconditions

No cleanup required.

---

## TC_VAL_03 - Activity groups are sorted by date (newest first)

### Description

Verify that date groups appear in descending order with newest activities first.

### Pre-conditions

- User is authenticated and logged in
- User has activities spanning multiple dates
- Activity list is displayed

### Test Data

- Multiple activities with different dates

### Test Steps

1. Navigate to the homepage
2. Get all activity group headers
3. Compare the dates to verify their order

### Expected Result

- The first activity group shows a more recent date than subsequent activity groups
- Activity groups follow descending chronological order

### Postconditions

No cleanup required.

---

## TC_VAL_13 - Activities within date group are sorted by time (newest first)

### Description

Verify that activities within the same date group are sorted by time with the newest first.

### Pre-conditions

- User is authenticated and logged in
- User has multiple activities on the same date
- Activity list is displayed

### Test Data

- Multiple activities on the same date with different times

### Test Steps

1. Navigate to the homepage
2. Locate a date group that contains multiple activities
3. Observe the time values for activities in that group
4. Compare times to verify ordering

### Expected Result

- Activities within the date group are ordered by time in descending order (newest first)
- The first activity in the group has the latest time
- Each subsequent activity has an earlier time
- Time display format is consistent (e.g., "10:42 am", "8:00 am")

### Postconditions

No cleanup required.

---

## TC_VAL_04 - Pagination controls are displayed

### Description

Verify that pagination controls are correctly displayed and in the proper state on the first page.

### Pre-conditions

- User is authenticated and logged in
- User has more than 10 activities in the database (multiple pages)
- Activity list is displayed on page 1

### Test Data

- Expected pagination format: `< 1 ... 4 5 6 ... 20 >`

### Test Steps

1. Navigate to the homepage
2. Scroll to the pagination controls section
3. Observe the pagination controls

### Expected Result

- First page button (`1`) is visible
- Current page indicator shows page `1` with distinct styling (gray background)
- Previous button (`<`) is disabled (grayed out or not clickable)
- Next button (`>`) is enabled
- Last page button is visible showing total page count
- If there are skipped pages, ellipsis (`...`) is displayed

### Postconditions

No cleanup required.

---

## TC_VAL_05 - Navigate to next page

### Description

Verify that the user can navigate to the next page by clicking the Next button.

### Pre-conditions

- User is authenticated and logged in
- User has more than 10 activities (at least 2 pages)
- Activity list is displayed on page 1

### Test Data

- Current page: 1
- Expected next page: 2

### Test Steps

1. Navigate to the homepage
2. Scroll to pagination controls
3. Click the Next button (`>`)

### Expected Result

- Page transitions to page 2
- Current page indicator shows `2`
- New activities from page 2 are displayed
- Previous button (`<`) is now enabled
- Date groups and activities are correctly grouped and sorted

### Postconditions

No cleanup required.

---

## TC_VAL_06 - Navigate to previous page

### Description

Verify that the user can navigate back to the previous page by clicking the Previous button.

### Pre-conditions

- User is authenticated and logged in
- Activity list is displayed on page 2 or higher

### Test Data

- Current page: 2
- Expected previous page: 1

### Test Steps

1. Navigate to page 2 by clicking Next button
2. Click the Previous button (`<`)

### Expected Result

- Page transitions to page 1
- Current page indicator shows `1`
- Activities from page 1 are displayed
- Previous button (`<`) is disabled
- Next button (`>`) is enabled

### Postconditions

No cleanup required.

---

## TC_VAL_07 - Navigate to specific page

### Description

Verify that the user can navigate to a specific page by clicking a page number button.

### Pre-conditions

- User is authenticated and logged in
- User has at least 30 activities (at least 3 pages)
- Activity list is displayed on page 1

### Test Data

- Target page: 3

### Test Steps

1. Navigate to the homepage
2. Scroll to pagination controls
3. Click on page number button `3`

### Expected Result

- Current page indicator shows `3` with distinct styling
- Activities from page 3 are displayed
- Date groups are correctly organized for page 3 activities
- Both Previous (`<`) and Next (`>`) buttons are enabled
- Page number buttons reflect the current position

### Postconditions

No cleanup required.

---

## TC_VAL_08 - Navigate to last page

### Description

Verify that the user can navigate to the last page and the Next button is disabled.

### Pre-conditions

- User is authenticated and logged in
- User has more than 10 activities (multiple pages)
- Activity list is displayed

### Test Data

- Last page: depends on total activities (e.g., 20)

### Test Steps

1. Navigate to the homepage
2. Scroll to pagination controls
3. Click on the last page number button

### Expected Result

- Current page indicator shows the last page number (e.g., `20`)
- Activities from the last page are displayed
- Last page may have fewer items than page size (10)
- Next button (`>`) is disabled
- Previous button (`<`) is enabled
- First page button (`1`) is clickable

### Postconditions

No cleanup required.

---

## TC_VAL_09 - Page size is 10 items per page

### Description

Verify that each page displays exactly 10 items, or fewer on the last page.

### Pre-conditions

- User is authenticated and logged in
- User has at least 20 activities
- Activity list is displayed

### Test Data

- Expected page size: 10 items per page

### Test Steps

1. Navigate to the homepage
2. Count the number of activities displayed on page 1
3. Navigate to page 2
4. Count the number of activities displayed on page 2
5. Navigate to the last page
6. Count the number of activities displayed on the last page

### Expected Result

- Page 1 displays exactly 10 activities
- Page 2 displays exactly 10 activities
- Last page displays 10 or fewer activities (depending on total count)
- Each activity item is distinct and properly rendered

### Postconditions

No cleanup required.

---

## TC_VAL_10 - Empty state message is displayed

### Description

Verify that the empty state message is displayed when the user has no activities.

### Pre-conditions

- User is authenticated and logged in
- User has no activities in the database
- User is on the homepage

### Test Data

- Empty activity list

### Test Steps

1. Login with a user account that has no activities
2. Navigate to the homepage

### Expected Result

- Empty state message "There's no items to display." is displayed
- Pagination controls are hidden or not visible
- Activity list area is not displayed
- User interface is clean and user-friendly

### Postconditions

No cleanup required.

---

## TC_VAL_11 - Network error handling

### Description

Verify that an appropriate error message is displayed when a network error occurs.

### Pre-conditions

- User is authenticated and logged in
- API service is unreachable or returns error
- User is on the homepage
- User has more than 10 activities in the database (multiple pages)

### Test Data

- Network error scenario

### Test Steps

1. Navigate to the homepage
2. Simulate network failure by setting network to _offline_ in browser dev tools
3. Click the Next button (`>`)

### Expected Result

- Error message "Please check your network connection." is displayed
- "Try Again" button is visible and clickable
- Activity list is not displayed
- After clicking "Try Again", system attempts to reload activities

### Postconditions

Restore network connection or remove API error mock.

---

## TC_VAL_12 - Activity list is responsive on mobile devices

### Description

Verify that the activity list renders correctly and is usable on mobile viewport.

### Pre-conditions

- User is authenticated and logged in
- User has at least 5 activities
- Browser viewport is set to mobile size (375x667)

### Test Data

- Mobile viewport: 375x667 pixels

### Test Steps

1. Set browser to mobile viewport (375x667)
2. Navigate to the homepage
3. Verify activities are visible
4. Scroll through the activity list
5. Verify pagination controls are accessible
6. Click pagination buttons to navigate between pages

### Expected Result

- Activity list is properly formatted for mobile screen
- Date headers are readable and properly spaced
- Activity items are properly laid out without horizontal overflow
- Pagination controls are touch-friendly and clickable
- All components remain accessible and usable
- Scrolling is smooth and doesn't cause layout issues

### Postconditions

No cleanup required.
