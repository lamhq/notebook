# View Activity List Test Suite

## Introduction

- **Feature:** Diary - View Activity List
- **Author:** QA Team

---

## Test Case 1: View Activity List on First Page

### Metadata

| Field             | Value                                                                                                      |
| ----------------- | ---------------------------------------------------------------------------------------------------------- |
| **Title**         | User successfully views activity list on first page                                                        |
| **Objective**     | Verify that the activity list loads correctly with paginated activities grouped by date on the first page. |
| **Preconditions** | User is logged in; user account has at least 5 activities in the database; user is on the dashboard        |
| **Priority**      | High                                                                                                       |
| **Version**       | v1.0+                                                                                                      |
| **Status**        | Not Executed                                                                                               |
| **Platform**      | Web                                                                                                        |
| **Environment**   | Staging                                                                                                    |

### Test Data

- **User Email:** test-user@example.com
- **Expected Page Size:** 5 items
- **Expected Display Order:** Newest activities first

### Test Steps

1. Navigate to the dashboard after logging in
2. Verify the activity list section is visible
3. Verify activities are grouped by date (e.g., "Mon, 27 Apr, 2026")
4. Verify date headers appear above each group
5. Verify each activity item displays:
   - Time with icon (e.g., "⏱ 10:42 am")
   - Description/content
   - Amount
   - Associated tags (e.g., "#nec", "#household")
6. Verify exactly 5 activities are displayed on the first page
7. Verify activities within each date group are ordered by time (newest first)

### Expected Result

The activity list loads successfully with 5 activities grouped by date. Each activity item displays complete information (time, description, amount, tags). Date groups are ordered newest first, and activities within each group are ordered by time (newest first).

### Postconditions

No cleanup required.

---

## Test Case 2: Verify Pagination Controls Visible

### Metadata

| Field             | Value                                                                                                   |
| ----------------- | ------------------------------------------------------------------------------------------------------- |
| **Title**         | Pagination controls are displayed correctly on first page                                               |
| **Objective**     | Verify that pagination controls are visible and show correct state for the first page.                  |
| **Preconditions** | User is logged in; user has more than 5 activities; user is viewing the activity list on the first page |
| **Priority**      | High                                                                                                    |
| **Version**       | v1.0+                                                                                                   |
| **Status**        | Not Executed                                                                                            |
| **Platform**      | Web                                                                                                     |
| **Environment**   | Staging                                                                                                 |

### Test Data

- **Total Activities:** At least 11 (more than 2 pages)
- **Page Size:** 5 items

### Test Steps

1. Scroll to the bottom of the activity list to view pagination controls
2. Verify the "Previous" button (`<`) is displayed and disabled (grayed out)
3. Verify the "First page" button (`1`) is displayed and highlighted (active state)
4. Verify the "Last page" button displays the correct total page count (e.g., `10`)
5. Verify the "Next" button (`>`) is displayed and enabled
6. Verify ellipsis (`...`) appears between page numbers if total pages > 5

### Expected Result

Pagination controls are visible and display the correct state: Previous button is disabled, First page button (1) is highlighted, Last page button shows total pages, and Next button is enabled.

### Postconditions

No cleanup required.

---

## Test Case 3: Navigate to Next Page

### Metadata

| Field             | Value                                                                                           |
| ----------------- | ----------------------------------------------------------------------------------------------- |
| **Title**         | User navigates to next page successfully                                                        |
| **Objective**     | Verify that clicking the next button loads page 2 with a new set of activities.                 |
| **Preconditions** | User is logged in; user has at least 11 activities; user is viewing page 1 of the activity list |
| **Priority**      | High                                                                                            |
| **Version**       | v1.0+                                                                                           |
| **Status**        | Not Executed                                                                                    |
| **Platform**      | Web                                                                                             |
| **Environment**   | Staging                                                                                         |

### Test Data

- **Current Page:** 1
- **Next Page:** 2
- **Expected Items on Page 2:** 5 items (different from page 1)

### Test Steps

1. Verify the "Next" button (`>`) is enabled on page 1
2. Click the "Next" button (`>`)
3. Wait for the page to load
4. Verify the activity list updates with new activities
5. Verify activities are still grouped by date
6. Verify the "Previous" button is now enabled
7. Verify the current page indicator shows page 2 is active (highlighted)
8. Verify the "Next" button remains enabled (if there are more pages)

