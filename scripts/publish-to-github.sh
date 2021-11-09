#!/bin/bash
VERSION=$(jq -r '.version' package.json)
cd packages/hedgehog-core || echo "cannot find module hedgehog-core"
npm --no-git-tag-version version "$VERSION-$BUILD_VERSION"
npm publish
