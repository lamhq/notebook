# Search Activity Test Suite

## Introduction

- **Feature:** Search Activity List - Allows users to filter and find specific activities by text content, tags, and time range
- **Author:** QA Team

---

## TC_SA_01 - Search Dialog Opens via Filter Icon

### Description

Verify that the search dialog opens when user clicks the filter icon in the activity list toolbar.

### Pre-conditions

- Application is accessible
- User is logged in
- User is on the homepage/activity list page
- Activities exist in the system

### Test Data

- No specific test data required

### Test Steps

1. Navigate to the activity list page (homepage)
2. Locate the filter icon button in the activity list toolbar
3. Click the filter icon button

### Expected Result

- Search dialog opens successfully
- Dialog title "Search activities" is displayed
- Text field is auto-focused (cursor visible in text input)
- Form contains Text, Tags, and Time Range fields
- Time Range field shows default value "This Month"
- Reset and Search buttons are visible and enabled

### Postconditions

- Close dialog by pressing Escape or clicking outside
- Activity list remains unchanged

---

## TC_SA_02 - Text Search with Single Keyword

### Description

Verify that user can search activities by entering text in the Text field and results are filtered correctly.

### Pre-conditions

- Application is accessible
- User is logged in
- User is on the homepage
- Activities with various content exist (at least 2 activities with "coffee" in content, others without)

### Test Data

- Text input: "coffee"

### Test Steps

1. Click the filter icon to open search dialog
2. Verify Text field is auto-focused
3. Enter "coffee" in the Text field
4. Click "Search" button

### Expected Result

- Dialog closes after clicking Search
- Activity list updates to show only activities containing "coffee" in content
- Pagination controls show appropriate count
- Results are sorted with most recent activities first

### Postconditions

- All search results are displayed with correct filtering applied
- User can click filter icon again to modify search

---

## TC_SA_03 - Tag Filtering with Single Tag

### Description

Verify that user can select a single tag and activities are filtered to show only those with the selected tag.

### Pre-conditions

- Application is accessible
- User is logged in
- User is on the homepage
- Tags exist in the system
- Activities with different tags exist

### Test Data

- Selected tag: "food"

### Test Steps

1. Click the filter icon to open search dialog
2. Click on the "Tags" dropdown field
3. Select tag "food" from the dropdown
4. Click "Search" button

### Expected Result

- Tags dropdown shows selected tag "food"
- Dialog closes after clicking Search
- Activity list updates to show only activities with the "food" tag (containing "#food" text)
- Pagination reflects correct number of results

### Postconditions

- All filtered results show the selected tag

---

## TC_SA_04 - Tag Filtering with Multiple Tags

### Description

Verify that user can select multiple tags and activities with ANY of the selected tags are displayed (OR logic).

### Pre-conditions

- Application is accessible
- User is logged in
- User is on the homepage
- At least 3 different tags exist in the system
- Activities with different tag combinations exist

### Test Data

- Selected tags: "food", "restaurant", "dining"

### Test Steps

1. Click the filter icon to open search dialog
2. Click on the "Tags" dropdown field
3. Select first tag "food"
4. Select second tag "restaurant"
5. Select third tag "dining"
6. Click "Search" button

### Expected Result

- All selected tags are displayed in the Tags field
- Dialog closes
- Activity list shows activities containing at least one of the selected tags (OR logic)
- Activities without any of these tags are not displayed

### Postconditions

- Multiple tag filtering works correctly

---

## TC_SA_05 - Preset Time Range - This Month (Default)

### Description

Verify that "This Month" is the default time range option and filtering works correctly.

### Pre-conditions

- Application is accessible
- User is logged in
- User is on the homepage
- Activities from different months exist

### Test Data

- Time Range: "This Month" (default)

### Test Steps

1. Click the filter icon to open search dialog
2. Verify "This Month" is pre-selected in the Time Range dropdown
3. Do not change the time range selection
4. Click "Search" button

### Expected Result

- Time Range field shows "This Month" selected
- Dialog closes
- Activity list displays activities from the first to last day of current month only
- Activities from other months are not displayed

### Postconditions

- Default time range filtering applied correctly

---

## TC_SA_06 - Preset Time Range - All

### Description

Verify that user can select "All" option to view activities without date filtering.

### Pre-conditions

- Application is accessible
- User is logged in
- User is on the homepage
- Activities from multiple months/years exist

### Test Data

- Time Range: "All"

### Test Steps

1. Click the filter icon to open search dialog
2. Click on Time Range dropdown
3. Select "All" option
4. Click "Search" button

### Expected Result

- Time Range shows "All" as selected
- Dialog closes
- Activity list displays all activities regardless of date
- All activities are shown with pagination

### Postconditions

- All activities are displayed without date filtering

---

## TC_SA_07 - Custom Date Range Selection

### Description

Verify that user can select "Custom" time range and specify From/To dates.

### Pre-conditions

- Application is accessible
- User is logged in
- User is on the homepage
- Activities exist in the system

### Test Data

- Time Range: "Custom"
- From Date: April 1, 2026
- To Date: April 30, 2026

### Test Steps

1. Click the filter icon to open search dialog
2. Click on Time Range dropdown
3. Select "Custom" option
4. Verify "From" and "To" date picker fields appear
5. Click on "From" date picker
6. Select April 1, 2026
7. Click on "To" date picker
8. Select April 30, 2026
9. Click "Search" button

