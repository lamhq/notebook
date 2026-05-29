# Search Activity Test Suite

## Introduction

- **Feature:** Search Activity List - Allows users to filter and find specific activities by text content, tags, and time range
- **Author:** QA Team

---

## TC_SA_01 - Text Search with Single Keyword

### Description

Verify that user can search activities by entering text in the Text field and results are filtered correctly.

### Pre-conditions

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

- All activities in the list contain 'coffee'.

### Postconditions

- Dialog closes after clicking Search
- Current page is reset to page 1

---

## TC_SA_02 - Tag Filtering with Single Tag

### Description

Verify that user can select a single tag and activities are filtered to show only those with the selected tag.

### Pre-conditions

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

- All activities in the list have a tag section containing "#food"

### Postconditions

- Tags dropdown shows selected tag "food"
- Dialog closes after clicking Search
- Current page is reset to page 1

---

## TC_SA_03 - Tag Filtering with Multiple Tags

### Description

Verify that user can select multiple tags and activities with ANY of the selected tags are displayed (OR logic).

### Pre-conditions

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

- All activities in the list have a tag section containing at least one of "#food", "#restaurant", or "#dining"

### Postconditions

- All selected tags are displayed in the Tags field
- Dialog closes
- Current page is reset to page 1

---

## TC_SA_04 - Preset Time Range - This Month (Default)

### Description

Verify that "This Month" is the default time range option and filtering works correctly.

### Pre-conditions

- User is logged in
- User is on the homepage
- Activities from different months exist

### Test Data

- Time Range: "This Month" (default)

### Test Steps

1. Click the filter icon to open search dialog
2. Do not change the time range selection
3. Click "Search" button

### Expected Result

- All activity groups contain the current month and year (e.g., `May, 2026`)

### Postconditions

- Time Range field shows "This Month" selected by default
- Dialog closes
- Current page is reset to page 1

---

## TC_SA_05 - Preset Time Range - All

### Description

Verify that user can select "All" option to view activities without date filtering.

### Pre-conditions

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

- The activity list contains 10 items.

### Postconditions

- Time Range shows "All" as selected
- Dialog closes
- Current page is reset to page 1

---

## TC_SA_06 - Custom Date Range Selection

### Description

Verify that user can select "Custom" time range and specify From/To dates.

### Pre-conditions

- User is logged in
- User is on the homepage
- Activities exist in the system

### Test Data

- Time Range: "Custom"
- From Date: April 1, 2026
- To Date: April 11, 2026

### Test Steps

1. Click the filter icon to open search dialog
2. Click on Time Range dropdown
3. Select "Custom" option
4. Verify "From" and "To" date picker fields appear
5. Click on "From" date picker
6. Select April 1, 2026
7. Click on "To" date picker
8. Select April 11, 2026
9. Click "Search" button

### Expected Result

- The date of all activity groups contain is between April 1, 2026 and April 11, 2026 (inclusive)

### Postconditions

- Current page is reset to page 1
- Time Range shows "Custom" as selected
- "From" and "To" date picker fields are visible and functional
- Selected dates are displayed in the date fields
- Dialog closes after clicking Search

---

## TC_SA_07 - Combined Search - All Criteria

### Description

Verify that user can combine text, tags, and custom date range in a complex multi-criteria search.

### Pre-conditions

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

- Activity list only shows activities matching ALL criteria:
  - Content contains "coffee" AND
  - Tag is "food" OR "beverage" AND
- All activity groups contain `April, 2026`

### Postconditions

- Dialog closes
- Current page is reset to page 1

---

## TC_SA_08 - Reset Button Clears All Fields

### Description

Verify that clicking the Reset button clears all search fields to default values and dialog remains open.

### Pre-conditions

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

- Search dialog can be reopened to perform new search or further refine criteria

---

## TC_SA_09 - No Search Results Display Empty State

### Description

Verify that when search criteria return no results, the empty state message is displayed.

### Pre-conditions

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

- Activity list displays empty message "There's no items to display."
- No activities are listed

### Postconditions

- Dialog closes
- Pagination controls are hidden

---

## TC_SA_11 - Responsive Design - Mobile Viewport

### Description

Verify that search dialog is responsive and functions correctly on mobile viewports (375px width).

### Pre-conditions

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

- Search filter (text: "coffee", tags: "food", time range: "This Week") is applied to the activity list
- Current page is reset to page 1
