#!/bin/bash

# Thanks to: https://github.com/fmahnke/shell-semver/blob/master/increment_version.sh

# Parse command line options.
while getopts ":Mmp" Option
do
  case $Option in
    M ) major=true;;
    m ) minor=true;;
    p ) patch=true;;
  esac
done

shift $(($OPTIND - 1))

version=$(npm pkg get version | sed 's/"//g')

# Build array from version string.
a=( ${version//./ } )

# If version string is missing or has the wrong number of members, show usage message.
if [ ${#a[@]} -ne 3 ]
then
  echo "usage: $(basename $0) [-Mmp] major.minor.patch"
  exit 1
fi

# Increment version numbers as requested.
if [ ! -z $major ]
then
  ((a[0]++))
  a[1]=0
  a[2]=0
fi

if [ ! -z $minor ]
then
  ((a[1]++))
  a[2]=0
fi

if [ ! -z $patch ]
then
  ((a[2]++))
fi

# Set new version on all workspaces
pnpm version "${a[0]}.${a[1]}.${a[2]}" --no-git-tag-version
cd docs && pnpm version "${a[0]}.${a[1]}.${a[2]}" --no-git-tag-version && cd ..
cd retables && pnpm version "${a[0]}.${a[1]}.${a[2]}" --no-git-tag-version && cd ..