### Expected Result

Page 2 loads successfully with 5 new activities. The Previous button is now enabled. The current page indicator highlights page 2. Activities are still properly grouped by date.

### Postconditions

No cleanup required.

---

## Test Case 4: Navigate to Previous Page

### Metadata

| Field             | Value                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------- |
| **Title**         | User navigates to previous page successfully                                          |
| **Objective**     | Verify that clicking the previous button loads the previous page with its activities. |
| **Preconditions** | User is logged in; user is currently viewing page 2 or later of the activity list     |
| **Priority**      | High                                                                                  |
| **Version**       | v1.0+                                                                                 |
| **Status**        | Not Executed                                                                          |
| **Platform**      | Web                                                                                   |
| **Environment**   | Staging                                                                               |

### Test Data

- **Current Page:** 2
- **Previous Page:** 1

### Test Steps

1. Ensure you are on page 2
2. Verify the "Previous" button (`<`) is enabled
3. Click the "Previous" button (`<`)
4. Wait for the page to load
5. Verify the activity list returns to page 1 activities
6. Verify the current page indicator shows page 1 is active
7. Verify the "Previous" button is now disabled (grayed out)

### Expected Result

Page 1 loads successfully. The Previous button is now disabled. The current page indicator highlights page 1. Activities are the same as the original page 1.

### Postconditions

No cleanup required.

---

## Test Case 5: Navigate to Specific Page by Clicking Page Number

### Metadata

| Field             | Value                                                                                     |
| ----------------- | ----------------------------------------------------------------------------------------- |
| **Title**         | User navigates to a specific page by clicking page number                                 |
| **Objective**     | Verify that clicking a page number directly navigates to that page.                       |
| **Preconditions** | User is logged in; user has more than 15 activities (at least 4 pages); user is on page 1 |
| **Priority**      | High                                                                                      |
| **Version**       | v1.0+                                                                                     |
| **Status**        | Not Executed                                                                              |
| **Platform**      | Web                                                                                       |
| **Environment**   | Staging                                                                                   |

### Test Data

- **Target Page:** 3
- **Total Pages:** At least 4

### Test Steps

1. Scroll to pagination controls at the bottom
2. Verify page 3 button is visible (or accessible via ellipsis navigation)
3. Click on page number 3
4. Wait for the page to load
5. Verify the activity list updates with page 3 activities
6. Verify the current page indicator shows page 3 is highlighted
7. Verify the Previous button is enabled
8. Verify the Next button is enabled (if there are more pages)

### Expected Result

Page 3 loads successfully with its activities. The current page indicator highlights page 3. Both Previous and Next buttons are enabled (unless at last page).

### Postconditions

No cleanup required.

---

## Test Case 6: Navigate to Last Page

### Metadata

| Field             | Value                                                                                              |
| ----------------- | -------------------------------------------------------------------------------------------------- |
| **Title**         | User navigates to the last page                                                                    |
| **Objective**     | Verify that clicking the last page button navigates to the last page and disables the Next button. |
| **Preconditions** | User is logged in; user has more than 5 activities; user is on page 1                              |
| **Priority**      | High                                                                                               |
| **Version**       | v1.0+                                                                                              |
| **Status**        | Not Executed                                                                                       |
| **Platform**      | Web                                                                                                |
| **Environment**   | Staging                                                                                            |

### Test Data

- **Total Pages:** Unknown (varies by user)
- **Last Page Number:** Displayed on pagination control

### Test Steps

1. Scroll to pagination controls
2. Identify the last page number displayed
3. Click on the last page number button
4. Wait for the page to load
5. Verify the activity list loads with activities from the last page
6. Verify the current page indicator shows the last page is highlighted
7. Verify the "Next" button is now disabled (grayed out)
8. Verify the "Previous" button is enabled

### Expected Result

The last page loads successfully with its activities. The Next button is disabled. The Previous button is enabled. The last page number is highlighted in the pagination controls.

### Postconditions

No cleanup required.

---

## Test Case 7: Empty Activity List

### Metadata

