## System requirements

- [nodejs >= 18](https://nodejs.org/en/)
- [yarn](https://yarnpkg.com/) (for managing dependencies)

## Setup

> Notes:
>
> - this project uses
>   [yarn (berry) workspaces](https://yarnpkg.com/features/workspaces)
> - this project **does not** use
>   [yarn (berry) plug'n'play](https://yarnpkg.com/features/pnp)

First of all, you'll need to have the following auth tokens in your global yarn
file:

-     cryptoaddicteds:
        npmRegistryServer: "https://www.npmjs.com/"
        npmPublishRegistry: "https://registry.npmjs.org/"
        npmAuthToken: "auth token giving access to @cryptoaddicteds packages" (API_COMPONENTS_NODEJS_NPM_RW_TOKEN)

Having set those variables, clone the repository, and from the project's root
directory run `yarn` to install packages.

From the project's root directory, you can run the following scripts:

- `yarn check-formatting`: checks code formatting
- `yarn fix-formatting`: fixes code formatting
- `yarn test`: runs each workspace's tests
- `yarn compile`: compiles each workspace's code
- `yarn workspace package-name run script-name`: runs a workspace-specific
  script

## Conventions

- [prettier](https://prettier.io) is used to enforce code formatting. You can
  fix code formatting by running `yarn fix-formatting` from the project's root
  directory, though installing the prettier extension for your editor of choice
  is highly recommended

## CI workflow

When a commit is pushed, the CI server runs the automated QA checks.

In addition to that, when a tag is pushed, the CI server, if QA checks succeed,
build artifacts are published.

## Git and deployment workflow

Development happens in feature branches. When you have to develop a new feature
or fix a bug, you open a feature branch. The branch _should_ be named with the
feature or fix.

When development of the feature / fix is completed, open a pull request against
the `main` branch.

When reviewers approve the pull request, it can be merged to `main`. After the
merge, a new version is released (release instructions below).

## Releasing a version

When you want to release version `X.Y.Z`:

- update the CHANGELOG, and commit the update with message
  `docs: update CHANGELOG for vX.Y.Z`

- from the top level directory run `yarn release X.Y.Z`. The command will then:

  - update the versions of the top-level package and of all sub-packages
  - commit the changes
  - tag the commit as `vX.Y.Z`

- push everything to the default remote with `git push --tags origin main`

The CI server will pick up from here, running QA checks on the tag, compiling
the code and publishing artifacts.
