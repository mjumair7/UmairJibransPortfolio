# AI and automation note

I use AI, and I would rather say where than make these repositories look fully hand-written.

## What is in the workflow

| Tool | Type | Where I use it | What stays with me |
| --- | --- | --- | --- |
| OpenAI Codex | Generative coding assistant | Second-pass repository reviews, small patch suggestions, README editing, checking CI results, and preparing pull requests | Choosing the project, deciding scope, reviewing the change, and taking responsibility for what gets merged |
| GitHub Dependabot | Dependency automation | Opens version-update pull requests | I read the release impact, check the diff, and do not merge a major update just because a bot opened it |
| GitHub Actions | Build and test automation | Runs the checks configured in each repository | A green check only means those checks passed; it does not prove the design is correct |
| Mermaid | Diagrams as code | Keeps architecture diagrams editable and version-controlled | The diagram still has to match the implementation |

SentriCode also has an optional AI-assisted explanation for a single selected finding. That feature is separate from the development assistance above: the scanner works without an AI key, the input is redacted, and an explanation cannot suppress a finding or patch a repository.

## Rules I follow

- No invented users, metrics, screenshots, benchmarks, or deployment claims.
- I do not accept an AI suggestion only because it sounds confident.
- Generated changes are read against the surrounding code and checked with the repository's tests or CI where available.
- Known limitations and unfinished work stay visible in the README.
- Git history and pull requests remain the record of what changed.

AI helped with parts of the work. I am still responsible for what is public and for fixing it when it is wrong.