| Field             | Value                                                                 |
| ----------------- | --------------------------------------------------------------------- |
| **Title**         | Empty activity list message is displayed                              |
| **Objective**     | Verify that appropriate message is shown when user has no activities. |
| **Preconditions** | User is logged in; user account has zero activities in the database   |
| **Priority**      | High                                                                  |
| **Version**       | v1.0+                                                                 |
| **Status**        | Not Executed                                                          |
| **Platform**      | Web                                                                   |
| **Environment**   | Staging                                                               |

### Test Data

- **Activities Count:** 0

### Test Steps

1. Navigate to the dashboard after logging in (for a user with no activities)
2. Look for the activity list section
3. Verify the message "There's no items to display." is shown
4. Verify no activity items are rendered
5. Verify pagination controls are not visible

### Expected Result

The activity list section displays the message "There's no items to display." No activities or pagination controls are shown.

### Postconditions

No cleanup required.

---

## Test Case 8: Network Error Handling

### Metadata

| Field             | Value                                                                             |
| ----------------- | --------------------------------------------------------------------------------- |
| **Title**         | Network error message and retry button are displayed                              |
| **Objective**     | Verify that appropriate error handling occurs when network error is encountered.  |
| **Preconditions** | User is logged in; network connectivity is disrupted or API server is unavailable |
| **Priority**      | High                                                                              |
| **Version**       | v1.0+                                                                             |
| **Status**        | Not Executed                                                                      |
| **Platform**      | Web                                                                               |
| **Environment**   | Staging                                                                           |

### Test Data

- **Error Condition:** Network disconnection or server unavailability

### Test Steps

1. Navigate to the dashboard while logged in
2. Simulate or trigger a network error (disconnect network or stop API server)
3. Observe the activity list section
4. Verify the message "Please check your network connection." is displayed
5. Verify a "Try Again" button is visible
6. Restore network connectivity or restart API server
7. Click the "Try Again" button
8. Verify the activity list reloads successfully

### Expected Result

When network error occurs, the error message "Please check your network connection." is displayed with a "Try Again" button. After clicking "Try Again" and restoring connectivity, the activity list reloads successfully.

### Postconditions

Restore normal network connectivity.

---

## Test Case 9: Date Grouping and Sorting

### Metadata

| Field             | Value                                                                                         |
| ----------------- | --------------------------------------------------------------------------------------------- |
| **Title**         | Activities are correctly grouped and sorted by date                                           |
| **Objective**     | Verify that activities are properly grouped by date and sorted from newest to oldest.         |
| **Preconditions** | User is logged in; user has activities from multiple days spanning at least 5 different dates |
| **Priority**      | High                                                                                          |
| **Version**       | v1.0+                                                                                         |
| **Status**        | Not Executed                                                                                  |
| **Platform**      | Web                                                                                           |
| **Environment**   | Staging                                                                                       |

### Test Data

- **Activities Span:** At least 5 different dates
- **Sort Order:** Newest first (descending date order)

### Test Steps

1. Navigate to the activity list on the dashboard
2. Examine all date group headers visible on the page
3. Verify date headers are displayed in format: "Day, Date Mon, Year" (e.g., "Mon, 27 Apr, 2026")
4. Verify dates are ordered from newest to oldest (top to bottom)
5. For each date group, verify activities are ordered by time (newest first)
6. Scroll through multiple pages (if applicable) and verify the same ordering pattern
7. Confirm no date group appears more than once

### Expected Result

Activities are grouped by date with properly formatted headers. Date groups are ordered newest to oldest. Activities within each group are ordered by time (newest first). The ordering is consistent across all pages.

### Postconditions

No cleanup required.

---

## Test Case 10: Activity Item Display Details

### Metadata

| Field             | Value                                                                                  |
| ----------------- | -------------------------------------------------------------------------------------- |
| **Title**         | Activity item displays all required information                                        |
| **Objective**     | Verify that each activity item displays time, description, amount, and tags correctly. |
| **Preconditions** | User is logged in; user has at least one activity with tags                            |
| **Priority**      | High                                                                                   |
| **Version**       | v1.0+                                                                                  |
| **Status**        | Not Executed                                                                           |
| **Platform**      | Web                                                                                    |
| **Environment**   | Staging                                                                                |

### Test Data

- **Sample Activity:**
  - Time: 10:42 am
  - Description: "mua gói tưa dâu dành cho ghế 89k"
  - Amount: 89
  - Tags: ["nec", "household"]

