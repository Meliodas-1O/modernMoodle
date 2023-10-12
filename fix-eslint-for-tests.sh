#!/bin/bash

# Perform a back up
cp .eslintignore .eslintignore_old
cp tsconfig.json tsconfig.json_old

# Remove test exclusion from .eslintignore and tsconfig.json
sed '/\*\*\.test\.ts/d' .eslintignore > .eslintignoretmp && mv .eslintignoretmp .eslintignore
sed '/test\/\*\*\/\*\.ts/d' tsconfig.json > tsconfig.tmp.json && mv tsconfig.tmp.json tsconfig.json

# Run eslint fix
npx eslint ./test/ --fix

# Restore files
cp .eslintignore_old .eslintignore
cp tsconfig.json_old tsconfig.json

# Remove 'old' files
rm .eslintignore_old
rm tsconfig.json_old