# View Activity List Test Suite

## Introduction

- **Feature:** Diary - View Activity List
- **Author:** QA Team

---

## Test Case 1: Display Activity List on Dashboard Load

### Metadata

| Field              | Value |
|--------------------|---------|
| **ID**             | TC-VAL-001 |
| **Title**          | Activity list displays on dashboard load |
| **Objective**      | Verify that activities are fetched and displayed correctly when the dashboard loads. |
| **Preconditions**  | User is logged in; user has activities in database |
| **Priority**       | High |
| **Version**        | v1.0+ |
| **Status**         | Not Executed |
| **Platform**       | Web |
| **Environment**    | Staging |

### Test Data

- **User account:** Valid authenticated user with existing activities

### Test Steps

1. Ensure user is logged in
2. Navigate to the dashboard
3. Wait for the activity list to load
4. Observe the activity list section

### Expected Result

The activity list displays with:
- Activities grouped by date (newest date first)
- Each date header showing the date in format "Day, DD Mon, YYYY" (e.g., "Thu, 23 Apr, 2026")
- Multiple activity items visible under the first date group
- At least 10 activities visible (first page)
- Pagination controls visible at the bottom of the list

### Postconditions

No cleanup required.

---

## Test Case 2: Verify Activity Item Details Display

### Metadata

| Field              | Value |
|--------------------|---------|
| **ID**             | TC-VAL-002 |
| **Title**          | Activity item displays all required details |
| **Objective**      | Verify that each activity item shows time, description, amount, and tags. |
| **Preconditions**  | User is logged in; activity list is displayed |
| **Priority**       | High |
| **Version**        | v1.0+ |
| **Status**         | Not Executed |
| **Platform**       | Web |
| **Environment**    | Staging |

### Test Data

- **Activity 1:** Time: 10:42 am, Description: "mua gói tưa dâu dành cho ghế", Amount: 89k (expense)
- **Activity 2:** Time: 8:00 am, Description: "ăn sáng bún riêu", Amount: 45k (expense)

### Test Steps

1. Ensure user is logged in and activity list is displayed
2. Locate the first activity item in the list
3. Verify the time is displayed with icon (e.g., "⏱ 10:42 am")
4. Verify the description text is displayed
5. Verify the amount is displayed (e.g., "89")
6. Verify tags are displayed on the right side (e.g., "#nec", "#household")
7. Repeat steps 2-6 for at least two more activity items

### Expected Result

Each activity item displays:
- Time with icon in the format "⏱ HH:MM am/pm"
- Description text below the time
- Amount on a separate line (numeric value)
- Associated tags on the right side with "#" prefix
- All elements are properly positioned and visible

### Postconditions

No cleanup required.

---

## Test Case 3: Verify Activity Date Grouping and Sorting

### Metadata

| Field              | Value |
|--------------------|---------|
| **ID**             | TC-VAL-003 |
| **Title**          | Activities are grouped by date with newest first |
| **Objective**      | Verify that activities are correctly grouped by date and sorted newest first. |
| **Preconditions**  | User is logged in; user has activities spanning multiple dates |
| **Priority**       | High |
| **Version**        | v1.0+ |
| **Status**         | Not Executed |
| **Platform**       | Web |
| **Environment**    | Staging |

### Test Data

- **Activities:** Mix of activities from different dates (at least 3 different dates)

### Test Steps

1. Ensure user is logged in and activity list is displayed
2. Note the first date header visible
3. Scroll down or observe subsequent date headers
4. Record the order of the date headers
5. Verify the dates are in descending order (newest first)
6. Within each date group, verify activities are sorted by time (newest first)

### Expected Result

- Date headers appear in descending chronological order (newest date at top)
- Activities within each date group are ordered by time with newest times first
- Each date group is clearly separated with a header
- No activities appear in multiple date groups

### Postconditions

No cleanup required.

---

## Test Case 4: Verify Expense Amount Color (Red)

### Metadata

| Field              | Value |
|--------------------|---------|
| **ID**             | TC-VAL-004 |
| **Title**          | Expense amounts are displayed in red color |
| **Objective**      | Verify that expense transactions are displayed with red color differentiation. |
| **Preconditions**  | User is logged in; activity list is displayed with expense items |
| **Priority**       | High |
| **Version**        | v1.0+ |
| **Status**         | Not Executed |
| **Platform**       | Web |
| **Environment**    | Staging |

