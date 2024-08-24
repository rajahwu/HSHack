#!/bin/bash

# Get directory name from argument, default to "app" if not provided
project_dir=${1:-app}

# Check Node.js version
required_node_version="18"
current_node_version=$(node -v | cut -d 'v' -f2)

if [ "$(printf '%s\n' "$required_node_version" "$current_node_version" | sort -V | head -n 1)" != "$required_node_version" ]; then
    echo "Error: Node.js version $required_node_version or higher is required." >&2
    exit 1
fi

# Change to the specified directory, create it if it doesn't exist
if mkdir -p "$project_dir" && cd "$project_dir"; then

# Dependencies to install
dependencies=(
    "@dicebear/collection@^9.2.1"
    "@dicebear/core@^9.2.1"
    "@emotion/react@^11.13.0"
    "@emotion/styled@^11.13.0"
    "@google/generative-ai@^0.17.0"
    "@mui/icons-material@^5.16.7"
    "@mui/material@^5.16.7"
    "axios@^1.7.4"
    "dayjs@^1.11.12"
    "firebase@^10.13.0"
    "js-cookie@^3.0.5"
    "moment@^2.30.1"
    "react@^18.3.1"
    "react-dom@^18.3.1"
    "react-router-dom@^6.26.1"
)

dev_dependencies=(
    "@babel/core@^7.25.2"
    "@babel/preset-env@^7.25.3"
    "@babel/preset-react@^7.24.7"
    "babel-loader@^9.1.3"
    "copy-webpack-plugin@^12.0.2"
    "css-loader@^7.1.2"
    "dotenv@^16.4.5"
    "dotenv-webpack@^8.1.0"
    "html-webpack-plugin@^5.6.0"
    "style-loader@^4.0.0"
    "webpack@^5.93.0"
    "webpack-cli@^5.1.4"
    "webpack-dev-server@^5.0.4"
)

# Install dependencies
npm install "${dependencies[@]}"

# Install devDependencies
npm install -D "${dev_dependencies[@]}"

echo "Dependencies installed successfully in '$project_dir'!"

else
    echo "Error: Failed to create or enter directory '$project_dir'" >&2
    exit 1
fi