### Test Steps

1. Navigate to the activity list
2. Locate an activity with tags
3. Verify the time is displayed with an icon (e.g., "⏱ 10:42 am")
4. Verify the description/content is displayed clearly
5. Verify the amount is displayed
6. Verify tags are displayed on the right side of the item
7. Verify tags are prefixed with "#" (e.g., "#nec", "#household")
8. Verify multiple tags are displayed if associated with the activity

### Expected Result

The activity item displays complete information: time with icon, description, amount, and all associated tags (prefixed with #) on the right side.

### Postconditions

No cleanup required.

---

## Test Case 11: Income and Expense Color Differentiation

### Metadata

| Field             | Value                                                                                                               |
| ----------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Title**         | Income and expense transactions show color differentiation                                                          |
| **Objective**     | Verify that income and expense amounts are displayed with distinct visual differentiation for quick identification. |
| **Preconditions** | User is logged in; user has both income and expense activities                                                      |
| **Priority**      | Medium                                                                                                              |
| **Version**       | v1.0+                                                                                                               |
| **Status**        | Not Executed                                                                                                        |
| **Platform**      | Web                                                                                                                 |
| **Environment**   | Staging                                                                                                             |

### Test Data

- **Income Activity:** Amount displayed in one color (e.g., green)
- **Expense Activity:** Amount displayed in another color (e.g., red)

### Test Steps

1. Navigate to the activity list
2. Identify an income transaction
3. Verify the amount is displayed in a distinct color (e.g., green)
4. Identify an expense transaction
5. Verify the amount is displayed in a different color (e.g., red)
6. Verify the color difference is clearly visible and distinguishable
7. Verify colors are consistently applied across all pages

### Expected Result

Income and expense amounts are displayed with distinct colors that are clearly visible and consistent throughout the activity list.

### Postconditions

No cleanup required.

---

## Test Case 12: Page Size Verification

### Metadata

| Field             | Value                                                        |
| ----------------- | ------------------------------------------------------------ |
| **Title**         | Each page displays exactly 5 items                           |
| **Objective**     | Verify that the page size is consistent at 5 items per page. |
| **Preconditions** | User is logged in; user has more than 10 activities          |
| **Priority**      | Medium                                                       |
| **Version**       | v1.0+                                                        |
| **Status**        | Not Executed                                                 |
| **Platform**      | Web                                                          |
| **Environment**   | Staging                                                      |

### Test Data

- **Expected Page Size:** 5 items

### Test Steps

1. Navigate to page 1 of the activity list
2. Count the number of activities displayed on page 1
3. Verify exactly 5 activities are shown
4. Navigate to page 2
5. Count the number of activities displayed on page 2
6. Verify exactly 5 activities are shown (or less if it's the last page with fewer items)
7. Navigate to other pages and repeat the verification

### Expected Result

Each page (except possibly the last page) displays exactly 5 activities. The last page displays the remaining activities (fewer than 10).

### Postconditions

No cleanup required.

---

## Test Case 13: Responsive Design on Mobile

### Metadata

| Field             | Value                                                                    |
| ----------------- | ------------------------------------------------------------------------ |
| **Title**         | Activity list is responsive and usable on mobile devices                 |
| **Objective**     | Verify that the activity list displays correctly on mobile screen sizes. |
| **Preconditions** | User is logged in; user has at least 5 activities                        |
| **Priority**      | Medium                                                                   |
| **Version**       | v1.0+                                                                    |
| **Status**        | Not Executed                                                             |
| **Platform**      | Mobile (iOS/Android)                                                     |
| **Environment**   | Staging                                                                  |

### Test Data

- **Screen Size:** Mobile (e.g., 375x667 for iPhone)

### Test Steps

1. Access the dashboard on a mobile device (or emulated mobile viewport)
2. Verify the activity list is visible and readable
3. Verify activity items are properly formatted on narrow screens
4. Verify tags wrap or adjust layout appropriately
5. Verify pagination controls are accessible and usable on mobile
6. Verify horizontal scrolling is not required for main content
7. Verify all text is readable without zooming

### Expected Result

The activity list displays properly on mobile screens with appropriate layout adjustments. All elements are accessible and readable without horizontal scrolling.

### Postconditions

No cleanup required.
