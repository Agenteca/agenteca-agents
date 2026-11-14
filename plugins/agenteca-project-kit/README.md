# Agenteca Project Kit

Agents and skills for building a multi-repository open-source project the careful way: standards first, a plan the owner approves, versioned contracts between repositories, and an honest account of what was verified.

These are the working habits that built Agenteca itself, packaged so that an agent can apply them to your project.

## What you get

**Five skills**, loaded by the agent when the situation calls for them:

| Skill | Use it when |
|---|---|
| `standards-first-planning` | Starting a project, or someone proposes a new file format |
| `contract-driven-repos` | Splitting work across repositories, or adding an extension or plugin |
| `agent-package-safety` | Building or reviewing anything that installs agents, hooks or MCP servers |
| `honest-verification` | About to say that something works |
| `release-readiness` | Publishing for the first time |

**Five agents**, each with one job:

| Agent | Job |
|---|---|
| `project-architect` | Writes the plan and brings you the decisions that are yours |
| `standards-researcher` | Reads current official documentation and flags what it could not confirm |
| `contract-keeper` | Guards the contracts between repositories and keeps integrations thin |
| `release-verifier` | Runs the real thing and reports what is and is not verified |
| `publication-guide` | Prepares a first release and walks you through it |

**Three commands**: `/plan-project`, `/verify-work` and `/prepare-release`.

## Install

In Claude Code:

```
/plugin marketplace add agenteca/agenteca-agents
```

```
/plugin install agenteca-project-kit@agenteca-agents
```

In Codex, GitHub Copilot or Cursor, with the [`ahub`](https://github.com/agenteca/agenteca-cli) command:

```bash
ahub add agenteca/agenteca-agents/plugins/agenteca-project-kit
```

## What this plugin runs, fetches and writes

It runs nothing and fetches nothing. The plugin is plain Markdown: skills, agent definitions and commands. It has no hooks, no MCP server, no scripts and no network access, and it reads no credentials.

The agents it defines will do what you ask them to in your project, with the permissions you give your tool. The `publication-guide` agent is written never to create accounts, enter credentials or publish on its own initiative.

## A note on what these agents are

They encode a method, not a guarantee. An agent that follows `honest-verification` reports what it did not check; it is still up to you to read that list.

## License

Apache-2.0.
