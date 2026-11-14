---
name: release-readiness
description: Prepare a project for public release - repository hygiene, identity, publication order, marketplaces and what must stay in the owner's hands. Use before publishing repositories, packages or extensions for the first time.
license: Apache-2.0
---

# Release readiness

Publication is the one step that is hard to take back. Prepare it so that nothing surprising becomes public and nothing is published without the owner saying so.

## Before anything goes public

1. **Scan the whole history, not just the latest commit.** Look for personal addresses, home-directory paths, tokens and private keys in every commit of every repository.
2. **Settle the author identity first.** Decide which name and address appear on commits and as the public contact. Rewriting history is easy before the first push and painful after.
3. **Check the name.** Confirm it is free on the code host and the package registry, and search the trademark registers for identical and similar marks in the software classes. Report what you found as facts; a risk assessment is a professional's job.
4. **Give every repository the basics**: a README that stands alone, a licence, a changelog, a continuous integration workflow, issue and pull-request templates, and a security policy with a private reporting channel.
5. **Mark unreviewed texts.** A licence or contributor agreement written without a lawyer says so.

## Order of publication

Publish in dependency order, and verify each step before the next:

1. Libraries, then the tools that depend on them, to the package registry.
2. Repositories that other pipelines check out, before the repositories that depend on them.
3. Container images.
4. Extensions and plugins, last: their listings point at everything above.

Expect limits. A new account is often throttled on how fast it can create repositories; build retries that do not hammer the service.

## Marketplaces

Each marketplace has its own review. Read its current submission checklist before preparing a listing. Recurring requirements:

- an exact pinned version for any package a plugin downloads and runs;
- a README that discloses everything the plugin runs, fetches and sends;
- a licence in the plugin folder;
- a square icon, often fixed at first submission;
- a distinctive name that cannot be mistaken for someone else's product or for an official one.

## What stays with the owner

Never create accounts, enter passwords or verification codes, accept terms, or pay on the owner's behalf. Prepare everything up to that point, say exactly what to click, and let them do it. Publishing itself needs a clear yes each time: agreement to publish one thing is not agreement to publish the next.

## After publishing

Watch the first pipeline run on the real service. A pipeline that passed locally can still fail there, and the cause is usually something that only exists on the service (a generated file left in the tree, a missing permission). Fix the cause and note it.
