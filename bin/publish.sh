#!/bin/bash

# Move into retabled folder
cd retables

# Clear dist folder & build
rm -rf dist
pnpm build

# Publish
npm publish

# Back to the original folder
cd -