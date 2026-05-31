# Use Case: Add Activity

## Overview

Users create and log financial activities by adding descriptions, tags, dates, and optional amounts.

The feature simplifies entry with auto-calculation and validation feedback for accuracy.

## Actors

- **Primary Actor:** Logged-in user who wants to record a new financial activity.
- **Secondary Actors:**
  - Web application (displays form and processes input)
  - Backend system (validates data, creates activity records, and retrieves existing tags)

## Preconditions

- The user has a registered account
- The user is authenticated and logged in
- The user has navigated to the Add Activity page (`/activities/new`)
- Existing tags are available in the system (may be empty)

## Main Flow

1. The system loads the Add Activity page
2. The system fetches existing tags from the API
3. The system displays the Activity Form with the following fields:
   - Content field with autofocus enabled
   - Tags field with autocomplete (showing existing tags)
   - Time field (defaulting to current date/time)
   - Income field (optional, initially empty)
   - Outcome field (optional, initially empty)
   - Cancel and Submit buttons
4. The user enters a description in the Content field
5. The system automatically analyzes the content and calculates income/outcome based on the auto-calculation logic (see [Income/Outcome Auto-Calculation Logic](./auto-calc-amounts.md))
6. If amounts are detected, the system populates the Income and/or Outcome fields with the calculated values
7. The user selects one or more tags from the Tags field (or creates new custom tags)
8. The user confirms or modifies the date/time in the Time field
9. The user optionally reviews and modifies the auto-calculated Income and/or Outcome values
10. The user clicks the Submit button
11. The system validates all form fields:
    - Content: required, non-empty string
    - Tags: required, array of strings
    - Time: required, valid date
    - Income: optional, valid number if provided
    - Outcome: optional, valid number if provided
12. All validation passes
13. The system normalizes tags (converts to lowercase and trims whitespace)
14. The system sends a POST request to `/api/diary/activities` with the form data
15. The backend creates the activity record in the database
16. The system emits an ActivityCreatedEvent
17. The system redirects the user to the homepage
18. The user sees the updated activity list with the newly created activity

## Alternate Flows

### Alternate Flow 1: Form Validation Failure

1. From the Main Flow, after step 10 (user clicks Submit)
2. The system validates all form fields
3. One or more validation errors are detected (e.g., Content is empty, Tags is empty, invalid Time)
4. The system displays error messages below the corresponding fields:
   - "This field is required" for empty required fields
   - "This field is required" for invalid dates
5. The form is not submitted
6. The user reviews the error messages
7. The user corrects the invalid fields
8. The use case continues from Main Flow, step 10 (user clicks Submit again)

### Alternate Flow 2: Network or API Error

1. From the Main Flow, after step 14 (system sends POST request)
2. A network error or server error occurs during submission
3. The system displays an error message:
   - If network issue: "Unable to save activity. Please check your connection and try again."
   - If server validation error: Display the validation error from the API response
   - If server error: "An error occurred while saving the activity. Please try again."
4. The Submit button's loading state is cleared
5. The user remains on the Add Activity form
6. The user can modify the form data and resubmit
7. The use case continues from Main Flow, step 10 (user retries submission)

### Alternate Flow 3: Tag Fetch Failure

1. From the Main Flow, after step 2 (system fetches existing tags)
2. A network or API error occurs while fetching tags
3. The system displays the Tags field with a loading error state and a refresh button
4. The user can click the refresh button to retry fetching tags
5. If the retry succeeds, the system displays available tags
6. If the retry fails again, the user can still proceed with custom tags
7. The use case continues from Main Flow, step 4

### Alternate Flow 4: User Manually Overrides Auto-calculated Values

1. From the Main Flow, after step 6 (system auto-calculates amounts)
2. The user reviews the calculated Income and/or Outcome values
3. The user manually edits one or both financial amount fields
4. For details on how manual overrides interact with auto-calculation, see [Income/Outcome Auto-Calculation Logic](./auto-calc-amounts.md)
5. The user continues from Main Flow, step 10 (user clicks Submit)

### Alternate Flow 5: User Creates New Custom Tags

1. From the Main Flow, after step 7 (user selects tags)
2. The user types a custom tag name that doesn't exist in the autocomplete list
3. The system allows free solo mode, enabling creation of new tags
4. The system creates a new tag option for the user-entered text
5. The user selects the newly created tag
6. The tag is added to the form
7. When submitted, this custom tag is created in the system along with the activity
8. The use case continues from Main Flow, step 8

### Alternate Flow 6: User Cancels Activity Entry

1. From the Main Flow, after step 3 (Add Activity form is displayed)
2. The user has entered some data in one or more form fields
3. The user clicks the Cancel button
4. The system navigates back to the homepage
5. All form data is discarded (no activity is created)
6. The use case ends

### Alternate Flow 7: Auto-calculation with Multiple Financial Lines

Refer to [Income/Outcome Auto-Calculation Logic](./auto-calc-amounts.md) for examples of how the system handles multi-line content with multiple transactions. The use case continues from Main Flow, step 7 with the calculated values populated.

## Flowchart

```mermaid
flowchart TD
    A[User navigates to Add Activity page] --> B[Load existing tags from API]
    B --> C{Tags loaded successfully?}
    C -->|No| D[Display Tags field with refresh button]
    C -->|Yes| E[Display Add Activity Form with all fields]
    D --> E
    E --> F[User enters content]
    F --> G[System auto-calculates income/outcome from content]
    G --> H[User selects/creates tags]
    H --> I[User confirms or modifies date/time]
    I --> J[User reviews and optionally modifies amounts]
    J --> K[User clicks Submit]
    K --> L[Validate all form fields]
    L --> M{Validation passes?}
    M -->|No| N[Display validation errors below fields]
    N --> F
    M -->|Yes| O[Normalize tags to lowercase]
    O --> P[Send POST request to API]
    P --> Q{Request successful?}
    Q -->|No| R{Network error?}
    R -->|Yes| S["Display: 'Unable to save activity...'"]
    R -->|No| T[Display API error response]
    S --> U[Clear loading state]
    T --> U
    U --> F
    Q -->|Yes| V[Create activity in database]
    V --> W[Emit ActivityCreatedEvent]
    W --> X[Redirect to homepage]
    X --> Y[User sees updated activity list]
    K -->|User clicks Cancel| Z[Navigate to homepage without saving]
```

## Postconditions

- A new activity record is created in the database with the user-provided information
- The activity includes:
  - Content/description
  - Associated tags (normalized to lowercase)
  - Date and time
  - Optional income amount (if provided or auto-calculated)
  - Optional outcome/expense amount (if provided or auto-calculated)
- The user is redirected to the homepage
- The newly created activity appears in the activity list on the homepage
- If cancelled, no activity is created and the user returns to the homepage

## Success Criteria

- The user can successfully create a new activity with all required information
- The Content, Tags, and Time fields are required; Income and Outcome are optional
- Auto-calculation of financial amounts from the description works accurately (see [Income/Outcome Auto-Calculation Logic](./auto-calc-amounts.md))
- Users can manually override calculated values with behavior described in [Income/Outcome Auto-Calculation Logic](./auto-calc-amounts.md)
- Form validation provides clear error messages for invalid or missing data
- Users can create custom tags not in the existing tag list
- The form submission handles network and server errors gracefully with appropriate messaging
- After successful submission, the user is redirected to the homepage and sees the new activity
- Users can cancel the activity creation at any time and return to the homepage
- All form fields are accessible via keyboard navigation and properly labeled for screen readers
- The Content field receives autofocus for improved user experience
