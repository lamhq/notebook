# Income/Outcome Auto-Calculation Logic

## Overview

The system automatically calculates income and outcome amounts from activity content. Users can enter financial data quickly without manual amount entry. The logic is used in both the **Add Activity** and **Update Activity** features.

---

## How It Works

### Algorithm

The system analyzes activity content line by line:

1. **Detect Amounts:** Extract numeric values followed by 'k' or 'K' (e.g., "100k", "50K")
   - Multiple amounts on the same line are summed together

2. **Classify as Income or Expense:**
   - Lines containing "nhận" (Vietnamese: "receive") → **Income**
   - All other lines with amounts → **Expense**

3. **Calculate Totals:** Sum all income and expense amounts separately

### Examples

- "nhận 500k từ dự án" → income: 500
- "chi 100k cho cà phê" → outcome: 100
- "mua đồ 50k, trà 20k" → outcome: 70 (sum of 50 + 20)
- Multi-line: "nhận 200k\nchi 80k" → income: 200, outcome: 80

---

## Behavior with Manual Edits

**User Flow:**

1. System auto-calculates and fills Income/Outcome fields based on content
2. User can manually override these values
3. Manual edits are **preserved** until user modifies the content
4. When content changes, auto-calculation runs again and overwrites any manual edits

**Example:**

- User enters: "nhận 500k từ dự án" → Auto-calculation sets Income: 500
- User manually changes Income to: 450 → Preserved as 450
- User edits content to: "nhận 600k từ dự án" → Auto-calculation runs, Income updated to: 600 (manual edit overwritten)

---

## Edge Cases

- **No Amounts Found:** If content has no "Nk" pattern, both Income and Outcome fields remain empty
- **Amount Without Unit:** "nhận 500" (no 'k') is not detected
- **Empty Content:** No calculation occurs
- **Keyword Partial Match:** "nhận được 100k" is recognized (line contains "nhận")