### Expected Result

- Time Range shows "Custom" as selected
- "From" and "To" date picker fields are visible and functional
- Selected dates are displayed in the date fields
- Dialog closes after clicking Search
- Activity list displays only activities within the specified date range (April 1 to April 30, 2026)
- From date is at start of day (00:00:00)
- To date is at end of day (23:59:59)

### Postconditions

- Custom date range filtering applied correctly

---

## TC_SA_08 - Combined Search - All Criteria

### Description

Verify that user can combine text, tags, and custom date range in a complex multi-criteria search.

### Pre-conditions

- Application is accessible
- User is logged in
- User is on the homepage
- Activities with various criteria exist

### Test Data

- Text: "coffee"
- Tags: "food", "beverage"
- Time Range: "Custom"
- From Date: April 1, 2026
- To Date: April 15, 2026

### Test Steps

1. Click the filter icon to open search dialog
2. Enter "coffee" in the Text field
3. Select tags "food" and "beverage" from Tags dropdown
4. Select "Custom" from Time Range dropdown
5. Select April 1, 2026 as From date
6. Select April 15, 2026 as To date
7. Click "Search" button

### Expected Result

- Dialog closes
- Activity list shows activities matching ALL criteria:
  - Content contains "coffee" AND
  - Tag is "food" OR "beverage" AND
  - Date is between April 1 and April 15, 2026
- Only activities satisfying all conditions are displayed

### Postconditions

- Complex multi-criteria search executed successfully

---

## TC_SA_09 - Reset Button Clears All Fields

### Description

Verify that clicking the Reset button clears all search fields to default values and dialog remains open.

### Pre-conditions

- Application is accessible
- User is logged in
- Search dialog is open
- User has entered search criteria

### Test Data

- Previous search: Text="coffee", Tags=["food"], Time Range="This Week"

### Test Steps

1. Enter "coffee" in Text field
2. Select "food" tag from Tags dropdown
3. Select "This Week" from Time Range dropdown
4. Click "Reset" button

### Expected Result

- Text field is cleared (empty)
- Tags field is cleared (no tags selected)
- Time Range reverts to default "This Month"
- Custom date fields (if visible) are cleared and hidden
- Search dialog remains open
- Activity list still shows previously filtered results (search not executed)

### Postconditions

- User can enter new search criteria or close dialog
- Dialog can be closed by clicking outside or pressing Escape

---

## TC_SA_10 - No Search Results Display Empty State

### Description

Verify that when search criteria return no results, the empty state message is displayed.

### Pre-conditions

- Application is accessible
- User is logged in
- User is on the homepage

### Test Data

- Search text: "NonexistentActivityContent12345"
- Expected: No matching activities

### Test Steps

1. Click filter icon to open search dialog
2. Enter "NonexistentActivityContent12345" in Text field
3. Click "Search" button

### Expected Result

- Dialog closes
- Activity list displays empty state
- Message "There's no items to display." is shown
- No activities are listed
- Pagination controls are hidden or show 0 items

### Postconditions

- User can click filter icon again to perform new search

---

## TC_SA_11 - Pagination Resets After Search

### Description

Verify that pagination resets to page 1 after performing a search.

### Pre-conditions

- Application is accessible
- User is logged in
- Activity list currently displays page 3 or higher
- Results per page: 10 activities

### Test Data

- Search text: "activity"

### Test Steps

1. Navigate to page 3 of the activity list
2. Click filter icon to open search dialog
3. Enter "activity" in Text field
4. Click "Search" button

### Expected Result

- Dialog closes
- Activity list updates with search results
- Pagination controls show page 1 as current page
- Results display items from page 1 of filtered results

### Postconditions

- Pagination is at page 1 after search

---

## TC_SA_12 - Incomplete Custom Date Range Handling

### Description

Verify that search cannot proceed when Custom date range is selected but dates are not completely filled.

### Pre-conditions

- Application is accessible
- User is logged in
- Search dialog is open

### Test Data

- Time Range: "Custom"
- From Date: April 1, 2026
- To Date: (empty/not selected)

### Test Steps

1. Click filter icon to open search dialog
2. Select "Custom" from Time Range dropdown
3. Select April 1, 2026 as From date
4. Leave To date empty/not selected
5. Attempt to click "Search" button

### Expected Result

- Validation message appear, indicating one of two dates are required
- Search are note executed
- Dialog does not close
- Activity list is not updated

---

## TC_SA_13 - Responsive Design - Mobile Viewport

### Description

Verify that search dialog is responsive and functions correctly on mobile viewports (375px width).

### Pre-conditions

- Application is accessible
- User is logged in
- Browser is set to mobile viewport (375px width)

### Test Data

- Text: "coffee"
- Tags: "food"
- Time Range: "This Week"

### Test Steps

1. Set browser viewport to 375px width (mobile size)
2. Navigate to activity list page
3. Click filter icon
4. Enter text, select tags, and select time range
5. Click "Search" button

### Expected Result

- Dialog closes and results update correctly after search
- Search dialog is fully visible and usable on mobile
- All form fields are accessible and properly sized
- Dropdown menus are functional
- Reset and Search buttons are reachable
- No horizontal scrolling required

### Postconditions

- Mobile functionality works as expected
