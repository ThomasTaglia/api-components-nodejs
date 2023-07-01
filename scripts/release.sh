#!/bin/sh
# Set the version from the first parameter. If the parameter contains the
# prefixing v, remove the v (e.g. v1.0.0 -> 1.0.0)
version=${1#v}
# Bump all packages to the specified version
yarn workspaces foreach --topological-dev version $version
# Remove the unneeded version file used by yarn's default release workflow
rm -r .yarn/versions
# Commit and tag changes
git commit -am "$version"
git tag -m "v$version" v$version
