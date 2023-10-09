# Contributing

## Table of contents
- [Contributing](#contributing)
  - [Table of contents](#table-of-contents)
  - [Process](#process)
  - [Commit messages guidelines](#commit-messages-guidelines)
  - [Writing tests](#writing-tests)


## Process
1. Open an Issue that describes a problem/a new feature.
2. If you are an official maintener, create a branch from the issue, otherwise fork the repository.
3. Write some code and some [tests](#writing-tests), see [here](#commit-messages-guidelines) for more information about commit messages format.
4. Run tests locally.
5. Run tests on the CI pipeline.
6. If everything is good, merge origin/main into your branch and fix any conflitcs
7. Create a merge request and wait for approval
  
Thank you !

## Commit messages guidelines
(issue #issue-number) verb - scope : description  
verb : fix | refactor | feat | delete | doc | build | ...  
scope : api | models | tests | ...

> Example: (issue #14) fix - api : route /topics now goes to correct controller

## Writing tests
// TODO