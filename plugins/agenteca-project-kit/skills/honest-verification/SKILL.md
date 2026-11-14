---
name: honest-verification
description: Verify software work and report exactly what was and was not checked. Use before saying a task is done, before a release, and whenever a result is about to be described as working.
license: Apache-2.0
---

# Honest verification

"It works" is a claim. Make it only about what you watched happen, and name the rest.

## Check the real thing

- **Run the real binary.** A test that calls a function is not a test of the command a user types. Start the built program at least once, end to end.
- **Use real inputs.** Create real git repositories in temporary folders rather than mocking git. Validate against the official schema rather than your reading of it.
- **Test against the reference tool.** If you implement a format someone else defined, run their tool on your output and yours on theirs. This finds what the specification leaves open, and it finds it quickly.
- **Replay from a clean clone.** Before trusting a pipeline, clone the repository fresh and run the pipeline's steps by hand. A file you forgot to commit only shows up there.
- **Look at the result.** For an interface, open it. For accessibility, run an automated checker and also compute the colour contrasts; a checker in a headless page cannot.

## When a check fails

Read the failure before changing anything. Find the cause and say what it was. Do not relax the test, and do not retry until it passes.

## Keep two lists

Every report and every README carries both:

**Verified**: what you ran, on what, and when.

**Not verified**: what you could not run. Typical entries: an integration never tried inside its host tool, a platform you do not have, a pipeline that has never run on the real service, a path taken from documentation and not from a trial.

The second list is the valuable one. It tells the next person where to look first.

## Words to earn

- "Compatible" needs a verifier or a run that says so.
- "Conforms to" needs a list of the requirements you evaluated, with the ones you did not.
- "Tested on" needs the machine or runner where it ran.
- A translation or a legal text written without a native speaker or a lawyer says so on its face.

## Before you report

State plainly what failed, what was skipped, and what departs from the plan, including your own mistakes that cost something (a download in the wrong place, a step done out of order). Then state what is done. In that order.
