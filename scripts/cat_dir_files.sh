#!/bin/bash

# Check if a directory was provided as an argument
if [[ -z "$1" ]]; then
  echo "Usage: $0 /path/to/your/directory"
  exit 1
fi

# Use the provided argument as the directory
DIR="$1"

# Use find with a while read loop to safely handle filenames with spaces or special characters
find "${DIR}" -type f | while IFS= read -r file; do
  if [[ -f "${file}" ]]; then
    echo "Displaying contents of: ${file}"
    cat "${file}"
    echo # Add an empty line after each file's content
  fi
done
