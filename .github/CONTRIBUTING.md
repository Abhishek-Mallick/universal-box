# ✨ Contributing Guide

First off, thank you for considering contributing to Universal-Box! We appreciate your time and effort in helping make this project better.

The following is a set of guidelines for contributing to Universal-Box. These are just guidelines, not rules, so use your best judgment and feel free to propose changes to this document in a pull request.

## Table of Contents
- [What can I contribute?](#what-can-i-contribute)
- [Before You Contribute](#before-you-contribute)
- [Your First Contribution](#your-first-contribution)
- [Development Workflow](#development-workflow)
  - [Cloning the Repository](#cloning-the-repository)
  - [Creating a New Branch](#creating-a-new-branch)
  - [Making Changes](#making-changes)
  - [Committing Changes](#committing-changes)
  - [Submitting a Pull Request](#submitting-a-pull-request)
- [Reporting Bugs](#reporting-bugs)
  - [How Do I Submit A Good Bug Report?](#reporting-bugs)
- [Contribution Guidelines](#contribution-guidelines)
  - [Core Work Contributions](#core-work-contributions)
  - [Template Contributions](#template-contributions)
- [Code of Conduct](#code-of-conduct)
- [License](#license)

## What can I contribute?
There are two main types of contributions in this repository:

1. **Core Work**: Developing and writing functions for commands in `Universal-Box`, which are usually rolled out every release (bi-weekly).
2. **Template Contributions**: Providing production-ready, configurable code in the `template/` directory.

## Before You Contribute
Before starting to contribute, please make sure to:
- [Open an issue](https://github.com/Abhishek-Mallick/universal-box/issues/new) or discuss your idea on [Discord](https://discord.gg/Ebusy32ctb) to get feedback and align with the project's goals.
- Review the [Code of Conduct](https://github.com/Abhishek-Mallick/universal-box/blob/main/.github/CODE_OF_CONDUCT.md) and agree to abide by it.

## Your First Contribution
If you're unsure where to begin contributing, you can start by looking through the [good first issues](https://github.com/Abhishek-Mallick/universal-box/labels/good%20first%20issue) or [help wanted issues](https://github.com/Abhishek-Mallick/universal-box/labels/help%20wanted). These issues are a great starting point for new contributors.

## Development Workflow

### Cloning the Repository
1. Fork the repository on GitHub.
2. Clone your forked repository to your local machine.
3. Navigate to the project directory in your terminal.

### Creating a New Branch
1. Create a new branch from the `main` branch using `git checkout -b your-branch-name`.
2. Choose a descriptive name for your branch, such as `feat/add-new-template` or `fix/bug-in-command`.

### Making Changes
1. Make your changes to the codebase.
2. Ensure your changes follow the project's coding style and conventions.
3. Add or update tests if necessary.

### Committing Changes
1. Run `npm run lint` to check for any linting errors.
2. Run `npm run test` to ensure all tests pass.
3. Commit your changes using a clear and descriptive commit message that follows the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Submitting a Pull Request
1. Push your branch to your forked repository.
2. Open a pull request from your branch to the `main` branch of the original repository.
3. Fill out the pull request template with relevant information and also mention the Issue it it solves(if any).
4. Reference any related issues in the pull request description.
5. Wait for the maintainers to review your pull request.

For a reference on how an ideal pull request should look, check out [this pull request](https://github.com/Abhishek-Mallick/universal-box/pull/30). It demonstrates a well-structured PR with clear descriptions, appropriate references to issues, and a concise summary of changes made.

## <span id="reporting-bugs">💣 Reporting Bugs</span>

This section guides you through submitting a bug report. Following these guidelines helps maintainers and the community understand your report, reproduce the behavior, and find related reports.

Before creating a new issue, **[Perform a cursory search](https://github.com/Abhishek-Mallick/universal-box/issues)** to see if the report exists. If it does, go through the discussion thread and leave a comment instead of opening a new one.

If you find a **Closed** issue that is the same as what you are experiencing, open a new issue and include a link to the original case in the body of your new one.

If you cannot find an open or closed issue addressing the problem, [open a new issue](https://github.com/Abhishek-Mallick/universal-box/issues/new/choose).

Be sure to include a **clear title and description**, as much **relevant information** as possible, and a **code sample** or an **executable test case** demonstrating the expected behavior that is not occurring.


## Contribution Guidelines

### Core Work Contributions
For contributions to the core functionality of Universal-Box, it's recommended to discuss your ideas on [Discord](https://discord.gg/Ebusy32ctb) with the team handling the core functionality or by raising a [Feature Request](https://github.com/Abhishek-Mallick/universal-box/issues/new?labels=enhancement&template=feature_request.md).

### Template Contributions
Template contributions can be picked up by resolving issues listed in the [Issues tab](https://github.com/Abhishek-Mallick/universal-box/issues) or by suggesting new templates or directories to be introduced.

Every template contribution should:
- Be backed by a proper `README.md` file that provides a brief overview of the technologies used and the startup commands. Refer this [one](https://github.com/Abhishek-Mallick/universal-box/blob/main/template/API/Apollo-Server-GraphQL/README.md)
- Contribute to the documentation site at `website/content/<your_contribtuion_directory>`, which should include the technologies used, startup commands, instructions for scaffolding the project by choosing options one by one, and screenshots of the pre-built project. Refer this [one](https://github.com/Abhishek-Mallick/universal-box/blob/main/website/content/Templates/API/Apollo-Server-GraphQL.md)

## Code of Conduct
By participating in this project, you agree to abide by the [Code of Conduct](https://github.com/Abhishek-Mallick/universal-box/blob/main/.github/CODE_OF_CONDUCT.md).

## License
Universal-Box is licensed under the [Apache License 2.0](https://github.com/Abhishek-Mallick/universal-box/blob/main/LICENSE).