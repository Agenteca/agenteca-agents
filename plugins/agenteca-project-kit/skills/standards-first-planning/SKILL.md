---
name: standards-first-planning
description: Plan a new software project by reusing existing standards before inventing anything, and get the owner's decisions before writing code. Use at the start of a project, or when someone proposes a new file format, protocol or convention.
license: Apache-2.0
---

# Standards-first planning

A project that invents its own formats ages badly: nobody else reads them, and every integration has to be built twice. Plan so that a new format is the last resort, and so that the owner has decided the things only they can decide.

## Before any code

1. **List the needs, then look for a standard for each one.** For every need (manifest, lockfile, API description, security report, version numbers, licences, authentication), search for a published standard or a de facto format that already has readers. Write the result as a table: need, standard, gap.
2. **Read the standard's current official source.** Formats move quickly. Open the specification or the tool's documentation as it is today and note the date. Do not rely on memory for paths, field names or commands.
3. **Write "not confirmed" instead of guessing.** If the documentation is silent on a point, say so in the plan and later in the README. A flagged gap is useful; a confident guess is a trap.
4. **Justify every exception.** If no standard covers a need, say which ones you checked and why they do not fit. One sentence per exception is enough.

## Compare before you commit

For each structural choice, lay out the real options side by side and recommend one:

- implement a format yourself, or build on the existing tool that already implements it;
- one repository, or one per concern;
- a permissive licence, or a copyleft one.

State the cost of each option, not only its benefits. Check the facts that decide it (does the existing tool have machine-readable output? how often does it break compatibility?) rather than assuming.

## Decisions that belong to the owner

Some choices are not yours to make. Put them to the owner as short questions with a recommendation, and wait:

- the project's name, after checking that it is free where it matters (code host, package registry, trademark registers);
- licences;
- anything that is published, paid for, or hard to undo.

Do not start building on an assumption about one of these.

## What the plan contains

- The context: what problem, what already exists, where this project fits.
- The list of repositories or modules, each with one clear role.
- The contracts between them (see the `contract-driven-repos` skill).
- The data model.
- The standards table, with gaps and exceptions.
- The order of construction, with a test strategy for each step.
- What will not be done, and what needs the owner's agreement.

Keep the plan short enough to read in one sitting. A plan nobody reads protects nobody.
