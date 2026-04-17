---
agent: agent
model: GPT-4o (copilot)
description: Shorten all sections of the current document
---

Each section of the current document is marked with Markdown headers (e.g., `## Introduction`).

Start with the section user provided, if not provided, start with the first section.

Update each section in the document by:
- Use more concise language, remove unnecessary words, and simplify complex sentences.
- Use simpler words and phrases to convey the same meaning. Do not replace bolded words (surrounded by `**`).
- Keep links and references intact.
- Remove duplicate information appear in the same section.
- Avoid sentences longer than 50 words and break them into lists if needed.

Ask the user to continue with the next section, only continue when the user confirms.