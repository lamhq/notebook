# Test Suite: View Activity List

## Introduction

- **Feature:** Diary - View Activity List
- **Author:** QA Team
- **Description:** This test suite covers the functionality of viewing a paginated list of user activities organized by date on the homepage after logging in.

---

## TC_VA_01 - Activity groups are sorted by date (newest first)

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
2. Wait for activity items to load first
3. Get all activity group headers
4. Compare the dates to verify their order

### Expected Result

- Activity group headers (date strings) are displayed in descending chronological order (newest first)

---

## TC_VA_02 - Activities within date group are sorted by time (newest first)

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
2. Wait for activity items to load first
3. Get the first activity group and its associated activities
4. Compare times for activities in that group

### Expected Result

- Activities within the date group are ordered by time in descending order (newest first)

---

## TC_VA_03 - Pagination controls are displayed

### Description

Verify that pagination controls are correctly displayed and in the proper state on the first page.

### Pre-conditions

- User is authenticated and logged in
- User has more than 10 activities in the database (multiple pages)
- Activity list is displayed on page 1

### Test Data

- 30 activities

### Test Steps

1. Navigate to the homepage
2. Scroll to the pagination controls section
3. Observe the pagination controls

### Expected Result

- First page button (`|<`) disabled (grayed out or not clickable)
- Previous button (`<`) is disabled (grayed out or not clickable)
- Next button (`>`) is enabled
- Last page button (`>|`) is visible
- Current page indicator shows page `1` with distinct styling (gray background)

### Postconditions

- Pagination controls are in the correct state for page 1

---

## TC_VA_04 - Navigate to next page

### Description

Verify that the user can navigate to the next page by clicking the Next button.

### Pre-conditions

- User is authenticated and logged in
- User has more than 10 activities (at least 2 pages)
- Activity list is displayed on page 1

### Test Data

- 30 activities

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

- Page state is set to page 2
- Previous button is now enabled
- Next button remains enabled (if not on last page)

---

## TC_VA_05 - Navigate to previous page

### Description

Verify that the user can navigate back to the previous page by clicking the Previous button.

### Pre-conditions

- User is authenticated and logged in
- Activity list is displayed on page 2 or higher

### Test Data

- 30 activities

### Test Steps

1. Navigate to the homepage
2. Scroll to pagination controls
3. Navigate to page 2 by clicking Next button
4. Click the Previous button (`<`)

### Expected Result

- Page transitions to page 1
- Current page indicator shows `1`
- Activities from page 1 are displayed
- Previous button (`<`) is disabled
- Next button (`>`) is enabled

### Postconditions

- Page state is set to page 1
- Previous button is disabled
- Next button is enabled

---

## TC_VA_06 - Navigate to last page

### Description

Verify that the user can navigate to the last page and the Next button is disabled.

### Pre-conditions

- User is authenticated and logged in
- User has more than 10 activities (multiple pages)
- Activity list is displayed

### Test Data

- 30 activities

### Test Steps

1. Navigate to the homepage
2. Scroll to pagination controls
3. Click on the last page button (`>|`)

### Expected Result

- Current page indicator shows the last page number (e.g., `3`)
- Activities from the last page are displayed
- Last page may have fewer items than page size (10)
- Next button (`>`) is disabled
- Previous button (`<`) is enabled
- First page button (`|<`) is clickable

### Postconditions

- Page state is set to the last page
- Next button is disabled
- Previous button is enabled

---

## TC_VA_07 - Empty state message is displayed

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
- Pagination controls are hidden
- Activity list area is not displayed
- User interface is clean and user-friendly

### Postconditions

- Empty state message is displayed when activity list is empty

---

## TC_VA_08 - Network error handling

### Description

Verify that an appropriate error message is displayed when a network error occurs.

### Pre-conditions

- User is authenticated and logged in
- API service is unreachable or returns error
- User is on the homepage
- User has more than 10 activities in the database (multiple pages)

### Test Data

- 30 activities

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

- Network error state is displayed
- "Try Again" button is ready to retry the failed operation

---

## TC_VA_09 - Activity list is responsive on mobile devices

### Description

Verify that the activity list renders correctly and is usable on mobile viewport.

### Pre-conditions

- User is authenticated and logged in
- User has at least 5 activities

### Test Data

- 30 activities

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

- Activity list is responsive and fully functional on mobile viewport (375x667)
