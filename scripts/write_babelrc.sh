#!/bin/bash

# Get directory name from argument, default to "app" if not provided
project_dir=${1:-app}

# Check if .babelrc already exists in the specified directory
if [ -f "$project_dir/.babelrc" ]; then
    echo "Error: .babelrc already exists in '$project_dir'. Please delete it or choose a different filename." >&2
    exit 1
fi

# Change to the specified directory
cd "$project_dir" || {
    echo "Error: Failed to enter directory '$project_dir'" >&2
    exit 1
}

# Create .babelrc with the specified content
cat << EOF > .babelrc
{
    "presets": [
        "@babel/preset-env",
        "@babel/preset-react"
    ]
}
EOF

cat .babelrc

echo ".babelrc created successfully in '$project_dir'!"