### Test Data

- **Expense activity:** Description: "Expense transaction", Amount: 100 (expense)

### Test Steps

1. Ensure user is logged in and activity list is displayed
2. Locate an expense activity item
3. Inspect the amount element's color property
4. Verify the color is red or a red shade (hex code starting with #FF or similar)

### Expected Result

The expense amount is displayed in red color, distinctly different from other text colors on the page.

### Postconditions

No cleanup required.

---

## Test Case 5: Verify Income Amount Color (Green)

### Metadata

| Field              | Value |
|--------------------|---------|
| **ID**             | TC-VAL-005 |
| **Title**          | Income amounts are displayed in green color |
| **Objective**      | Verify that income transactions are displayed with green color differentiation. |
| **Preconditions**  | User is logged in; activity list contains at least one income item |
| **Priority**       | High |
| **Version**        | v1.0+ |
| **Status**         | Not Executed |
| **Platform**       | Web |
| **Environment**    | Staging |

### Test Data

- **Income activity:** Description: "Income transaction", Amount: 500 (income)

### Test Steps

1. Ensure user is logged in and activity list is displayed
2. Locate an income activity item
3. Inspect the amount element's color property
4. Verify the color is green or a green shade

### Expected Result

The income amount is displayed in green color, distinctly different from expense amounts and other text colors.

### Postconditions

No cleanup required.

---

## Test Case 6: Navigate to Next Page

### Metadata

| Field              | Value |
|--------------------|---------|
| **ID**             | TC-VAL-006 |
| **Title**          | User can navigate to next page using next button |
| **Objective**      | Verify that the next page button works correctly and displays the next set of activities. |
| **Preconditions**  | User is logged in; activity list has multiple pages; user is on page 1 |
| **Priority**       | High |
| **Version**        | v1.0+ |
| **Status**         | Not Executed |
| **Platform**       | Web |
| **Environment**    | Staging |

### Test Data

- **Current page:** Page 1
- **Expected next page:** Page 2

### Test Steps

1. Ensure user is logged in and activity list is displayed on page 1
2. Locate the pagination controls at the bottom
3. Verify the next button (">") is visible and enabled
4. Click the next button
5. Wait for page to load
6. Verify the new set of activities is displayed
7. Verify the page indicator shows page 2

### Expected Result

- The next button is clickable on page 1
- Clicking next navigates to page 2
- New activities are displayed that are different from page 1
- The current page indicator changes to "2"
- The URL or state updates to reflect page 2

### Postconditions

No cleanup required.

---

## Test Case 7: Navigate to Previous Page

### Metadata

| Field              | Value |
|--------------------|---------|
| **ID**             | TC-VAL-007 |
| **Title**          | User can navigate to previous page using previous button |
| **Objective**      | Verify that the previous page button works correctly from page 2. |
| **Preconditions**  | User is logged in; activity list has multiple pages; user is on page 2 |
| **Priority**       | High |
| **Version**        | v1.0+ |
| **Status**         | Not Executed |
| **Platform**       | Web |
| **Environment**    | Staging |

### Test Data

- **Current page:** Page 2
- **Expected previous page:** Page 1

### Test Steps

1. Ensure user is logged in and on page 2 of activity list
2. Locate the pagination controls
3. Verify the previous button ("<") is visible and enabled
4. Click the previous button
5. Wait for page to load
6. Verify activities from page 1 are displayed
7. Verify the page indicator shows page 1

### Expected Result

- The previous button is clickable on page 2
- Clicking previous navigates to page 1
- The original activities from page 1 are displayed
- The current page indicator changes to "1"

### Postconditions

No cleanup required.

---

## Test Case 8: Direct Page Navigation via Page Number

### Metadata

| Field              | Value |
|--------------------|---------|
| **ID**             | TC-VAL-008 |
| **Title**          | User can navigate to specific page by clicking page number |
| **Objective**      | Verify that clicking a page number button navigates directly to that page. |
| **Preconditions**  | User is logged in; activity list has at least 5 pages |
| **Priority**       | High |
| **Version**        | v1.0+ |
| **Status**         | Not Executed |
| **Platform**       | Web |
| **Environment**    | Staging |

### Test Data

- **Current page:** Page 1
- **Target page:** Page 4

### Test Steps

1. Ensure user is logged in and activity list is displayed on page 1
2. Locate the pagination controls
3. Identify page 4 button in the pagination
4. Click on page 4
5. Wait for page to load
6. Verify the page indicator shows page 4
7. Verify new activities are displayed

### Expected Result

- Page 4 button is clickable
- Clicking page 4 navigates directly to page 4
- The page indicator shows "4" with gray background styling
- Activities specific to page 4 are displayed

### Postconditions

No cleanup required.

---

## Test Case 9: Verify Previous Button Disabled on First Page

### Metadata

| Field              | Value |
|--------------------|---------|
| **ID**             | TC-VAL-009 |
| **Title**          | Previous button is disabled on first page |
| **Objective**      | Verify that the previous button is disabled and non-clickable on page 1. |
| **Preconditions**  | User is logged in; activity list is displayed on page 1 |
| **Priority**       | Medium |
| **Version**        | v1.0+ |
| **Status**         | Not Executed |
| **Platform**       | Web |
| **Environment**    | Staging |

### Test Data

- **Current page:** Page 1

### Test Steps

1. Ensure user is logged in and activity list is displayed on page 1
2. Locate the pagination controls
3. Verify the previous button ("<") is visible
4. Check if the previous button appears disabled (grayed out or similar styling)
5. Attempt to click the previous button
6. Verify no page change occurs

### Expected Result

- The previous button is visually disabled (grayed out)
- The previous button is not clickable
- No navigation occurs when attempting to click previous on page 1

### Postconditions

No cleanup required.

---

## Test Case 10: Verify Next Button Disabled on Last Page

### Metadata

| Field              | Value |
|--------------------|---------|
| **ID**             | TC-VAL-010 |
| **Title**          | Next button is disabled on last page |
| **Objective**      | Verify that the next button is disabled on the last page of activities. |
| **Preconditions**  | User is logged in; user is on the last page of activity list |
| **Priority**       | Medium |
| **Version**        | v1.0+ |
| **Status**         | Not Executed |
| **Platform**       | Web |
| **Environment**    | Staging |

### Test Data

- **Current page:** Last page (e.g., Page 20)

### Test Steps

1. Navigate to the last page of activity list
2. Locate the pagination controls
3. Verify the next button (">") is visible
4. Check if the next button appears disabled (grayed out or similar styling)
5. Attempt to click the next button
6. Verify no page change occurs

### Expected Result

- The next button is visually disabled
- The next button is not clickable on the last page
- No navigation occurs when attempting to click next on the last page

### Postconditions

No cleanup required.

---

## Test Case 11: Verify Pagination Controls Display

### Metadata

| Field              | Value |
|--------------------|---------|
| **ID**             | TC-VAL-011 |
| **Title**          | Pagination controls display correctly |
| **Objective**      | Verify that pagination controls show correct page numbers, ellipsis, and buttons. |
| **Preconditions**  | User is logged in; activity list has at least 20 pages |
| **Priority**       | Medium |
| **Version**        | v1.0+ |
| **Status**         | Not Executed |
| **Platform**       | Web |
| **Environment**    | Staging |

### Test Data

- **Total pages:** 20 or more
- **Current page:** Page 1

### Test Steps

1. Ensure user is logged in and activity list is displayed
2. Observe the pagination controls
3. Verify the first page button shows "1"
4. Verify the last page button shows the total page count (e.g., "20")
5. Verify ellipsis ("...") appears between page numbers when necessary
6. Verify the current page is highlighted/styled differently
7. Navigate to a middle page (e.g., page 10)
8. Verify pagination controls update to show nearby page numbers and ellipsis appropriately

### Expected Result

- Pagination controls show: `< 1 ... [nearby pages] [current page] [nearby pages] ... [last page] >`
- Current page has distinct styling (gray background)
- Ellipsis appears to indicate skipped pages
- First page button always visible
- Last page button always visible
- Pagination updates when navigating to different pages

### Postconditions

No cleanup required.

---

## Test Case 12: Empty Activity List Display

### Metadata

| Field              | Value |
|--------------------|---------|
| **ID**             | TC-VAL-012 |
| **Title**          | Empty state message displays when no activities exist |
| **Objective**      | Verify that appropriate empty state message is shown when user has no activities. |
| **Preconditions**  | User is logged in; user has no activities in database |
| **Priority**       | High |
| **Version**        | v1.0+ |
| **Status**         | Not Executed |
| **Platform**       | Web |
| **Environment**    | Staging |

### Test Data

- **User account:** Valid authenticated user with no activities

### Test Steps

1. Ensure user is logged in and user has no activities
2. Navigate to the dashboard
3. Observe the activity list section

### Expected Result

- The message "There's no items to display." is shown
- No activity items are visible
- No pagination controls are displayed
- The empty state message is clearly visible and readable

### Postconditions

No cleanup required.

---

## Test Case 13: Network Error Handling

### Metadata

| Field              | Value |
|--------------------|---------|
| **ID**             | TC-VAL-013 |
| **Title**          | Network error message displays with retry option |
| **Objective**      | Verify that appropriate error message and retry button appear when network request fails. |
| **Preconditions**  | User is logged in; network connection is simulated as offline or API request fails |
| **Priority**       | High |
| **Version**        | v1.0+ |
| **Status**         | Not Executed |
| **Platform**       | Web |
| **Environment**    | Staging |

### Test Data

- **Network condition:** Offline or failed API response

### Test Steps

1. Ensure user is logged in
2. Simulate network error (using dev tools or network throttling)
3. Navigate to dashboard or refresh the page
4. Wait for activity list to attempt loading
5. Observe the error message

### Expected Result

- Error message "Please check your network connection." is displayed
- A "Try Again" button is visible and clickable
- No activity items are displayed
- The page does not crash or show generic error

### Postconditions

- Restore network connection
- Click "Try Again" button to verify functionality returns

---

## Test Case 14: Retry After Network Error

### Metadata

| Field              | Value |
|--------------------|---------|
| **ID**             | TC-VAL-014 |
| **Title**          | Activity list loads after clicking Try Again |
| **Objective**      | Verify that activities load successfully after retrying from error state. |
| **Preconditions**  | User is logged in; network error is displayed with "Try Again" button |
| **Priority**       | High |
| **Version**        | v1.0+ |
| **Status**         | Not Executed |
| **Platform**       | Web |
| **Environment**    | Staging |

### Test Data

- **Initial state:** Network error displayed

### Test Steps

1. Ensure network error is displayed with "Try Again" button
2. Restore network connection
3. Click the "Try Again" button
4. Wait for activity list to load
5. Verify activities are displayed

### Expected Result

- The error message disappears
- Activities load and display correctly
- Pagination controls reappear
- The page returns to normal state

### Postconditions

No cleanup required.

---

## Test Case 15: Page Load with Exactly 10 Activities

### Metadata

| Field              | Value |
|--------------------|---------|
| **ID**             | TC-VAL-015 |
| **Title**          | Pagination shows page 1 only when total activities equals page size |
| **Objective**      | Verify that pagination controls display correctly when there are exactly 10 activities. |
| **Preconditions**  | User is logged in; user has exactly 10 activities in database |
| **Priority**       | Medium |
| **Version**        | v1.0+ |
| **Status**         | Not Executed |
| **Platform**       | Web |
| **Environment**    | Staging |

### Test Data

- **Total activities:** 10

### Test Steps

1. Ensure user is logged in with exactly 10 activities
2. Navigate to dashboard
3. Wait for activity list to load
4. Count visible activities
5. Observe pagination controls

### Expected Result

- All 10 activities are displayed on the page
- Pagination controls show only "1" as the available page
- Next button is disabled
- Previous button is disabled
- No ellipsis appears

### Postconditions

No cleanup required.

---

## Test Case 16: Page Load with 11 Activities (Multiple Pages)

### Metadata

| Field              | Value |
|--------------------|---------|
| **ID**             | TC-VAL-016 |
| **Title**          | Pagination controls appear when activities exceed page size |
| **Objective**      | Verify that pagination controls enable when there are more than 10 activities. |
| **Preconditions**  | User is logged in; user has 11 activities in database |
| **Priority**       | Medium |
| **Version**        | v1.0+ |
| **Status**         | Not Executed |
| **Platform**       | Web |
| **Environment**    | Staging |

### Test Data

- **Total activities:** 11

### Test Steps

1. Ensure user is logged in with 11 activities
2. Navigate to dashboard
3. Wait for activity list to load
4. Count visible activities
5. Observe pagination controls

### Expected Result

- Page 1 displays 10 activities
- Pagination controls show pages "1" and "2"
- Next button is enabled
- Next button navigates to page 2 with 1 remaining activity

### Postconditions

No cleanup required.

---

## Test Case 17: Page Size Consistency

### Metadata

| Field              | Value |
|--------------------|---------|
| **ID**             | TC-VAL-017 |
| **Title**          | All pages display correct number of items (10 per page) |
| **Objective**      | Verify that each page displays the correct number of activities (10 per page). |
| **Preconditions**  | User is logged in; user has at least 25 activities |
| **Priority**       | Medium |
| **Version**        | v1.0+ |
| **Status**         | Not Executed |
| **Platform**       | Web |
| **Environment**    | Staging |

### Test Data

- **Total activities:** At least 25

### Test Steps

1. Ensure user is logged in with sufficient activities
2. Navigate to dashboard on page 1
3. Count the number of activities displayed
4. Navigate to page 2
5. Count the number of activities displayed
6. Navigate to page 3
7. Count the number of activities displayed

### Expected Result

- Page 1 displays exactly 10 activities
- Page 2 displays exactly 10 activities
- Page 3 displays exactly 10 activities
- All activities within each page are unique (no duplicates across pages)

### Postconditions

No cleanup required.

---

## Test Case 18: Invalid Page Number Redirects to First Page

### Metadata

| Field              | Value |
|--------------------|---------|
| **ID**             | TC-VAL-018 |
| **Title**          | Invalid page number redirects to first page |
| **Objective**      | Verify that accessing an invalid page number redirects to page 1. |
| **Preconditions**  | User is logged in; activity list has 5 pages |
| **Priority**       | Medium |
| **Version**        | v1.0+ |
| **Status**         | Not Executed |
| **Platform**       | Web |
| **Environment**    | Staging |

### Test Data

- **Invalid page number:** 999
- **Total pages:** 5

### Test Steps

1. Ensure user is logged in
2. Navigate to dashboard
3. Manually change URL to navigate to page 999 (or simulate invalid page)
4. Observe page behavior

### Expected Result

- Invalid page request is handled gracefully
- User is redirected to page 1
- Activities from page 1 are displayed
- No error message is shown

### Postconditions

No cleanup required.

---

## Test Case 19: Activity Tags Display Multiple Tags

### Metadata

| Field              | Value |
|--------------------|---------|
| **ID**             | TC-VAL-019 |
| **Title**          | Multiple tags display correctly for a single activity |
| **Objective**      | Verify that activities with multiple tags display all tags properly. |
| **Preconditions**  | User is logged in; activity list contains items with multiple tags |
| **Priority**       | Medium |
| **Version**        | v1.0+ |
| **Status**         | Not Executed |
| **Platform**       | Web |
| **Environment**    | Staging |

### Test Data

- **Activity:** Description: "mua gói tưa dâu dành cho ghế", Tags: #nec, #household, #food

### Test Steps

1. Ensure user is logged in and activity list is displayed
2. Locate an activity item with multiple tags
3. Verify all tags are displayed
4. Verify tags are on the right side of the activity item
5. Verify tags are separated clearly

### Expected Result

- All tags are visible and readable
- Each tag displays with "#" prefix
- Tags are properly spaced or separated
- Tags do not overlap with other content
- Tags are positioned on the right side of the activity item

### Postconditions

No cleanup required.

---

## Test Case 20: Large Amounts Display with Thousand Separator

### Metadata

| Field              | Value |
|--------------------|---------|
| **ID**             | TC-VAL-020 |
| **Title**          | Large amounts display with thousand separators |
| **Objective**      | Verify that amounts greater than 999 display with proper thousand separators. |
| **Preconditions**  | User is logged in; activity list contains large amounts |
| **Priority**       | Medium |
| **Version**        | v1.0+ |
| **Status**         | Not Executed |
| **Platform**       | Web |
| **Environment**    | Staging |

### Test Data

- **Large expense amount:** 1,000k
- **Large income amount:** 5,500k

### Test Steps

1. Ensure user is logged in and activity list is displayed
2. Locate an activity with a large amount (1,000 or more)
3. Verify the amount displays with thousand separators (e.g., "1,000" not "1000")
4. Locate another activity with different large amount
5. Verify formatting is consistent

### Expected Result

- Amounts 1,000 and above display with comma separators
- Format is consistent across all activities
- Separators do not interfere with readability
- Color differentiation (red/green) still applies

### Postconditions

No cleanup required.

---

## Test Case 21: Responsiveness on Mobile Viewport

### Metadata

| Field              | Value |
|--------------------|---------|
| **ID**             | TC-VAL-021 |
| **Title**          | Activity list displays correctly on mobile viewport |
| **Objective**      | Verify that the activity list is responsive and usable on mobile devices. |
| **Preconditions**  | User is logged in; browser is set to mobile viewport (375px width) |
| **Priority**       | Medium |
| **Version**        | v1.0+ |
| **Status**         | Not Executed |
| **Platform**       | Web |
| **Environment**    | Staging |

### Test Data

- **Viewport:** 375px x 667px (mobile)

### Test Steps

1. Set browser to mobile viewport (375px width)
2. Ensure user is logged in
3. Navigate to dashboard
4. Wait for activity list to load
5. Verify all elements are visible without horizontal scrolling
6. Verify text is readable
7. Verify buttons are tappable
8. Verify tags do not wrap awkwardly

### Expected Result

- All activity content is visible on mobile viewport
- No horizontal scrolling is required
- Text is readable without zooming
- Pagination controls are accessible
- Tags and amounts fit without excessive wrapping

### Postconditions

Restore browser to normal viewport.

---

## Test Case 22: Load State During Data Fetching

### Metadata

| Field              | Value |
|--------------------|---------|
| **ID**             | TC-VAL-022 |
| **Title**          | Loading state displays while fetching activities |
| **Objective**      | Verify that a loading indicator appears while activities are being fetched. |
| **Preconditions**  | User is logged in; network throttling is enabled to simulate slow connection |
| **Priority**       | Low |
| **Version**        | v1.0+ |
| **Status**         | Not Executed |
| **Platform**       | Web |
| **Environment**    | Staging |

### Test Data

- **Network condition:** Slow 4G or similar throttling

### Test Steps

1. Enable network throttling (slow 4G)
2. Ensure user is logged in
3. Refresh dashboard page
4. Quickly observe the loading state before activities load
5. Verify a loading indicator is displayed

### Expected Result

- A loading spinner, skeleton screen, or similar indicator appears
- Loading state is visible before activities are rendered
- Once activities load, loading indicator disappears
- Activities are displayed in full

### Postconditions

Disable network throttling.

---

## Test Case 23: Date Header Format Consistency

### Metadata

| Field              | Value |
|--------------------|---------|
| **ID**             | TC-VAL-023 |
| **Title**          | All date headers follow consistent format |
| **Objective**      | Verify that all date headers display in consistent format. |
| **Preconditions**  | User is logged in; activity list contains activities from various dates |
| **Priority**       | Low |
| **Version**        | v1.0+ |
| **Status**         | Not Executed |
| **Platform**       | Web |
| **Environment**    | Staging |

### Test Data

- **Dates:** Various dates across different months and years

### Test Steps

1. Ensure user is logged in and activity list is displayed
2. Observe the first date header
3. Verify format: "Day, DD Mon, YYYY" (e.g., "Thu, 23 Apr, 2026")
4. Observe additional date headers on the same page
5. Scroll to other pages and verify date header format
6. Check for any inconsistencies in format

### Expected Result

- All date headers follow the same format: "Day, DD Mon, YYYY"
- Day abbreviations are consistent (Mon, Tue, Wed, etc.)
- Month abbreviations are consistent (Jan, Feb, Mar, etc.)
- Year displays with 4 digits
- No variations in formatting across pages

### Postconditions

No cleanup required.

---

## Test Case 24: No Data Loss on Page Navigation

### Metadata

| Field              | Value |
|--------------------|---------|
| **ID**             | TC-VAL-024 |
| **Title**          | Activities remain consistent when navigating between pages |
| **Objective**      | Verify that data integrity is maintained when navigating between pages. |
| **Preconditions**  | User is logged in; activity list has multiple pages |
| **Priority**       | Medium |
| **Version**        | v1.0+ |
| **Status**         | Not Executed |
| **Platform**       | Web |
| **Environment**    | Staging |

### Test Data

- **Test activities:** Record specific activity details (description, amount) from page 1

### Test Steps

1. Ensure user is logged in and activity list is on page 1
2. Note details of 2-3 specific activities on page 1
3. Navigate to page 2
4. Navigate back to page 1
5. Verify the same activities with identical details are displayed

### Expected Result

- Activities on page 1 remain unchanged after navigating away and back
- Details (description, amount, tags, time) are identical
- No activities are missing or duplicated
- Date groupings remain consistent

### Postconditions

No cleanup required.

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
