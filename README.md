# agenteca-agents

Agent packages published by Agenteca. Each one is a folder under `plugins/`, in the Claude Code plugin layout, so the same package installs:

- natively in **Claude Code**, from this repository's marketplace;
- in **Codex**, **GitHub Copilot** and **Cursor**, through the [`ahub`](https://github.com/agenteca/agenteca-cli) command, which translates agents, skills and commands into each tool's own format.

## Packages

| Package | What it is |
|---|---|
| [`agenteca-project-kit`](plugins/agenteca-project-kit) | Agents and skills for building a multi-repository open-source project: standards first, an approved plan, versioned contracts, honest verification, a guided first release |

## Install

Claude Code:

```
/plugin marketplace add agenteca/agenteca-agents
```

```
/plugin install agenteca-project-kit@agenteca-agents
```

Any of the four tools, with `ahub`:

```bash
ahub add agenteca/agenteca-agents/plugins/agenteca-project-kit --tool claude,codex,copilot,cursor
```

`ahub` shows every file it will write and asks before writing.

## Versions

A package is released by tagging `<package>--v<version>`, the convention shared by OpenAPM and `claude plugin tag`. `ahub add …#^0.1.0` resolves version ranges against those tags.

## Checks

```bash
node scripts/validate.mjs
```

The script checks every package: manifest, skill and agent front matter, a README of at least 40 words, a licence, an icon, and no invisible characters in text a model will read.

## Status

Verified: `claude plugin validate --strict --profile directory` passes for each package; installation and removal through `ahub` for the four tools.

Not verified: the packages have not been run in real sessions to measure whether they improve an agent's work, and they have not been loaded in Codex, Copilot or Cursor themselves.

## License

Apache-2.0.
