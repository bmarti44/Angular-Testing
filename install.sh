#!/bin/sh

ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go)"
brew install node
npm install -g bower grunt-cli
npm install
bower install
