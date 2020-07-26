# Contributing Guide

## Setting up your environment

If you are making a Pull Request, please fork the hedgehog-lab repository before continuing.

For more information on forking or GitHub usage, please navigate to: [https://docs.github.com/en/github/getting-started-with-github](https://docs.github.com/en/github/getting-started-with-github)

```bash
# Example of cloning the hedgehog-lab repository (forked)

# Using HTTPS
git clone https://github.com/<your_username>/hedgehog-lab.git

# Using SSH
git clone git@github.com:<your_username>/hedgehog-lab.git
```

Once cloned, navigate to the folder by typing cd `hedgehog-lab` and then running the following commands:

```bash
# Install all project dependencies
yarn install

# Start the project
yarn watch
```

Start your local development server(may take several minutes) by running `yarn watch` in the terminal.

## Recommended packages(draft)

> These rules are still work in progress, so are not strictly enforced for the time being.

### Commitizen(draft)

The [Commitizen](https://github.com/commitizen/cz-cli) allows for easy to read and organized commits with minimal change to normal commit functions. To get started, please visit: [https://github.com/commitizen/cz-cli](https://github.com/commitizen/cz-cli)

### Commit Guidelines w/Commitizen(draft)

All commits will be auto-formatted by commitizen following a fluid interface

### Commit types(draft)

- **feat**: Commits that result in new features. Backward compatible features will release with the next MINOR whereas breaking changes will be in the next MAJOR. The body of a commit with breaking changes must begin with BREAKING CHANGE, followed by a description of how the API has changed.
- **fix**: Commits that provide fixes for bugs within hedgehog-lab's codebase.
- **docs**: Commits that provide updates to the docs.
- **style**: Commits that do not affect how the code runs, these are simply changes to formatting.
- **refactor**: Commits that neither fixes a bug nor adds a feature.
- **perf**: Commits that improve performance.
- **test**: Commits that add missing or correct existing tests.
- **chore**: Other commits that don't modify core or test files.
- **revert**: Commits that revert previous commits.

## Submitting Changes / Pull Requests(draft)

> These rules are still work in progress, so are not strictly enforced for the time being.

Please rebase your change on the latest master before submitting your PR. We suggest you pull at least daily to avoid digressing too far from the master branch.
Keep your repo fresh can minimize the churn addressing conflicting changes. 

### Pull Requests For hedgehog-lab(draft)

> Pull requests related to the hedgehog-lab core:

- For any new features, bug fixes and documentation updates, please submit pull requests to master.

### Pull Requests For Docs

For any pull requests related to hedgehog-lab docs, please submit your pull request to the master branch.
