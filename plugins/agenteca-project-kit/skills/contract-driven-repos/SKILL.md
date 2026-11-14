---
name: contract-driven-repos
description: Split a project into several repositories that stay consistent, using thin integrations over one command-line tool and versioned contracts. Use when designing a multi-repository project, adding an IDE extension or plugin, or deciding where a piece of logic belongs.
license: Apache-2.0
---

# Contract-driven repositories

Several repositories only stay coherent if each one knows exactly what it may expect from the others. Put the logic in one place, and make everything else a thin shell that speaks to it through a versioned contract.

## One core, thin shells

- **Put every decision in the core.** Resolution, validation, security checks and file writes live in one library and one command-line tool.
- **Make integrations call the command-line tool.** An IDE extension written in another language cannot import your library. If every integration calls the tool and reads its machine output, they all behave the same and none duplicates logic.
- **Refuse logic in a shell.** When a change would add a decision to an extension or a plugin, move it to the core instead. A shell formats, asks and displays.

## The contract

A contract is a file in the repository that owns it, plus tests that enforce it.

| Between | Contract | Enforced by |
|---|---|---|
| The tool and its integrations | A JSON Schema for the tool's machine output | A test that validates every command's real output against the schema |
| A server and its clients | An OpenAPI document generated from the code | A test that fails when the committed document differs from the generated one |

Rules that keep a contract trustworthy:

- **One envelope.** Every machine output has the same outer shape: a schema version, a success flag, data, warnings, and an error with a stable code.
- **Stable error codes.** Integrations branch on codes, never on message text. Messages may be translated; codes may not change.
- **Additions are minor, removals are major.** Adding a field bumps the minor version. Removing one or changing its meaning bumps the major version and renames the schema file. Consumers ignore fields they do not know.
- **No prompts in machine mode.** A tool called by another program never waits for a keypress.

## Plan first, apply second

For any operation that writes files, split it in two calls:

1. A dry run that returns the full plan and a fingerprint of it.
2. An apply that takes the fingerprint and refuses if the plan has changed since.

What the user approved is then exactly what happens, even when a program, or a model, sits between them and the tool.

## Test fixtures come from the real tool

In a shell written in another language, test against outputs captured from the real command-line tool, not hand-written samples. When the contract changes, regenerate them. A shell tested against invented output is tested against your imagination.

## Development and continuous integration

- Develop the repositories side by side, linked by a workspace, while each declares ordinary version ranges on the others.
- In continuous integration, check out the repositories a job depends on next to it and link them the same way. The pipeline then works before anything is published to a package registry.
