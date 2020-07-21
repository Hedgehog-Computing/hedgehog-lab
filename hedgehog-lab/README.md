> For historical reasons, we have temporarily switched the package manager to NPM

---
# Contributing Guide

## Setting up your environment

If you are making a Pull Request, please fork the hedgehog-lab repository before continuing.

More information on forking or GitHub usage please navigate: https://docs.github.com/en/github/getting-started-with-github

```bash
# Example of cloning the hedgehog-lab repository (forked)

# Using HTTPS
git clone https://github.com/<your_username>/hedgehog-lab.git

# Using SSH
git clone git@github.com:<your_username>/hedgehog-lab.git
```

Once cloned, navigate to the folder by typing cd `hedgehog-lab` and then running the following commands:

```bash
# Navigate to the hedgehog-lab folder
cd hedgehog-lab/hedgehog-lab

# Install all project dependencies
npm i

# Start the project
npm run start
```

Start your local development server(may take awhile) by running `npm run start` in the terminal.

## Recommended packages(draft)

> About this section, The core team is under discussion, So you may not follow these Settings for the time being.

### Commitizen(draft)

The [Commitizen](https://github.com/commitizen/cz-cli) allows for easy to read and organized commits with minimal change to normal commit functions. To get started, Please navigate: https://github.com/commitizen/cz-cli

### Commit Guidelines w/Commitizen(draft)

All commits will be auto-formatted by commitizen following a fluid interface

### Commit types(draft)

* **feat**: Commits that result in new features. Backward compatible features will release with the next MINOR whereas breaking changes will be in the next MAJOR. The body of a commit with breaking changes must begin with BREAKING CHANGE, followed by a description of how the API has changed.
* **fix**: Commits that provide fixes for bugs within hedgehog-lab's codebase.
* **docs**: Commits that provide updates to the docs.
* **style**: Commits that do not affect how the code runs, these are simply changes to formatting.
* **refactor**: Commits that neither fixes a bug nor adds a feature.
* **perf**: Commits that improve performance.
* **test**: Commits that add missing or correct existing tests.
* **chore**: Other commits that don't modify core or test files.
* **revert**: Commits that revert previous commits.

## Submitting Changes / Pull Requests(draft)

> About this section, The core team is under discussion and organizing branches, So you may not follow these Settings for the time being.

Before doing any commits, you will want to pull down the latest and greatest from dev. From here, merge, and resolve any conflicts between your branch and dev. Its a good rule of thumb to pull frequently as development is constantly happening.

### Pull Requests For hedgehog-lab(draft)

> Pull requests related to the hedgehog-lab core:  
* For bug fixes and documentation updates submit pull requests to master.  
* For new features and enhancements submit pull requests to dev

### Pull Requests For Docs

For any pull requests related to hedgehog-lab docs, submit your pull request to the master branch.